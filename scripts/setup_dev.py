import os
import shutil
import subprocess
import sys


def run_command(cmd, cwd=None):
    print(f"Running command: {' '.join(cmd)} (cwd: {cwd or '.'})")
    try:
        res = subprocess.run(cmd, cwd=cwd, check=True)
        return res.returncode == 0
    except Exception as e:
        print(f"[ERROR] Command failed: {e}")
        return False


def main():
    print("=== DevFlow Development Setup ===")

    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

    # 1. Copy env templates if they don't exist
    env_path = os.path.join(root_dir, ".env")
    env_example = os.path.join(root_dir, ".env.example")
    if not os.path.exists(env_path):
        print(f"Copying {env_example} to {env_path}...")
        shutil.copy(env_example, env_path)
    else:
        print(".env already exists in root.")

    api_env = os.path.join(root_dir, "apps", "api", ".env")
    api_env_example = os.path.join(root_dir, "apps", "api", ".env.example")
    if not os.path.exists(api_env):
        print(f"Copying {api_env_example} to {api_env}...")
        shutil.copy(api_env_example, api_env)
    else:
        print(".env already exists in apps/api.")

    # 2. Install Node/npm dependencies
    print("\nInstalling Node.js dependencies at monorepo root...")
    is_windows = sys.platform.startswith("win")
    npm_cmd = "npm.cmd" if is_windows else "npm"
    if not run_command([npm_cmd, "install"], cwd=root_dir):
        print("[ERROR] npm install failed. Please ensure Node.js is installed.")
        sys.exit(1)

    # 3. Setup Python Backend Virtual Environment
    print("\nSetting up Python backend virtual environment...")
    api_dir = os.path.join(root_dir, "apps", "api")
    venv_dir = os.path.join(api_dir, "venv")

    if not os.path.exists(venv_dir):
        print("Creating virtual environment in apps/api/venv...")
        if not run_command([sys.executable, "-m", "venv", "venv"], cwd=api_dir):
            print("[ERROR] Failed to create virtual environment.")
            sys.exit(1)
    else:
        print("Virtual environment already exists.")

    # Determine paths inside virtual env
    is_windows = sys.platform.startswith("win")
    if is_windows:
        pip_path = os.path.join(venv_dir, "Scripts", "pip.exe")
        python_path = os.path.join(venv_dir, "Scripts", "python.exe")
    else:
        pip_path = os.path.join(venv_dir, "bin", "pip")
        python_path = os.path.join(venv_dir, "bin", "python")

    print("\nInstalling Python dependencies...")
    reqs_path = os.path.join(api_dir, "requirements.txt")
    if not run_command([python_path, "-m", "pip", "install", "--upgrade", "pip"], cwd=api_dir):
        print("[WARNING] Failed to upgrade pip.")

    if not run_command([python_path, "-m", "pip", "install", "-r", reqs_path], cwd=api_dir):
        print("[ERROR] Failed to install Python dependencies.")
        sys.exit(1)

    # Make sure dev code quality libraries are installed natively
    print("\nInstalling quality tooling (ruff, black, mypy)...")
    if not run_command([python_path, "-m", "pip", "install", "ruff", "black", "mypy"], cwd=api_dir):
        print("[WARNING] Failed to install code quality libraries.")

    # 4. Install Git pre-commit hooks
    print("\nInstalling Git pre-commit hooks...")
    precommit_path = (
        os.path.join(venv_dir, "Scripts", "pre-commit.exe")
        if is_windows
        else os.path.join(venv_dir, "bin", "pre-commit")
    )
    if os.path.exists(precommit_path):
        run_command([precommit_path, "install"], cwd=root_dir)
    else:
        print("[WARNING] pre-commit executable not found. Hooks were not installed.")

    # 5. Verify connectivity and configuration
    print("\nRunning environment verification check...")
    verify_script = os.path.join(root_dir, "scripts", "verify_env.py")
    subprocess.run(
        [python_path if os.path.exists(python_path) else sys.executable, verify_script],
        check=False,
    )

    print("\nSetup finished successfully! DevFlow is ready.")


if __name__ == "__main__":
    main()
