"""The installed package runs outside the repository directory."""

import subprocess
import sys
from pathlib import Path


def test_installed_entrypoint(tmp_path: Path) -> None:
    completed = subprocess.run(
        [sys.executable, '-m', 'python_ai_template'],
        cwd=tmp_path,
        capture_output=True,
        text=True,
        check=True,
    )
    assert completed.stdout == 'Application is ready.\n'
