# Design-system language

This context describes how a design system is organised and used to build product
interfaces. All definitions and canonical terms are in English.

## Language

### Participants

**End user**:
The person whose task the interface serves.
_Avoid_: Unqualified User when it could mean the person directing an agent; Consumer for the person using the product.

**Consumer**:
A person, agent or UI composition using a UI entity or design token under the system's
rules; distinguish an authoring consumer assembling UI from consuming UI using those choices.
_Avoid_: End user when referring to the party assembling the interface.

**Responsibility**:
An obligation assigned to a UI entity or its consumer, such as providing a label or
controlling spacing.

### Design system and UI

**Design system**:
A shared set of design rules, tokens, components, layouts, patterns and contracts
that guides the creation of coherent interfaces.
_Avoid_: Component library as a synonym for the whole design system.

**UI entity**:
A component, layout or pattern, whether managed by the design system or unmanaged;
design tokens are separate domain objects.
_Avoid_: Entity as an umbrella that silently includes tokens under UI contract and eligibility rules.

**Managed UI entity**:
A UI entity included in the design system's governance through a contract in its
standard component/layout/pattern directory; being managed alone does not establish eligibility for new selection.

**Component**:
A reusable unit of UI with a public interface and observable promises.
A component can contain other components without becoming a pattern.

**Layout**:
A component whose primary responsibility is arranging content through placement,
spacing, sizing or adaptation; incidental padding alone does not make a component a layout.
_Avoid_: Pattern or page when only the arrangement of content is meant.

**Pattern**:
A reusable recipe for an end-user task that specifies regions, relationships and
choices among components and layouts; a component may realise the recipe while remaining a distinct entity.
_Avoid_: Any repeated component combination without a shared task and composition rules.

**Composition**:
The parts of an interface, their order and semantic relationships, and the
distribution of responsibilities among them; a particular screen is a composition, not automatically a pattern.

**Region**:
A meaningful part of a composition with a stated purpose, such as a field group or
action area, whose content and relationships may carry separate obligations;
one region need not correspond to one visual container.

### Contracts and selection

**Contract**:
The promised selection boundary, public use, observable outcomes and composition
obligations of a component, layout or pattern.
_Avoid_: Token definition, implementation description or usage example as a synonym for a UI contract.

**Intent**:
The outcome the end user needs to achieve.
_Avoid_: The entire interface request, including its presentation constraints, as a synonym for intent.

**Purpose**:
The task a component, layout or pattern serves and its role in the design system,
stored in the contract’s frontmatter `description`.
_Avoid_: A candidate's name or visual resemblance as sufficient evidence of purpose.

**Request fact**:
Known information about the task, data or constraints, including visual requirements,
that can affect selection; an omitted fact remains unknown rather than becoming a negative condition.

**Discovery**:
Selection of UI entities and design tokens for a request using contracts, design
rules and token roles, with the conditions and unresolved facts that affect the choice.
Token choices concern consumer-controlled decisions and settings exposed by contracts;
private component details are outside discovery.
_Avoid_: Name lookup as a synonym for a completed selection.

**Composition rule**:
A design rule governing how UI parts may be combined and which obligations belong
to their consumer.

### Visual rules and tokens

**Design rule**:
A shared constraint or recommendation governing design choices, such as hierarchy,
grouping, typography or the use of tokens, with an explicit scope and force:
required or recommended. An exception specifies when a particular rule applies
differently; an example alone does not establish a requirement.

**Visual specification**:
The authoritative definition of visual properties and states for its stated scope.
It establishes the expectations against which appearance is assessed.

**Design reference**:
Design material supplied to guide a particular interface request.
A reference's authority is explicit; its presence alone does not override a required design-system rule.

**Design token**:
A named, typed design decision made available to consumers under the design system's
rules; equal values do not make tokens with different intended roles interchangeable.
_Avoid_: Raw value as a synonym for token identity; private component details as design-system tokens.

**Token definition**:
The description of a design token's type, value, intended role and usage constraints,
complemented by shared design rules.
_Avoid_: UI contract as a required format for describing a token.

**Base token**:
A design token naming a palette or scale value independently of a particular usage
role; a design system need not introduce a separate base-token layer.

**Semantic token**:
A design token whose identity expresses an intended role, such as error text or
spacing within a field group; the role remains meaningful when its value changes,
and may be scoped to a component without requiring a separate token tier.

**Alias**:
A relationship in which one token obtains its value from another token.
Referencing a token and expressing a semantic role are distinct properties.
_Avoid_: Semantic token as a synonym for every alias.

**Theme**:
A coherent set of visual choices for a presentation context, allowing colour,
typography, size and density to vary while preserving semantic roles.
Changes to the end-user journey or mandatory composition belong to patterns and contracts.

### Organisation and change

**Index**:
A directory that helps consumers find managed UI entities or design tokens and reach
their authoritative descriptions: UI contracts or token definitions.
UI indexes are generated from discoverable contracts and contain their full descriptions.
Hidden and deprecated entities remain managed outside these indexes. Token indexes
retain their own format and eligibility rules.
_Avoid_: Inventory as a separate domain concept; it is an existing name for an index.

**Adoption**:
Documenting an existing component, layout or pattern through an evidenced contract
in its standard group directory; this alone does not admit it to new selection.
_Avoid_: Admission or product use as a synonym for adoption.

**Admission**:
The authorised transition that makes a managed component, layout or pattern eligible
for new selection; eligibility does not establish correctness of a particular composition.
Adoption and admission are distinct events that may occur in the same task.
_Avoid_: Adoption as evidence that admission has occurred.

**Craft**:
The workflow for developing and maintaining a design system: reusable design
capabilities, layouts, patterns, contracts, design rules, tokens and availability.
Code changes are limited to design-related CSS, markup and public settings;
component internals and business logic remain project-owned.
It establishes and verifies the system's public promises using the project's
development process. Authoring contracts and rules is part of craft.
_Avoid_: Building a product interface as implicit permission to develop the system.

**Use**:
The workflow for building product interfaces by selecting and composing UI through
public boundaries and the design system's rules and tokens, with design-only changes.
A needed system change is handed off to craft; it requires authorised system scope
even within the same task. Both the shared capability and its resulting use are checked.

**Contract drift**:
A system gap in which the behaviour or result provided by a UI entity differs from
its observable contract promises.

**Improve**:
The procedure for surveying an existing design system without changing files, then
offering one choice for the whole result: save a document or perform bounded craft
work and verification. Related consumer presentation may change within scope; component
internals and business logic remain unchanged. Improvements depending on excluded
work remain proposals for project development.

**Gap**:
A systemic shortfall in design-system capabilities or rules, or a violation of its
promises. A missing request fact, product-specific choice or defect confined to a
consuming interface alone is not a design-system gap.
