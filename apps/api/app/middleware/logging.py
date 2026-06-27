import logging
import time
import uuid
from typing import Awaitable, Callable

from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger("app.middleware.logging")


class LoggingMiddleware(BaseHTTPMiddleware):
    """
    HTTP Middleware to append correlation/Request-IDs, measure request performance,
    and output structured logs for request lifecycle.
    """

    async def dispatch(
        self, request: Request, call_next: Callable[[Request], Awaitable[Response]]
    ) -> Response:
        request_id = request.headers.get("X-Request-ID") or str(uuid.uuid4())
        request.state.request_id = request_id

        start_time = time.perf_counter()
        logger.info(
            f"Request started: {request.method} {request.url.path} [Request-ID: {request_id}]"
        )

        try:
            response = await call_next(request)
        except Exception as exc:
            duration_ms = (time.perf_counter() - start_time) * 1000
            logger.exception(
                f"Request failed: {request.method} {request.url.path} in {duration_ms:.2f}ms [Request-ID: {request_id}]"
            )
            raise exc

        duration_ms = (time.perf_counter() - start_time) * 1000
        response.headers["X-Request-ID"] = request_id
        response.headers["X-Process-Time-Ms"] = f"{duration_ms:.2f}"

        logger.info(
            f"Request finished: {request.method} {request.url.path} - "
            f"Status: {response.status_code} in {duration_ms:.2f}ms [Request-ID: {request_id}]"
        )
        return response
