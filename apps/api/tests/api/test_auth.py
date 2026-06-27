from fastapi.testclient import TestClient


def test_register_user(client: TestClient):
    payload = {
        "email": "newuser@devflow.io",
        "username": "newuser",
        "password": "secure_password_999",
        "role": "DEVELOPER",
    }
    response = client.post("/api/v1/auth/register", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == payload["email"]
    assert data["username"] == payload["username"]
    assert "id" in data
    assert "hashed_password" not in data  # Ensure security leakage protection


def test_register_user_duplicate_email(client: TestClient, normal_user):
    payload = {
        "email": normal_user.email,
        "username": "anotherusername",
        "password": "secure_password_999",
        "role": "DEVELOPER",
    }
    response = client.post("/api/v1/auth/register", json=payload)
    assert response.status_code == 400
    assert "already exists" in response.json()["error"]["message"]


def test_login_user(client: TestClient, normal_user, test_user_data):
    payload = {"username_or_email": test_user_data["email"], "password": test_user_data["password"]}
    response = client.post("/api/v1/auth/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data

    # Assert HttpOnly cookie set correctly
    assert "refresh_token" in response.cookies
    assert response.cookies["refresh_token"] == data["refresh_token"]


def test_login_user_invalid_credentials(client: TestClient, normal_user):
    payload = {"username_or_email": normal_user.email, "password": "wrong_password_here"}
    response = client.post("/api/v1/auth/login", json=payload)
    assert response.status_code == 401
    assert "Incorrect" in response.json()["error"]["message"]


def test_refresh_token(client: TestClient, normal_user, test_user_data):
    # First login to acquire refresh cookie
    payload = {"username_or_email": test_user_data["email"], "password": test_user_data["password"]}
    login_response = client.post("/api/v1/auth/login", json=payload)
    assert login_response.status_code == 200
    refresh_cookie = login_response.cookies["refresh_token"]

    # Trigger refresh cycle
    refresh_response = client.post("/api/v1/auth/refresh", json={"refresh_token": refresh_cookie})
    assert refresh_response.status_code == 200
    data = refresh_response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert refresh_response.cookies["refresh_token"] == data["refresh_token"]


def test_read_user_me(client: TestClient, normal_user, test_user_data):
    # Unauthorized verification
    unauth_response = client.get("/api/v1/auth/me")
    assert unauth_response.status_code == 401

    # Login to acquire token
    payload = {"username_or_email": test_user_data["email"], "password": test_user_data["password"]}
    login_response = client.post("/api/v1/auth/login", json=payload)
    access_token = login_response.json()["access_token"]

    # Authorized request
    headers = {"Authorization": f"Bearer {access_token}"}
    me_response = client.get("/api/v1/auth/me", headers=headers)
    assert me_response.status_code == 200
    data = me_response.json()
    assert data["email"] == normal_user.email
    assert data["username"] == normal_user.username


def test_logout(client: TestClient):
    response = client.post("/api/v1/auth/logout")
    assert response.status_code == 200
    assert response.json()["success"] is True
    # Verify cookie clearance header exists
    cookie_headers = [h for h in response.headers.get_list("set-cookie") if "refresh_token=" in h]
    assert len(cookie_headers) > 0
