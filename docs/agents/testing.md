# Testing

Run `uv run check_quality` for formatting, Ruff, WPS, types, and pytest.
Use `uv run pytest tests/path.py` while iterating. Tests exercise observable behavior
through public interfaces. The starter's entrypoint test checks package installation
and launch from outside the source tree; replace it as the real CLI takes shape.

Tests must not require production credentials or call paid/external APIs. Replace
provider transports at their boundary. Add real isolated database tests when storage
is introduced. Do not silently weaken a gate to make a failing implementation pass.

Ruff and Flake8 check production code and tests. `setup.cfg` carries the shared
explicit WPS exceptions for tests; it does not disable the entire WPS family there.
