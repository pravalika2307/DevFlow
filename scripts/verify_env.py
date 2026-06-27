import os
import socket
import sys


def parse_env_file(filepath):
    """
    Parses environment variables from an env file without external dependencies.
    """
    if not os.path.exists(filepath):
        return {}
    env_vars = {}
    with open(filepath, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                key, val = line.split("=", 1)
                env_vars[key.strip()] = val.strip()
    return env_vars


def main():
    print("=== DevFlow Environment Verification ===")

    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    env_path = os.path.join(root_dir, ".env")
    example_path = os.path.join(root_dir, ".env.example")

    if not os.path.exists(env_path):
        print(f"[ERROR] Environment file not found at: {env_path}")
        print("Please copy .env.example to .env to initialize configuration.")
        sys.exit(1)

    example_vars = parse_env_file(example_path)
    actual_vars = parse_env_file(env_path)

    missing_vars = []
    for key in example_vars:
        val = actual_vars.get(key) or os.environ.get(key)
        if not val:
            missing_vars.append(key)

    if missing_vars:
        print("[ERROR] The following environment variables are missing in .env:")
        for var in missing_vars:
            print(f"  - {var}")
        sys.exit(1)

    print("[SUCCESS] All required environment variables are defined.")

    # --------------------------------------------------------------------------
    # Verify TCP Socket Connectivity to Database and Redis
    # --------------------------------------------------------------------------
    db_server = actual_vars.get("POSTGRES_SERVER", "localhost")
    if db_server == "db":
        db_server = "localhost"
    try:
        db_port = int(actual_vars.get("POSTGRES_PORT", 5432))
    except ValueError:
        db_port = 5432

    redis_server = actual_vars.get("REDIS_HOST", "localhost")
    if redis_server == "redis":
        redis_server = "localhost"
    try:
        redis_port = int(actual_vars.get("REDIS_PORT", 6379))
    except ValueError:
        redis_port = 6379

    print("\nChecking database and cache port connectivity...")

    # PostgreSQL Ping Check
    try:
        with socket.create_connection((db_server, db_port), timeout=3):
            print(f"[SUCCESS] PostgreSQL database is listening on {db_server}:{db_port}")
    except Exception as e:
        print(f"[WARNING] PostgreSQL port ({db_server}:{db_port}) is not reachable. {e}")
        print("          Ensure Docker Compose is running or Postgres is active locally.")

    # Redis Ping Check
    try:
        with socket.create_connection((redis_server, redis_port), timeout=3):
            print(f"[SUCCESS] Redis server is listening on {redis_server}:{redis_port}")
    except Exception as e:
        print(f"[WARNING] Redis port ({redis_server}:{redis_port}) is not reachable. {e}")
        print("          Ensure Docker Compose is running or Redis is active locally.")

    print("\nVerification process finished.")


if __name__ == "__main__":
    main()
