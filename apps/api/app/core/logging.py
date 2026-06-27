import json
import logging
import os
import sys
from datetime import datetime, timezone


class JSONFormatter(logging.Formatter):
    """
    Custom formatter writing log records to standardized JSON shapes for production.
    """

    def format(self, record: logging.LogRecord) -> str:
        log_data = {
            "timestamp": datetime.fromtimestamp(record.created, timezone.utc).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "module": record.module,
            "line": record.lineno,
        }
        if record.exc_info:
            log_data["exception"] = self.formatException(record.exc_info)
        return json.dumps(log_data)


def configure_logging() -> None:
    """
    Configures standard logging.
    Enforces clean color-coded console logs in dev, JSON structured outputs in prod.
    """
    root_logger = logging.getLogger()

    # Clear existing handlers
    for handler in root_logger.handlers[:]:
        root_logger.removeHandler(handler)

    console_handler = logging.StreamHandler(sys.stdout)

    # Identify environment (Production vs Development)
    is_prod = os.getenv("PRODUCTION", "").lower() == "true"

    if is_prod:
        console_handler.setFormatter(JSONFormatter())
        root_logger.setLevel(logging.INFO)
    else:
        # Standard readable developer formats
        dev_formatter = logging.Formatter(
            "%(asctime)s [%(levelname)s] %(name)s: %(message)s", datefmt="%Y-%m-%d %H:%M:%S"
        )
        console_handler.setFormatter(dev_formatter)
        root_logger.setLevel(logging.DEBUG)

    root_logger.addHandler(console_handler)

    # Silence verbose dependencies
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)
