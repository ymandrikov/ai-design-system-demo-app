# Анализ паттернов и лейаутов — 2026-09-19

Область: весь UI приложения в `app/` и `components/`. Рассмотрено текущее рабочее
дерево, включая незакоммиченный Status summary. Исходный анализ изменял только отчёт.
LP-01 впоследствии согласован и реализован; остальные пункты остаются рекомендациями.
История REC/META сохранена.

## Приоритетные рекомендации

| Приоритет | Кандидат | Решение | Реальные потребители |
| --- | --- | --- | --- |
| Готово | LP-01 — двухчастная сводка | StatusSummaryLayout реализован | Сводки сервиса и деплоя |
| 2 | LP-02 — проверка смены версии перед запуском | Документировать общий pattern, без общего компонента | Форма Deploy и подтверждение rollback |
| — | LP-03 — верх страницы и возврат | Оставить текущую композицию | Четыре основные страницы; возврат на двух detail-страницах |
| — | LP-04 — группы действий и fallback-экраны | Переиспользовать существующее, без нового layout | Форма, header, диалог, loading/error/not-found |

LP-01 первый: две реализации повторяют уже установленное правило компоновки.
LP-02 имеет пользу как правило принятия решения, но разные сценарии не требуют
одинакового UI. Остальные совпадения пока не оправдывают новую границу.

### LP-01 — Двухчастная сводка

**Тип:** layout. **Действие:** extract new. **Статус:** реализовано по запросу владельца «сделай 1».

[StatusSummaryLayout](../components/layouts/status-summary-layout.tsx) теперь используется
обеими страницами; [контракт](layouts/status-summary-layout.md) опубликован в индексе.
`primary` содержит прежние DescriptionItem, `children` — supporting-контент. Поля,
условия, ссылки и live region сохранены; внутренние space-y-2/space-y-4 остались
у потребителей. Контракт Status summary и DESIGN.md отражают нового владельца раскладки.
Структурные проверки обоих контрактов, актуальность индексов, lint и webpack build прошли.
Обычный аудит выбора: сводка другого сервиса без истории подходит с явным empty-текстом;
форма выбора и таблица не подходят; вложенный dl вместо primary-пар нарушает контракт.
Ниже сохранено исходное обоснование предложения; будущие шаги описывают фазу до реализации.
Источники и потребители: [ServicePage](../app/services/[slug]/page.tsx),
[DeploymentPage](../app/deployments/[id]/page.tsx).

Обе страницы повторяют поверхность `rounded-lg border bg-card text-card-foreground`,
верхний `dl` с `flex flex-wrap gap-x-8 gap-y-4 p-4` и нижнюю область с `border-t p-4 text-sm`.
Общая ответственность: разместить главные статус/версию выше вспомогательных сведений,
с единым разделителем, внутренними отступами и переносом основных полей.

[Status summary](patterns/status-summary.md) уже является переиспользуемым паттерном:
создавать второй не нужно. Пока повторяется его реализация. Возможный узкий
`StatusSummaryLayout` владеет поверхностью, верхним списком и нижним контейнером;
страницы передают содержимое двух областей. Поля, данные, live region, ссылки,
последствия и внутренняя раскладка нижней области остаются у страниц.
Не нужны варианты `service/deployment`, вычисление статуса или универсальная схема полей.

**Альтернативы:** PageContent располагает секции страницы и прямо исключает внутренности
карточек; PageContainer владеет main и шириной; DescriptionItem владеет одной парой,
а не взаимным расположением областей. Ни один существующий layout не закрывает эту границу.

**Различия и риски:** у сервиса нижняя область содержит inline dt/dd и `space-y-2`,
у деплоя — отдельный список и `space-y-4`. Не унифицировать их автоматически;
не добавлять обёртки, нарушающие dl, и не переносить live region на всю сводку.
Польза — одна реализация общей двухуровневой структуры, а не сокращение бизнес-логики.

**Совместимость / следующий шаг:** отдельный craft должен согласовать перенос
ответственности с страниц: текущий Status summary явно оставляет композицию им.
Затем use на обеих страницах с сохранением вида и семантики. Проверить длинные значения,
отсутствующую версию/историю, активный и завершённый деплой, обе темы и узкую ширину.
Основание — исходники и существующий контракт; визуальная эквивалентность не проверялась.

