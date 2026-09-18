---
id: environment-browsing
description: Choose a URL-addressable environment, browse its record data or empty state, and follow record or action links while preserving the relevant environment context.
status: discoverable
sources: []
examples:
  - app/page.tsx
---

# Environment browsing

## When to use

All criteria must hold:

- The user chooses an environment through a page destination represented in the URL.
- The page presents records or record attributes for that environment in a read-only table, with an empty state when no records exist.
- The user can follow a record to its details while retaining the context needed to interpret it.

## When not to use

- The choice only switches local content panels without navigation: use [Tabs](../components/tabs.md).
- The choice supplies a form value: use a labelled form control, not navigation.
- The page shows one deployment whose identity already determines its environment, with no environment choice: use a page-specific detail composition.

## Structure

This is a document-only recipe using existing public components, not a React wrapper.
Within [PageContainer](../layouts/page-container.md), use
[PageContent](../layouts/page-content.md) and follow [Page heading](page-heading.md):
place [PageHeader](../components/page-header.md) before the data regions and put
[NavigationalTabs](../components/navigational-tabs.md) for Environment in its controls.
Additional page-level actions may share that controls region.

Required regions, in reading order:

1. Page heading and current-environment navigation.
2. Optional summary of the selected subject in that environment.
3. Named [Table](../components/table.md) with record-identity links, or
   [DatasetEmptyState](../components/dataset-empty-state.md) when the loaded dataset is empty.

The consumer supplies rows, columns, summaries, destinations and copy. Use
[DescriptionItem](../components/description-item.md) for summary properties,
[VersionLabel](../components/version-label.md) for recorded versions and
[DeploymentResult](../components/deployment-result.md) for completed deployment outcomes.
Use [text links](../components/text-link.md) for record/back navigation and
[Button](../components/button.md) for standalone actions.

Existing compositions demonstrate the recipe:

| Screen | Heading / controls | Data region | Navigation |
| --- | --- | --- | --- |
| [Services](../../app/page.tsx) | Services, environment description, Environment links | Service table with environment-specific attributes, or empty-service message | Service identity link includes the selected environment |
| [Service details](../../app/services/[slug]/page.tsx) | Service name, environment description, Environment links, permitted Deploy action | Service summary, then deployment history or empty-history message | Back and Deploy retain environment; history links use deployment identity |

The minimum recipe is heading with environment navigation → table or empty state.
A service summary, deployment polling, branding and page actions are not mandatory
parts of every application of this pattern.

## Composition

### Required

- The route owns environment validation/canonicalisation, data loading and destination
  construction. Pass the same canonical environment to data selection, currentHref,
  contextual copy and applicable navigation. NavigationalTabs does not derive it
  from the browser URL or load data. Existing routes select staging only for the
  exact staging query value and otherwise use production; retain that project policy.
- Environment navigation stays present when the dataset is empty. Give it the
  accessible name Environment and distinct canonical destinations, with exactly one
  matching currentHref for the selected environment. Preserve native link behavior.
- Heading context, table accessible name and matching caption identify the same
  environment and dataset. Empty-state wording must be accurate for the actual
  absence and remain within the visible heading/navigation context. It need not
  repeat the environment when that context already identifies it: no services is
  a global absence, whereas no deployment history is specific to service/environment.
- Keep a missing property distinct from a missing dataset. A service with no version
  or no configuration can still appear as a row; do not turn it into an empty table.
  Keep service health separate from deployment outcome in text.
- Preserve context in destinations that require it: Services → service details,
  service details → Deploy, and service details → Services include environment.
  Deployment details are identified by deployment id; that record supplies its
  environment, so its URL does not require a redundant environment parameter.
- Follow Table's caption, column/row-header and scroll-region obligations. Follow
  DatasetEmptyState's heading hierarchy: h2 beneath the page heading, or h3 when
  replacing history beneath its h2. Keep the page heading and navigation outside
  the conditional table/empty region.
- Components own their documented styling and adaptation. PageContent owns the
  heading/section intervals; pages own surrounding spacing, summary grids, column
  content, grouping of header controls and action availability.
  Keep controls reachable when wrapped and retain Table's horizontal scrolling.
  The pattern adds no shared spacing values, variants or new token definitions.

### Recommendations

Keep ordinary back navigation above the page heading. Include the subject and
selected environment in action context when they distinguish the destination.
Reuse existing component contracts instead of copying their implementation or
creating a generic environment-aware table API.

### Exceptions

None. An identity-addressed deployment link without an environment query is the
normal rule above, not an exception. Loading, error and not-found routes retain their
own compositions; they are not empty datasets.

## Verification

For document changes, run the pattern contract checker with all three indexes and
check generated-index freshness. Audit selection and composition against the two
linked examples; no new automated tests are required.

Ordinary contract scenarios:

- Suitable: inspect service health in staging, then open one service. Select this
  recipe; the heading, attributes and service destination must all retain staging.
- Unsuitable: choose the version to deploy as a saved form input. Reject this recipe;
  navigation would not supply the required form value.
- Edge: the selected service has no deployment history. Keep its summary, heading
  and environment links; show DatasetEmptyState under the history heading with h3.
- Deliberate violation: navigation marks staging while the table or Deploy destination
  uses production. Reject the composition even if each component's props are valid.
- Identity case: a history link opens a deployment by id without a query. Accept it
  when record data establishes the environment and its back link restores that context.

For changes to consuming code, use the checks in [DESIGN.md](../../DESIGN.md), including
lint, TypeScript and build. In the browser verify both environments, reload and
Back/Forward, record and Deploy destinations, empty data, missing field values,
keyboard navigation and narrow-width/zoom behavior. Validate context after navigation
settles; NavigationalTabs retains the current-page marker during navigation as its
contract describes. Static source inspection does not prove rendered layout,
interactive navigation or screen-reader behavior.
