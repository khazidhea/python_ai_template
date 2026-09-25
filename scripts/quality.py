"""Run the same offline quality gate locally and in CI."""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CHECKS = (
    ('ruff', 'format', '--check', 'src', 'tests', 'scripts'),
    ('ruff', 'check', 'src', 'tests', 'scripts'),
    ('flake8', 'src', 'tests'),
    ('ty', 'check', 'src'),
    ('pytest',),
)


def main() -> None:
    for command in CHECKS:
        subprocess.run([sys.executable, '-m', *command], cwd=ROOT, check=True)


if __name__ == '__main__':
    main()