Это ограниченный пересмотр REC-05/META-02: раньше совпадала в основном поверхность
разных списков; сейчас есть общий контракт и одинаковая двухчастная структура.
Прежний отказ от универсального Card/SummaryGrid для форм, диалогов и всех списков остаётся.

### LP-02 — Проверка смены версии перед запуском

**Тип:** pattern. **Действие:** extract new как документированный рецепт; предложение.
Потребители: [DeployForm](../app/services/[slug]/deploy/deploy-form.tsx) и
[DeploymentActions](../app/deployments/[id]/deployment-actions.tsx).

Общая задача — перед запуском понять, какая версия будет заменена какой и в каком
контексте. В форме это Current version → Target version, сведения о выборе и production
warning; в rollback — две подписанные версии и последствия в ConfirmationDialog.
Рецепт может связать контекст сервиса/окружения → текущую и целевую версии → последствия
→ действие и обратную связь. Контекст может находиться в заголовке страницы или диалога.

**Альтернативы:** VersionLabel уже оформляет значения; DescriptionItem — пары.
Modal confirmation определяет подтверждение и уже описывает rollback, но исключает ввод
данных. Status summary прямо исключает выбор версии и подтверждения. Новый рецепт
должен только связать доменные сведения перед запуском, ссылаясь на эти владельцы.

**Различия:** форма выбирает цель и допускает отсутствие текущей версии, диалог только
подтверждает готовую цель. Cancel формы — ссылка, Cancel диалога закрывает окно.
Предупреждение production и последствия rollback различны; общий компонент или порядок
кнопок для обоих сценариев не предлагаются. Данные, выбор, разрешения и запросы остаются
проектной логикой. Источник истинной текущей версии должен задавать вызывающий код.

**Польза:** явная связь текущей/целевой версии с контекстом и последствиями без копирования
формы в диалог. **Риск:** дублировать Modal confirmation или смешать текущую версию среды
с версией рассматриваемого деплоя. Следующий craft должен определить эту узкую область
применения; если отдельный рецепт не добавляет правил сверх существующих, оставить локально.
Проверка здесь — чтение обоих потоков UI; корректность серверных данных и runtime не аудировались.

### LP-03 — Верх страницы и возврат

**Тип:** layout-кандидат. **Действие:** keep local / reuse existing.
Во всех четырёх [основных](../app/page.tsx) [страницах](../app/services/[slug]/page.tsx)
повторяется AppIdentity с `mb-12`, затем PageContent;
[деплой](../app/deployments/[id]/page.tsx) и сервис добавляют back-nav с `mb-6 text-sm`,
[форма](../app/services/[slug]/deploy/page.tsx) использует narrow-ширину.
PageContainer, AppIdentity, PageContent и TextLink уже владеют значимыми частями.
Общий AppShell ради этих обёрток даст мало пользы и затронет явно закреплённое владение
внешними отступами. Два back-nav пока малы; URL и подписи всё равно останутся у страниц.
Не переносить branding в root layout: fallback-экраны его не используют.
Следующий шаг не нужен; вернуться при изменении общей верхней области нескольких экранов.

### LP-04 — Действия, fallback и единичные композиции

**Тип:** layout/pattern-кандидаты. **Действие:** keep local / reuse existing.
`flex flex-wrap items-center gap-4` встречается в ServicePage controls, DeployForm и
DeploymentActions. Это разные задачи: навигация окружений с Deploy, submit/Cancel,
retry/rollback. Footer ConfirmationDialog уже имеет собственный контракт порядка и
выравнивания. Универсальный ActionBar смешает эти обязанности; сохранить текущих владельцев.

Loading, error и два not-found уже используют PageContainer/PageHeader. Их busy/output,
retry и навигация различаются; DatasetEmptyState предназначен для пустого набора, а не
для этих состояний маршрута. Сохранить REC-05. Отдельное прежнее замечание сохраняется:
[error.tsx](../app/deployments/[id]/error.tsx) размещает Try again вне PageHeader.controls;
это возможность применить существующий Page heading в use, без нового паттерна.

