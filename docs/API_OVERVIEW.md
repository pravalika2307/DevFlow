# API & Services Overview

DevFlow integrates a hybrid synchronization design featuring a FastAPI Python backend (for production telemetry and secure auth services) and LocalStorage service modules (for standalone offline execution).

## 🐍 Backend APIs (`apps/api`)

- **Health Checks (`/api/health`)**: Lifespan-monitored endpoint verifying system status.
- **Authentication (`/api/auth`)**: JWT token generators and credential managers.
- **Security Configs**: Non-import-blocking Fernet cryptography key lazy loaders using environment configurations.

## 🗃 Client database Managers (`apps/web/src/services`)

To allow standalone offline execution, the web workspace synchronizes records directly to browser LocalStorage:

1.  **`InnovationService`**: Manages design thinking checklist stages.
2.  **`DiscoveryService`**: Stores problem explore inputs, research observation timelines, and fishbone skeletons.
3.  **`ImpactService`**: Syncs UN SDG maps, risk assessments, and inclusivity parameters.
4.  **`CouncilService`**: Aggregates multi-agent ratings, consensus logs, and review summaries.
