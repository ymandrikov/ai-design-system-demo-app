# AI design system demo open gaps

Keep unresolved system gaps here. Move closed entries in full to
[the archive](gaps-archive.md), including disposition, closure date and evidence
demonstrating the original expected result.

## Open gaps

### Environment tabs URL synchronisation

- Status: Open local exception; recorded 2026-09-16.
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

### Tabs panel focus is invisible

- Status: Open; recorded 2026-09-16.
- Request: document and verify the newly installed Tabs component for design-system use.
- Source: `components/ui/tabs.tsx`, `TabsContent`; [contract](components/tabs.md).
- Expected: keyboard users can see focus when Tab moves from a trigger into its
  active panel; Tabs can become discoverable after its admission checks pass.
- Actual: the active panel receives focus (`role="tabpanel"`, `tabIndex=0`), but
  `outline-none` removes the indicator and no box shadow replaces it.
- Evidence: local Next.js preview, Chromium, horizontal default variant. Select
  a panel containing plain text with Enter, then press Tab. `document.activeElement`
  is that panel; computed outline style is `none` and box shadow is `none`.
  The rendered screenshot also shows no focus marker. The same shared class applies
  to both orientations and themes. The temporary preview was removed after checks.
- Assessment: C — requires a shared focus-style change in TabsContent; source
  inspection and a reproducible keyboard preview establish the required change.
- Owner decision (2026-09-16): explicitly requested `discoverable` despite this
  reported defect. Admission is granted; the original focus expectation remains
  unmet and this gap stays open.
- Next: authorised craft repair of panel focus, repeat the keyboard check in both
  themes and complete remaining checks in [adoption progress](adoption.md).