Stages, logs и radio-список выбора версии имеют по одному потребителю. Не выделять
Stepper, LogViewer, общий FormLayout или Card только из повторяющихся классов.
REC-04 о feedback остаётся актуален: принадлежность ошибок полю/диалогу различается.

## Уже переиспользуется

- PageContainer — восемь route views; PageContent — четыре основные страницы.
- Environment browsing — Services и Service details; Status summary — обе detail-сводки.
- Page heading, Modal confirmation и Label formatting уже представлены контрактами.
- AppIdentity, TextLink, DescriptionItem, Table, DatasetEmptyState, VersionLabel и
  DeploymentResult уже извлечены. Сейчас найдено 12 вызовов DescriptionItem в четырёх
  потребителях (Completed условный), а не исторические 11; inline dt/dd сервиса отдельно
  разрешён Status summary. REC-01–03 и META-01 не предлагать повторно.

## Покрытие и ограничения текущего анализа

| Область | Статус и прочитанные источники |
| --- | --- |
| Основные страницы | Проверены app/page.tsx, app/services/[slug]/page.tsx, app/services/[slug]/deploy/page.tsx, app/deployments/[id]/page.tsx |
| Локальный UI | Проверены deploy-form.tsx и deployment-actions.tsx в соответствующих маршрутах |
| Fallback | Проверены service not-found и deployment loading/error/not-found |
| Общий UI | Прочитаны components/ui/*.tsx, tabs-styles.ts, components/layouts/*.tsx, components/deployments/*.tsx |
| Оболочка и стили | Проверены app/layout.tsx, app/globals.css |
| Система | Проверены три индекса, статусы контрактов, все layout/pattern-контракты и относящиеся к кандидатам component-контракты, DESIGN.md, существующие analysis/gaps |

Не осталось ожидающих областей UI. Зависимости, generated-код, серверные actions и БД
не входят в аудит логики. Проверка основана на исходниках и контрактах; браузер, build
и runtime-проверки не запускались, на этапе исходного анализа, поскольку код не менялся и рекомендации не заявляют
доказанной визуальной или поведенческой эквивалентности. Новых gaps нет: возможности
извлечения сами по себе не являются нарушениями. Источники и решения перечитаны при
обновлении отчёта; прежние изменения рабочего дерева сохранены.

## История анализа до 2026-09-19

Ниже сохранён предыдущий отчёт и решения с прежними якорями. Количества, описания
исходников и coverage относятся к прежним запускам; актуальные выводы приведены выше.

# Recurring UI analysis

Date: 2026-09-18. Scope: all project-owned UI in `app/` and `components/`,
compared with all three design-system indexes and relevant contracts.
The analysis produced recommendations. The owner subsequently authorised REC-01, REC-02 and REC-03, now implemented;
other recurring-pattern candidates remain proposals.
Prior META decisions and anchors are preserved below. Their original observations are
historical; current source confirms DescriptionItem is used for all 11 pairs.

## Recommended work order

| Priority | Candidate | Action | Evidence / benefit |
| --- | --- | --- | --- |
| Done | REC-01 — ordinary text links | Shared styling helper implemented | Seven links repeat one underline/focus treatment across five files; centralise it without adding routing logic. |
| Done | REC-02 — application identity | AppIdentity implemented | Four identical app-name/demo-label groups; one owner for this identity and its typography. |
| Done | REC-03 — browse records by environment | Document-only pattern added | Two real flows combine environment navigation, contextual headings and named data tables; preserve context through navigation and empty states. |
| — | REC-04 — request feedback | Keep local for now | Similar markup, but form validation, retry feedback and modal feedback have different ownership. |
| — | REC-05 — surfaces, summaries and route fallbacks | Reuse existing capabilities; keep local composition | Repeated classes alone do not justify a configurable page/card framework. |

Order reflects concrete reach and bounded benefit, not measured implementation cost.
No user task is proven blocked by these repetitions. REC-01/02 are independent;
REC-03 can be documented using existing components without waiting for either.
REC-01–03 are approved and implemented; REC-04/05 remain recommendations.

### REC-01 — Ordinary text links

**Kind:** shared styling capability for a component responsibility. **Action:** extract new. **Status:** implemented.

The original class-string extraction has been replaced by
[TextLink](../components/ui/text-link.tsx), with its
[public contract](components/text-link.md). The later title/ordinary link rules
supersede the extracted visual treatment: title links use `variant="title"`,
ordinary links use the default variant, including form Cancel.
The following rationale records the original analysis, not the current styling rules.

Seven actual links share `text-primary underline underline-offset-4
focus-visible:outline-2 focus-visible:outline-offset-4`:

- [Services](../app/page.tsx): service identity link in the table (also font-semibold).
- [Service details](../app/services/[slug]/page.tsx): back navigation and deployment identity.
- [Deployment details](../app/deployments/[id]/page.tsx): back navigation and source deployment.
- [Service not-found](../app/services/[slug]/not-found.tsx): return to Services.
- [Deployment not-found](../app/deployments/[id]/not-found.tsx): return to Services, with outer spacing/display.

Shared responsibility: visually identify an ordinary navigation/reference link and
provide its consistent keyboard-focus treatment. Recommend a single exported class
string/style helper applied to existing Next.js Link elements, using the project's
existing helper convention. A wrapper and new routing abstraction are unnecessary.

Consumers retain href derivation, visible text, query parameters, nav landmarks,
placement, and the current service-name emphasis. If the helper is adopted, document
these permitted differences instead of opening unrestricted visual overrides.

Alternatives considered: [Button](components/button.md) already exposes buttonVariants,
but explicitly excludes record links in prose/tables. Its link variant also has button
spacing and a different underline treatment. [NavigationalTabs](components/navigational-tabs.md)
owns peer destinations, not these individual links. Badge is an annotation, not a
substitute for plain reference navigation. No current managed capability owns this treatment.

Benefit: one source for seven identical link treatments, including focus styling.
Risk: accidentally giving links button semantics or absorbing route/context logic.
Compatibility target: preserve all current destinations, text and appearance.
Next step: craft the small public styling capability and its usage contract, then
use it at these seven sites. Settle the shared treatment and allowed consumer emphasis
in that task; observed classes alone are not a newly authorised system standard.

### REC-02 — Application identity

**Kind:** component. **Action:** extract new. **Status:** implemented.

The owner approved a fixed AppIdentity without props, variants or interaction,
with outer spacing owned by pages. [AppIdentity](../components/ui/app-identity.tsx)
now owns the paragraph, app name, demo qualifier, typography and internal spacing;
its [contract](components/app-identity.md) defines the public boundary.

All four consumers use it inside an mb-12 wrapper:
[Services](../app/page.tsx), [Service details](../app/services/[slug]/page.tsx),
[Deployment details](../app/deployments/[id]/page.tsx) and
[Deploy page](../app/services/[slug]/deploy/page.tsx).
The original text, typography, placement and outer spacing are retained.
Loading, error and not-found views remain unchanged.

[PageHeader](components/page-header.md) still owns the page heading;
[PageContainer](layouts/page-container.md) owns page dimensions and the
[root layout](layouts/root-layout.md) owns the document. AppIdentity adds neither
navigation nor a new landmark. This keeps the four repeated identity blocks under
one styling owner without introducing an AppShell or coupling identity to page width.

### REC-03 — Browse records by environment

**Kind:** pattern. **Action:** document the existing recipe without new runtime code. **Status:** implemented.

The owner authorised the [Environment browsing pattern](patterns/environment-browsing.md).
Its contract records context ownership and composition using the existing components;
no runtime code changed. Static review covers both screens and the suitable, unsuitable,
empty-history, mismatched-environment and identity-addressed link scenarios.
The following preserves the original analysis rationale.

Two current flows establish a common user task: choose an environment, inspect its
records, and navigate to a selected record while retaining the relevant context:

- [Services](../app/page.tsx): PageHeader + NavigationalTabs + Table of services,
  or DatasetEmptyState. Service links include the selected environment.
- [Service details](../app/services/[slug]/page.tsx): PageHeader + NavigationalTabs,
  service summary, then deployment history or DatasetEmptyState. Deploy/back links
  retain environment; deployment record URLs use identity, whose data establishes
  that deployment's environment in [Deployment details](../app/deployments/[id]/page.tsx).

Proposed recipe: route owns canonical environment, data and destinations; heading and
navigation identify the current context; named Table/caption and empty copy describe
that same context; row identity links open the record. Additional detail summaries,
page actions, column definitions and empty heading levels remain consumer-owned.
A deployment detail route has no environment switcher and is outside this recipe.
A local panel switch or a saved form choice is also outside it.

Reuse [Page heading](patterns/page-heading.md), [NavigationalTabs](components/navigational-tabs.md),
[Table](components/table.md), [DatasetEmptyState](components/dataset-empty-state.md)
and the existing value components. Page heading already covers orientation/actions;
this proposed pattern adds relationships between selected context, dataset, empty
state and subsequent navigation. Avoid duplicating their individual contracts.

Benefit: makes cross-component obligations discoverable without a generic data-table
component or EnvironmentTabs wrapper. Risk: inventing one schema for services and
history, or making all record links carry query parameters even when record identity
already fixes the environment. Server validation and loading remain project-owned.
The documented pattern now covers both datasets and defines checks for empty states,
switching/reloading and context-preserving navigation. Browser behavior was not
reverified during this documentation-only change.

### REC-04 — Request feedback

**Kind:** component/pattern candidate. **Action:** keep local for now.

[DeployForm](../app/services/[slug]/deploy/deploy-form.tsx),
[DeploymentActions](../app/deployments/[id]/deployment-actions.tsx) and
[ConfirmationDialog](../components/ui/confirmation-dialog.tsx) repeat pending text,
error text and live-region markup. The shared task is understanding whether a request
is running or failed, but their actual obligations differ:

- DeployForm links field errors through deploy-error, uses an atomic live region,
  disables a fieldset, and submits through useActionState.
- DeploymentActions owns retry/rollback request state and navigation; its local
  feedback is rendered when there is no rollback dialog.
- ConfirmationDialog already owns in-modal feedback under its contract; the caller
  supplies pending/error values. Moving this out must preserve modal relationships.

Reuse Button and ConfirmationDialog as currently intended. A generic request-state
hook would cross into project logic and is not justified by this UI analysis.
A future presentational feedback component needs a demonstrated common contract for
message association and announcements first. Current differences are not evidence
of a bug. No accessibility behavior was claimed equivalent by reading markup alone.

### REC-05 — Surfaces, summaries and route fallbacks

**Subsequent owner decision:** PageContent is now implemented for all four main pages.
Its [contract](layouts/page-content.md) owns heading/section spacing and section
heading typography. It does not introduce a universal Card, summary grid or route
fallback wrapper; those keep-local recommendations below remain applicable.


**Kind:** layout/component candidates. **Action:** reuse existing / keep local.

- Service and deployment detail summaries share a bordered card surface, but their
  fields, columns and supporting content differ. DescriptionItem already centralises
  their repeated pair responsibility; retain META-02's local dl/grid decision.
- Table, DatasetEmptyState, deployment stage cards, logs and the DeployForm version
  transition also use card tokens. They respectively own tabular scrolling, empty
  content, ordered stages, timestamped output and a before/after comparison. A universal
  Card/Section with switches would conflate responsibilities. Reconsider only if a
  shared surface policy needs an independently maintained boundary.
- Loading, error and two not-found views already reuse PageContainer and PageHeader.
  Loading owns busy/output semantics; error owns retry; service not-found reads query
  context inside Suspense; deployment not-found has a fixed destination. Keep these
  small compositions rather than adding a RouteState variant API.
- Stage cards and logs each have one current owning screen. Their iteration over
  records does not establish repeated consumer demand for Stepper or LogViewer.
- UTC formatting is already shared in [presentation.ts](../lib/deployments/presentation.ts).
  Full dates, log clock times, elapsed seconds and missing/pending timestamps have
  different meanings; no generic DateTime component is currently warranted.
- RefreshActiveDeployment is already reused by service history and deployment detail.
  It renders no UI and owns polling behavior; keep that project logic outside design
  component extraction.

Next step: none for these extractions. Revisit only when a concrete shared responsibility
or repeated maintenance requirement emerges. Existing contracts remain authoritative.

## Existing reuse and incidental findings

- META-01 remains implemented: 11 DescriptionItem calls in four consumers, one pair
  implementation, uniform mt-2, and a polite live region only on deployment status.
  Its accepted decisions are unchanged; META-02/META-03 still apply.
- VersionLabel and DeploymentResult already serve tables and descriptions; Badge owns
  their visual treatment. Do not add parallel version/status renderers.
- Tabs and NavigationalTabs already share tabs-styles.ts while retaining distinct
  local-panel and URL-navigation behavior. No additional unification recommended.
- PageContainer, PageHeader and DatasetEmptyState already remove major layout and
  empty-state duplication. Both existing patterns remain reusable as written.
- A product composition issue was observed in
  [deployment error.tsx](../app/deployments/[id]/error.tsx): its page-level Try again
  action sits after PageHeader, whereas [Page heading](patterns/page-heading.md)
  requires page actions in the header controls. This is consumer drift with an
  existing remedy, not a missing system capability. A separate use task can move
  the button into controls while preserving retry logic. No repair was made here.

## Coverage and evidence for this run

| Area | Coverage | Sources |
| --- | --- | --- |
| Services overview | Inspected | app/page.tsx |
| Service detail and shared not-found | Inspected | app/services/[slug]/page.tsx, not-found.tsx |
| Deploy page, form and submission boundary | Inspected | app/services/[slug]/deploy/page.tsx, deploy-form.tsx, actions.ts |
| Deployment detail, actions and fallbacks | Inspected | app/deployments/[id]/page.tsx, deployment-actions.tsx, actions.ts, loading.tsx, error.tsx, not-found.tsx |
| Shared components/layouts | Inspected | components/ui/*, components/layouts/page-container.tsx, components/deployments/* |
| Document shell, tokens, presentation | Inspected | app/layout.tsx, app/globals.css, lib/deployments/presentation.ts |
| Contracts/indexes/prior decisions | Inspected | DESIGN.md, all three indexes, relevant contracts, prior META analysis and open journal |

Repository-wide source searches located repetitions; source/consumer inspection
established the responsibilities above. Counted four app identities, seven ordinary
links, two environment-navigation/table flows and eleven DescriptionItem uses.
Dependencies and generated code were excluded; database/deployment internals were not
subject to a logic audit. Existing readable sources from this conversation were reused.

This is a source-based extraction analysis, not a full contract, visual or interaction
audit. No build/browser run is needed to establish these repetition counts; actual
rendering, announcements, keyboard behavior and runtime parity remain outside its
claims. No evidence of a new systemic shortfall was established, so no gaps were added.
All in-scope UI areas have an analysis disposition; no inspection area remains pending.
Only this report changes in this run; earlier uncommitted implementation is preserved.

## Earlier metadata analysis and decisions

The following preserves the prior analysis and its stable META anchors. References to
pre-extraction source structure and pending craft choices describe that earlier phase;
the implemented contract and current findings above supersede those observations.

### Анализ пар «название — значение»

Дата: 2026-09-18. Запрос: `Deployment status` и похожие элементы.
Область: все `dl/dt/dd` в коде приложения и похожие подписи с
`text-sm text-muted-foreground`; сравнение с существующими публичными возможностями.
META-01 согласован владельцем и реализован 2026-09-18; META-02/META-03 остаются рекомендациями.
[Контракт DescriptionItem](components/description-item.md) содержит действующие правила.
Ниже сохранены исходные наблюдения до извлечения; расположение строк могло измениться.
Предыдущего файла analysis.md на момент анализа нет; исторические A-01/A-02,
упомянутые в других документах, здесь не восстанавливаются и не переиспользуются.

## Рекомендации по приоритету

### META-01 — Выделить пару «название — значение»

**Тип:** компонент. **Действие:** extract new. **Статус:** реализован.

Владелец согласовал целую пару, единый spacing-2 и миграцию всех 11 применений.
Реализация: `components/ui/description-item.tsx`; все четыре потребителя из таблицы
используют её. Сохранены live region статуса, перенос commit и оформление значений.
Проверки типов, lint, структуры контракта и актуальности индексов прошли.
Браузерная проверка не выполнялась.

Найдены 11 пар в четырёх потребителях:

| Источник | Поля | Раскладка списка | Отступ внутри пары |
| --- | --- | --- | --- |
| [DeploymentPage](../app/deployments/[id]/page.tsx) — dl на строке 73 | Version, Commit, Deployment status, Duration | `grid gap-6 sm:grid-cols-2 lg:grid-cols-4` | `dd: mt-2` |
| [ServicePage](../app/services/[slug]/page.tsx) — dl на строке 64 | Service state, Current version, Last deployment | `grid gap-6 sm:grid-cols-3` | `dd: mt-2` |
| [DeploymentActions](../app/deployments/[id]/deployment-actions.tsx) — dl на строке 75 | Current version, Target version | `grid gap-4 sm:grid-cols-2` | `dt: mb-2` |
| [DeployForm](../app/services/[slug]/deploy/deploy-form.tsx) — dl на строке 51 | Commit, Description | `space-y-4` | `dd: mt-1` |

У всех названий одинаковые `text-sm text-muted-foreground`. Повторяется не только
оформление текста, но и самостоятельная ответственность: связать название свойства
с его доступным только для чтения значением и выдержать внутренний отступ.
Это даёт основание для небольшого `DescriptionItem`, содержащего `div > dt + dd`
внутри родительского `dl`. Такая группировка соответствует
[HTML Standard](https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element).

Предлагаемая граница:

- Компонент владеет семантической парой, оформлением названия и согласованным
  расстоянием до значения. Название и содержимое значения передаются извне.
- Потребитель оставляет у себя `dl`, количество колонок, адаптацию, расстояние между
  парами, фон секции, порядок полей и условное отображение.
- Потребитель выбирает данные, форматирование, пустые состояния и доменные компоненты
  значения. Никаких запросов, таймеров, state или обработчиков внутри новой границы.
- Должна сохраняться возможность передать `aria-live="polite"` именно на `dd`
  статуса. Остальные пары не должны автоматически становиться live regions.
- Содержимое допускает VersionLabel, DeploymentResult, native code и обычный текст.
  Нужно сохранить перенос длинного commit и выделение текста состояния/длительности,
  не меняя оформление вложенных Badge.

**Польза:** одна точка изменения подписи и внутреннего интервала для 11 полей;
сохранение общего семантического устройства в серверных страницах и клиентских
форме/диалоге. Точный выигрыш в строках не измерялся: основание — общая ответственность.

**Существующие альтернативы:** [VersionLabel](components/version-label.md) и
[DeploymentResult](components/deployment-result.md) уже подходят для значений и прямо
оставляют подписи/раскладку потребителю. Их следует повторно использовать внутри пары.
[Badge](components/badge.md) даёт визуально выделенную аннотацию, а не оформление
названия поля. [Table](components/table.md) предназначен для сравнения записей по общим
полям; замена этих списков таблицей не следует из текущих задач.
[PageHeader](components/page-header.md) идентифицирует страницу целиком.
[PageContainer](layouts/page-container.md) управляет main страницы, а не парой данных.
Существующей managed-сущности для такой пары в стандартных каталогах нет.

**Совместимость и решения перед craft:**

1. Согласовать внутренний интервал: сейчас форма использует `mt-1`, остальные пары —
   `mt-2` либо `mb-2`. Это наблюдение, а не правило «формы всегда компактнее» и не
   доказанный дефект. Рекомендация — один интервал, если владелец допускает изменение
   формы; при требовании сохранить вид сначала определить ограниченный способ
   сохранить оба существующих интервала. Не придумывать density-варианты без условия выбора.
2. Определить минимальную публичную передачу семантических атрибутов значения и
   ответственность за перенос/выделение текста. Универсальный `as` и неограниченные
   style-overrides текущими случаями не обоснованы.
3. Согласовать миграцию всех четырёх потребителей. Компонент должен быть пригоден
   для server/client использования без собственного интерактивного состояния.

**Риски:** потерять live region, начать использовать компонент вне dl, изменить
перенос длинных значений или навязать всем спискам одинаковую сетку. Связь с БД,
вычисление длительности, обновление прогресса, выбор версии и rollback остаются
в существующих потребителях.

**Следующий шаг:** отдельный craft для согласованной границы и контракта, затем use
для согласованных потребителей; проверки компонента и фактических композиций.
При реализации проверить длинный commit/description, пустые версии и историю,
активный/завершённый статус, узкую ширину и readonly-контекст диалога.

### META-02 — Сохранить композицию списков у потребителей

**Тип:** layout-кандидат. **Действие:** keep local. **Статус:** рекомендация.

Четыре списка из META-01 обслуживают сводку деплоя, сводку сервиса, последствия
rollback и сведения о выбранной версии. Их колонки, интервалы и окружение различаются.
Общая обёртка SummaryGrid с настройками колонок пока не даёт преимущества перед
существующим native dl. Карточка также не общая: у формы нет такой внешней секции,
а модальная поверхность уже принадлежит ConfirmationDialog.

Повторение пар не доказывает единый пользовательский pattern. Существующий
[Modal confirmation](patterns/modal-confirmation.md) уже определяет задачу rollback
и оставляет семантические детали потребителю; расширять его до всех списков не нужно.
При появлении общей ответственности за адаптацию нескольких списков можно отдельно
пересмотреть layout-кандидат. Сейчас дополнительная реализация не рекомендуется.

### META-03 — Не объединять весь muted-текст в общий Label

**Тип:** компонент-кандидат. **Действие:** keep local / reuse existing.

| Похожие элементы | Решение и основание |
| --- | --- |
| [DeployForm](../app/services/[slug]/deploy/deploy-form.tsx): `Current version → Target version` | Сохранить локальную сводку перехода: одна подпись описывает направление между двумя версиями. Замена одним DescriptionItem возможна только после решения о такой композиции; одинаковый цвет её не требует. |
| [DeployForm](../app/services/[slug]/deploy/deploy-form.tsx): label и legend выбора версии | Оставить семантику интерактивной формы; не подменять названием readonly-свойства. |
| [PageHeader](../components/ui/page-header.tsx), [DatasetEmptyState](../components/ui/dataset-empty-state.tsx), [ConfirmationDialog](../components/ui/confirmation-dialog.tsx): descriptions | Оставить оформление у существующего владельца: пояснение страницы, пустого набора или последствий действия. |
| [TableCaption / TableHead](../components/ui/table.tsx), потребители [Services](../app/page.tsx) и [ServicePage](../app/services/[slug]/page.tsx) | Сохранить существующие compound-компоненты и табличные отношения. |
| [DeploymentPage](../app/deployments/[id]/page.tsx): процент выполнения; DeployForm/DeploymentActions/ConfirmationDialog: pending-текст | Это обратная связь о процессе, а не название поля. Сохранить существующее размещение и объявления. |

Универсальная обёртка только над `text-sm text-muted-foreground` смешала бы разные
семантические обязанности. Повтор CSS здесь не является доказательством общей сущности.
Новые токены также не требуются для предложения: существующий muted-foreground
уже подключён в [globals.css](../app/globals.css) и описан в [DESIGN.md](../DESIGN.md).

## Покрытие и доказательства

- Проверены три индекса и наличие связанных контрактов; прочитаны релевантные
  контракты значений, Badge, Table, PageHeader, PageContainer, ConfirmationDialog
  и обоих patterns. Скрытой альтернативы DescriptionItem в каталогах контрактов нет.
- Поиск по исходникам `dl/dt/dd` дал четыре списка и 11 пар; все четыре файла
  прочитаны целиком, включая условные значения, состояние формы и вызовы диалога.
- Проверены совпадения muted-подписей в app/components, реализация компонентов
  значений, владельцы похожей типографики и табличные потребители за пределами списков.
- Чтение исходников обосновывает границы и число повторов. Поведение браузера,
  live announcements, фактические размеры и адаптация не подтверждались запуском.
  Рекомендации не утверждают наличие визуального или поведенческого дефекта.
- CLI modern-web-guidance отсутствует в локальном npm-кэше (`ENOTCACHED`);
  семантика списка сверена с первичным стандартом HTML по ссылке выше.
- Анализ выбранной области завершён; остальной UI не является предметом этого отчёта.
  Общесистемных нарушений в рассмотренном повторении не установлено: локальная
  композиция разрешена действующими контрактами. Новых gap-записей нет.

Исходный анализ изменял только отчёт. Последующая согласованная реализация META-01
добавила компонент и контракт, обновила индекс, DESIGN.md и четыре потребителя.
