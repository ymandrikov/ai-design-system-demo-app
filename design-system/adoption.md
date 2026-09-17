# Contract adoption

Scope: the newly installed Tabs component and its constituent React exports.
Table already has a contract. The Services page now uses
[NavigationalTabs](components/navigational-tabs.md); the previous URL-sync exception
is recorded in the [archive](gaps-archive.md#environment-tabs-url-synchronisation).
Tabs has no current product consumers. The panel-focus CSS repair is implemented;
its gap remains open until the rendered expectation is demonstrated.

| Component | Source | Contract | Progress |
| --- | --- | --- | --- |
| Tabs | `components/ui/tabs.tsx` | [Tabs](components/tabs.md) | Discoverable by explicit owner instruction; Panel-focus CSS repaired; browser confirmation and remaining checks stay open. |

Verification: enabled by the owner on 2026-09-16. The owner subsequently explicitly
requested discoverable status despite the reported panel-focus defect. This overrides
the ordinary admission gate for Tabs only; it does not waive or pass remaining checks.
The initial scope was documentation only. On 2026-09-17 the owner authorised the
panel-focus CSS repair and design-documentation update; no interaction changes or
consumer migration are included.

Checks from the repository root:

- `pnpm lint` and `pnpm exec tsc --noEmit`: passed after preview cleanup.
- `pnpm build`: failed in Turbopack CSS processing because opening a port was
  denied (`Operation not permitted`), even with escalated execution.
- `generate-indexes.mjs --check .`: passed; the index now includes Tabs.

- Contract structure, links and reviewed source hash: `check-contract.mjs --kind
  component` with all three indexes and `--update-sources-hash` passed.
- Independent proposed-selection discovery: a fresh agent selected Tabs for switching
  release notes/files locally, and native links for otherwise equivalent URL
  destinations with browser history. Table was excluded because these are sections,
  not repeated records. This establishes selection clarity, not runtime readiness.
  Isolated inputs and controller expectations are in `/private/tmp/tabs-contract-discovery`
  and `/private/tmp/tabs-contract-expectations.md` while verification remains incomplete.
  Final independent public-document review is retained in
  `/private/tmp/tabs-contract-discovery-review.md`; the preview source is
  `/private/tmp/tabs-contract-preview.tsx`. The review confirmed A/B decisions
  and consistency of the final defect/progress documentation.
- Ordinary edge composition: vertical line variant with a disabled middle trigger
  and retained inactive panel is expressible through the documented API.
- Browser: `pnpm dev --hostname 127.0.0.1 --port 3101` succeeded. A temporary preview
  used both orientations, default/line treatments and a disabled middle trigger.
  Right/Down moved focus without selection; Enter/Space selected Files; Enter on
  the disabled trigger did not activate it. Disabled triggers remain focusable.
  Retained inactive Overview panel had `hidden=true` and `inert=true`.
- Visual: horizontal list above panel and vertical list beside panel matched.
  Light and dark treatments rendered; at a 320px composition width both roots had
  clientWidth=scrollWidth=256. Trigger focus had a visible outline and ring.
  No external visual baseline was supplied. Inherited shadcn colours are outside
  ordinary contrast scope.
- Original failure (before the 2026-09-17 CSS repair): active panel focus has no visible indicator; see
  [Tabs panel focus is invisible](gaps.md#tabs-panel-focus-is-invisible).
- Remaining runtime evidence: controlled updates, automatic fallback on removal or
  disabling, activateOnFocus, loopFocus=false, Home/End, input state retention,
  full viewport/zoom adaptation and post-repair panel focus in both themes.

Repair (2026-09-17): replaced panel outline suppression with the existing Table
focus treatment: two-pixel foreground outline, four-pixel offset, on focus-visible.

Next: confirm the repaired panel focus in both themes and finish remaining
runtime checks. Admission is already authorised by the owner; repair and verification
remain unfinished. Do not interpret the source
hash or independent selection result as an accessibility pass. The preview route
is temporary verification scaffolding, not a product feature or automated test.
