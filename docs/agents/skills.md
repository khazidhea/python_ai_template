# Skills: installation and invocation policy

Skills in this repository are **invoked deliberately, never implicitly**. A skill must not fire because a model decided the moment looked relevant — it runs when a human asks for it, or when `AGENTS.md` tells an agent to load it. Every skill therefore carries both switches, one per agent runtime:

- `disable-model-invocation: true` in the `SKILL.md` frontmatter (Claude Code);
- `agents/openai.yaml` containing `policy: allow_implicit_invocation: false` (Codex).

**After installing or updating any skill, set both and verify them before committing** — vendored skills arrive with implicit invocation on, and an update overwrites the file wholesale. Check the whole set with:

```bash
for d in .agents/skills/*/; do n=$(basename "$d"); printf '%-30s %s %s\n' "$n" "$(head -1 "$d/SKILL.md" | grep -qx -- --- && echo fm-ok || echo FM-BROKEN)" "$(grep -qx 'disable-model-invocation: true' "$d/SKILL.md" && echo claude-ok || echo CLAUDE-MISSING)$(grep -q 'allow_implicit_invocation: false' "$d/agents/openai.yaml" 2>/dev/null && echo ' codex-ok' || echo ' CODEX-MISSING')"; done
```

The `fm-ok` column matters as much as the flags: frontmatter is only read when it is the first thing in the file, so a stray line above `---` silently voids the whole block, flags included.

## Installing

`skills-lock.json` is maintained by the `skills` CLI: for every vendored skill it records the GitHub repository it came from, the path of `SKILL.md` inside that repository, and the hash of the upstream file as installed. Install and update through the CLI so the lock stays true:

```bash
npx -y skills@latest add <owner>/<repo> -s <skill> -a claude-code -a codex --copy -y
```

`--copy` installs copies of the skill files into the repository. In this project both agent targets share `.agents/skills/<skill>/` through the `.claude/skills` link. An install can overwrite `SKILL.md` wholesale, so restore both switches right after it and rerun the check above.

Node and npm are development tools for these commands. No persistent skills service
is needed. Inspect installed skills and available upstream updates with:

```bash
npx -y skills@latest list
npx -y skills@latest check
```

When an update is requested, run `npx -y skills@latest update`, inspect the diff,
restore both invocation switches, and verify `.claude/skills` still resolves to
`.agents/skills` (a junction on Windows). Commit the skills and `skills-lock.json`
together. The initial set is a local Biohayat snapshot, not a claim of latest upstream
versions. Project Kit seeds these files once; subsequent kit updates preserve them.

## Skills without a lock entry

Not every skill here comes from a live upstream:

- `batch-grill-me` — `mattpocock/skills` no longer ships a skill under that name; what we have is a vendored snapshot of the older version, updated by hand.
- `codebase-design`, `domain-modeling`, `grilling`, `improve-codebase-architecture`, `ponytail-audit` — hand-maintained skills; edit them in place.
