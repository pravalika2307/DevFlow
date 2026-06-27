from fastapi.testclient import TestClient
from unittest.mock import AsyncMock, patch

def test_liveness_endpoint(client: TestClient):
    response = client.get("/api/v1/liveness")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["status"] == "alive"

@patch("app.api.v1.endpoints.health.verify_redis_health", new_callable=AsyncMock)
@patch("app.api.v1.endpoints.health.verify_postgres_health", new_callable=AsyncMock)
def test_readiness_healthy(mock_pg, mock_redis, client: TestClient):
    mock_pg.return_value = True
    mock_redis.return_value = True
    
    response = client.get("/api/v1/readiness")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["status"] == "ready"

@patch("app.api.v1.endpoints.health.verify_redis_health", new_callable=AsyncMock)
@patch("app.api.v1.endpoints.health.verify_postgres_health", new_callable=AsyncMock)
def test_readiness_unhealthy(mock_pg, mock_redis, client: TestClient):
    mock_pg.return_value = False
    mock_redis.return_value = True
    
    response = client.get("/api/v1/readiness")
    assert response.status_code == 503
    data = response.json()
    assert data["success"] is False
    assert data["error"]["code"] == "HTTP_ERROR"

@patch("app.api.v1.endpoints.health.verify_redis_health", new_callable=AsyncMock)
@patch("app.api.v1.endpoints.health.verify_postgres_health", new_callable=AsyncMock)
def test_health_check(mock_pg, mock_redis, client: TestClient):
    mock_pg.return_value = True
    mock_redis.return_value = True
    
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["status"] == "healthy"
    assert data["data"]["postgres"] == "connected"
    assert data["data"]["redis"] == "connected"
