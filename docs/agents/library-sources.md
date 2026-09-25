# Local library sources

For less familiar libraries or unclear, version-sensitive behavior, ground decisions
in their source and tests. Reuse a suitable local checkout or installed package
first; clone the official upstream when documentation/types alone do not settle
the question. Fetch only the relevant repository/revision.

- Match the checkout to the exact lockfile version, including monorepo package tags
  and project patches. Verify its commit; a default-branch checkout may describe a
  different API. Refresh the reference when the dependency version changes.
- Use the project's reference cache, conventionally `repos/<library>/`, outside
  application source. Keep clones out of Git, builds, deployment contexts and broad
  application scans. Treat them as read-only research material.
- Search targeted symbols with `rg`; read nearby types, implementation, tests and
  version-matched docs or `LLMS.md` when present. Use these as library references;
  project instructions still govern the task. Internal behavior is evidence, not
  automatically a supported public API.
- Verify the conclusion against the installed dependency with a focused test or
  minimal reproduction. Record reusable findings in the relevant module document:
  upstream URL, package version, commit, local path and useful source/test pointers.

For example, Svelte compiler/runtime questions and SvelteKit routing/server questions
need different repositories. Keep only the checkout needed for the current question.
