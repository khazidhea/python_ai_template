#!/usr/bin/env node
// Ticket tracker CLI over docs/tickets/*.md — the local issue tracker described in
// docs/agents/ticket-tracker.md. Run from the project root:
//   node scripts/tickets.mjs list            → open tickets as JSON (planner input)
//   node scripts/tickets.mjs view 0006       → one ticket, verbatim (implementer input)
//   node scripts/tickets.mjs set-state 0006 done --note "..."   → state + History entry
// Uses only Node's standard library; no package installation is required.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const TICKETS_DIR = 'docs/tickets'
const STATES = [
  'needs-triage',
  'needs-info',
  'ready-for-agent',
  'ready-for-human',
  'wontfix',
  'in-progress',
  'blocked',
  'done',
]

const field = (body, name) =>
  body.match(new RegExp(`^\\*\\*${name}:\\*\\*\\s*(.+)$`, 'm'))?.[1].trim()

const section = (body, heading) => {
  const after = body.split(new RegExp(`^## ${heading}\\s*$`, 'm'))[1]
  return after === undefined ? '' : after.split(/^## /m)[0].trim()
}

/** Ticket numbers this ticket waits on, parsed out of the free-text `Blocked by` line. */
const blockers = (body) => {
  const raw = field(body, 'Blocked by') ?? 'None'
  return /^none$/i.test(raw) ? [] : [...raw.matchAll(/\b(\d{4})\b/g)].map((m) => m[1])
}

const parse = (file) => {
  const body = readFileSync(join(TICKETS_DIR, file), 'utf8')
  const heading = body.match(/^#\s*(\d{4})\s*—\s*(.+)$/m)
  if (!heading) return null
  return {
    id: heading[1],
    title: heading[2].trim(),
    file,
    category: field(body, 'Category') ?? 'enhancement',
    state: field(body, 'State') ?? 'needs-triage',
    blockedBy: blockers(body),
    whatToBuild: section(body, 'What to build'),
    acceptanceCriteria: section(body, 'Acceptance criteria'),
  }
}

const all = () =>
  readdirSync(TICKETS_DIR)
    .filter((f) => /^\d{4}-.*\.md$/.test(f))
    .sort()
    .map(parse)
    .filter(Boolean)

const resolve = (id) => {
  const key = String(id).replace(/^#/, '').padStart(4, '0')
  const ticket = all().find((t) => t.id === key)
  if (!ticket) throw new Error(`No ticket ${key} in ${TICKETS_DIR}/`)
  return ticket
}

/** Open tickets are everything not yet settled — `done` and `wontfix` are terminal. */
const list = (args) => {
  const wanted = args.includes('--state') ? args[args.indexOf('--state') + 1] : null
  const open = all().filter((t) => !['done', 'wontfix'].includes(t.state))
  const tickets = wanted ? open.filter((t) => t.state === wanted) : open
  // Blockers already `done` are not blockers any more; the planner only sees live edges.
  const settled = new Set(
    all()
      .filter((t) => t.state === 'done')
      .map((t) => t.id),
  )
  const shaped = tickets.map((t) => ({
    ...t,
    blockedBy: t.blockedBy.filter((b) => !settled.has(b)),
  }))
  process.stdout.write(`${JSON.stringify(shaped, null, 2)}\n`)
}

const view = (args) => {
  const ticket = resolve(args[0])
  process.stdout.write(`${TICKETS_DIR}/${ticket.file}\n\n`)
  process.stdout.write(readFileSync(join(TICKETS_DIR, ticket.file), 'utf8'))
}

/** Today in Asia/Almaty — ticket History entries are dated in the team's local time. */
const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Almaty' }).format(new Date())

const setState = (args) => {
  const [id, state] = args
  if (!STATES.includes(state))
    throw new Error(`Unknown state "${state}". One of: ${STATES.join(', ')}`)
  const note = args.includes('--note') ? args[args.indexOf('--note') + 1] : ''
  const ticket = resolve(id)
  const path = join(TICKETS_DIR, ticket.file)
  const before = readFileSync(path, 'utf8')
  const withState = before.replace(/^\*\*State:\*\*.*$/m, `**State:** ${state}`)
  if (withState === before && ticket.state !== state) throw new Error(`No State field in ${path}`)
  const entry = `- ${today()} — \`${ticket.state}\` → \`${state}\`.${note ? ` ${note}` : ''}`
  writeFileSync(path, `${withState.replace(/\s*$/, '')}\n${entry}\n`)
  process.stdout.write(`${path}: ${ticket.state} → ${state}\n`)
}

const COMMANDS = { list, view, 'set-state': setState }

const [command, ...args] = process.argv.slice(2)
const handler = COMMANDS[command]
if (!handler) {
  process.stderr.write(`Usage: tickets.mjs <${Object.keys(COMMANDS).join('|')}> [args]\n`)
  process.exit(1)
}
handler(args)
