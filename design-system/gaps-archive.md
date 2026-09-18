# AI design system demo closed gaps

### Environment tabs URL synchronisation

- Status: Resolved; recorded 2026-09-16.
- Closed: 2026-09-16.
- Triage (2026-09-16): retained, assessment C. The owner requested a distinct
  `NavigationalTabs` component with Tabs appearance and page-navigation semantics.
  Craft will provide native links via Next.js, `aria-current="page"` and a named
  navigation region; use will replace the environment adapter after shared checks.
  Native Tab/Enter navigation supersedes the previous panel-tab keyboard model by
  this explicit decision. The separate Tabs panel-focus defect is not part of repair.
- Source: `app/page.tsx` and `app/environment-tabs.tsx`.
- Request and authority: after explicitly admitting Tabs, the owner requested using
  that component for the existing environment tabs. This exception is limited to
  that composition and preserves the existing URL-selected environment.
- Affected rule: Tabs excludes URL navigation in its selection criteria. The page
  uses controlled Tabs while its local adapter owns `router.push`; the server still
  validates the environment and loads the matching data. Shared Tabs is unchanged.
- Expected: production/staging selection uses the shared styling and keyboard model,
  while direct URLs, reload and browser history continue to select the correct data.
- Scope: no general route-navigation capability, style override or change to tab
  semantics. The known panel-focus defect remains open independently.
- Assessment: C — generalising URL-synchronised selection would require a shared
  contract decision; the owner's specific use request authorises only this exception.
- Verification: `pnpm lint`, `pnpm exec tsc --noEmit` and `pnpm build --webpack`
  passed. In the built application, clicking staging changed the selected trigger,
  panel label, URL and service versions together. Reload, Back and Forward preserved
  matching selection/data. Left moved focus without navigating; Enter selected
  production. At a measured 500px viewport, page width stayed 500px and the table
  scrolled inside its region. The active panel has matching ARIA relationships.
  The inherited panel-focus defect remains; this is not a full accessibility pass.
- Resolution: introduced discoverable [NavigationalTabs](components/navigational-tabs.md)
  using Next.js links and native navigation semantics. It and Tabs import one shared
  list/item style source, `components/ui/tabs-styles.ts`; no independent copy remains.
  The Services page now supplies canonical environment hrefs directly. Removed
  `app/environment-tabs.tsx` and tab-panel markup; historical source paths above
  describe the superseded implementation. The owner's triage decision replaces
  panel-tab arrow navigation with native Tab/Shift+Tab and Enter link navigation.
- Verified by: `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build --webpack`,
  both contract checks with updated source hashes and generated-index freshness.
  Independent discovery selected NavigationalTabs for related Billing URLs, Tabs
  for local Billing panels, native links for unrelated prose references, and
  NavigationalTabs without a marker for a page outside the listed destinations.
  An initial contradiction about unmatched currentHref was corrected and the gate
  repeated in a fresh context; final selection checks passed.
- Browser evidence: a preview compared the shared styling against default Tabs in
  light/dark themes. Padding, typography, radii, colours and active shadow match;
  final navigation list is 32px and links are 25px high, matching Tabs. Links expose
  a named nav and aria-current, with no tab/panel roles. Tab focused staging with
  a visible outline/ring; Enter navigated to staging and rendered its service data.
  Reload, Back and Forward kept current-link and table caption consistent. A long-label
  preview scrolled at 192px width with 444px content; unmatched currentHref gave no
  current marker. Final page at 500px viewport had no page-level horizontal overflow.
  Preview files were removed; no automated tests were added.
- Independent limitation: the existing Tabs panel-focus gap remains open for the
  separate panel component and no longer affects this navigation composition.

### VersionLabel and DeploymentResult reference a missing design analysis

- Status: Resolved; recorded 2026-09-17 while adding deployment launch.
- Closed: 2026-09-17.
- Source: [VersionLabel](components/version-label.md) and
  [DeploymentResult](components/deployment-result.md), Public API sections.
- Expected: linked design decisions resolve to their authoritative source.
- Actual: both contracts link to `design-system/analysis.md`, which is absent.
- Evidence: `check-contract.mjs` with all three indexes reports unresolved
  `../analysis.md#a-02--отображение-версии` and
  `../analysis.md#a-01--отображение-результата-деплоя`. The contracts and their
  shared component sources were unchanged by this task.
- Assessment: C — the authoritative replacement decision source is missing;
  restoring it or identifying an equivalent source needs separate system work.
- Next: restore the referenced decisions and rerun the two contract checks.
- Resolution: preserved the full visual decisions in each authoritative contract,
  removed the unavailable historical A-01/A-02 attribution, and linked the matching
  component implementation. No API, design promise, eligibility or runtime changed.
  The historical analysis was not reconstructed or claimed to be recovered.
- Verified by: both component contract checks with all three indexes passed,
  including link resolution and source hashes; generated-index freshness passed.

### Tabs panel focus is invisible

- Status: Resolved; recorded 2026-09-16.
- Closed: 2026-09-18.
- Request: document and verify the newly installed Tabs component for design-system use.
- Source: `components/ui/tabs.tsx`, `TabsContent`; [contract](components/tabs.md).
- Expected: keyboard users can see focus when Tab moves from a trigger into its
  active panel; Tabs can become discoverable after its admission checks pass.
- Original failure: the active panel receives focus (`role="tabpanel"`, `tabIndex=0`), but
  `outline-none` removes the indicator and no box shadow replaces it.
- Evidence: local Next.js preview, Chromium, horizontal default variant. Select
  a panel containing plain text with Enter, then press Tab. `document.activeElement`
  is that panel; computed outline style is `none` and box shadow is `none`.
  The rendered screenshot also shows no focus marker. The same shared class applies
  to both orientations and themes. The temporary preview was removed after checks.
- Assessment: C — requires a shared focus-style change in TabsContent; source
  inspection and a reproducible keyboard preview establish the required change.
- Owner decision (2026-09-16): explicitly requested `discoverable` despite this
  reported defect. Admission is granted; this does not establish the original focus expectation.
- Repair (2026-09-17): removed `outline-none` and added a two-pixel
  `focus-visible` foreground outline with a four-pixel offset, matching Table's
  existing treatment. Roles, focus targets and keyboard behaviour are unchanged.
- Resolution: confirmed the existing CSS repair; no interaction or component code changed.
- Verified by: Chrome on the local Next.js preview, 2026-09-18. In separate light
  and dark horizontal/default Tabs, Tab focused Overview, Right moved to Details,
  Enter selected Details, and Tab focused its plain-text panel. The accessibility
  tree identified Details as focused; screenshots showed a dark outline in light
  theme and a light outline in dark theme. The temporary preview was removed.
- Admission remains granted by the owner decision above. Separate remaining Tabs
  adoption checks are unchanged; see the [Tabs contract](components/tabs.md).
