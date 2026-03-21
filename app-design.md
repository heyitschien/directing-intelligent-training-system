---
title: Director of Intelligent Training
document_type: architecture-chain
version: 0.1
status: review
last_updated: 2026-03-20
source_document: thinking-principle-gpt-raw.md
product_type: mobile-first learning app
primary_goal: Help the user review, absorb, and internalize the Strategist OS daily through a highly visual, responsive, and accurate mobile experience.
---

# Director of Intelligent Training
## Architecture Chain

## 1. Product vision

Director of Intelligent Training is a mobile-first learning app that turns the Strategist OS into a daily practice system. It is not a document viewer. It is a visual training environment that preserves the source material exactly while translating it into intuitive screens, memorable visual metaphors, lightweight repetition, and fast workplace-friendly review sessions.

The app should feel like:
- A strategist's dashboard
- A private mental operating system
- A high-clarity learning companion optimized for short daily use

The app must preserve 100% of the source document’s meaning while improving recall, orientation, and repeat use.

## 2. Core product principles

### 2.1 Fidelity first
The source document remains the canonical truth. The app may reorganize presentation, but it must not dilute, omit, or distort the original principles.

### 2.2 Visual learning first
Every major concept should have a visual identity, a structural pattern, and a motion behavior that helps memory.

### 2.3 Mobile first
The default design target is one-handed phone usage during short sessions at work, between meetings, or during focused review breaks.

### 2.4 Fast to enter, fast to resume
The app should reopen instantly into the user's current learning state, current principle, or daily review queue.

### 2.5 Internalization over reading
The user should not only read concepts; they should repeatedly recognize, compare, rehearse, and apply them.

## 3. Source-to-app translation model

The app should translate each source section into a dedicated learning module.

| Source concept | App module | Visual metaphor | Learning behavior |
|---|---|---|---|
| The Strategist OS | Home / Core map | Command center / constellation | Orientation and entry point |
| Clarity of Intent | Intent module | Compass | Define outcomes and constraints |
| Structured Thinking | Model module | Layered system diagram | See system, levers, strategy |
| Elite Questioning | Question module | Toolbelt / prompt cards | Drill high-quality questions |
| Zhuge Liang Layer | Mindset module | Calm chamber | Slow thinking and judgment cues |
| Convergence | Strategy loop module | Circular flow | Reinforce sequence of thinking |
| How to Talk to AI | Prompt lab | Split compare view | Weak vs strong prompt contrast |
| Evolution | Progress path | Ascent ladder | Identity and growth framing |

## 4. Information architecture

### 4.1 Primary navigation
Use a bottom tab bar with four destinations:
- Home
- Learn
- Practice
- Progress

### 4.2 Screen architecture

#### Home
Purpose:
- Open instantly into today’s review
- Show current module, streak, quick resume, and one-tap drills

Key blocks:
- Daily focus card
- Strategist loop snapshot
- Continue learning
- Today’s question drill
- Saved insights

#### Learn
Purpose:
- Explore the full source content in a structured visual form

Subsections:
- Overview
- Clarity of Intent
- Structured Thinking
- Elite Questioning
- Mindset
- Convergence
- Prompting
- Evolution

#### Practice
Purpose:
- Turn passive reading into active recall

Modes:
- Flash review
- Sequence ordering
- Weak vs strong prompt comparison
- Strategic question drills
- Scenario application

#### Progress
Purpose:
- Reinforce identity and motivation

Key blocks:
- Reviewed today
- Principles mastered
- Question types practiced
- Reflection log
- Streaks and consistency

## 5. Core user flows

### 5.1 Daily workday review flow
1. Open app
2. Land on Home
3. See today's focus module
4. Start a 3-minute review
5. Swipe through one visual explanation, one contrast card, and one active recall prompt
6. Finish with a one-line reflection or save a principle

### 5.2 Deep learning flow
1. Open Learn
2. Select a principle
3. View the principle in visual-story format
4. Expand diagrams, quotes, and examples
5. Enter a related practice mode

### 5.3 Rapid recall flow
1. Open Practice
2. Choose “Quick Drill”
3. Answer 3 to 5 prompts
4. See corrected framing and source-backed explanation
5. Return to work within 2 to 4 minutes

## 6. Visual design system

### 6.1 Design direction
The visual language should feel disciplined, premium, calm, and strategic. It should avoid generic self-help styling and avoid clutter. The tone is intelligent, composed, and slightly ceremonial.

### 6.2 Visual identity by module

- Clarity of Intent: amber / gold, compass iconography, directional motion
- Structured Thinking: indigo / slate, layered cards, grid and network visuals
- Elite Questioning: crimson / orange accents, tool-card rhythm, energetic highlights
- Mindset: jade / deep green, minimal motion, generous spacing
- Convergence: violet / electric blue, loop diagrams, connected motion
- Prompting: cobalt / silver, comparison cards, before-vs-after layout
- Evolution: white / gold accents on dark base, ascent path and milestone visuals

### 6.3 Typography
Use a high-contrast mobile-friendly type system:
- Display font: strong, editorial, memorable
- Body font: extremely readable at small sizes
- Large heading scale for module entry
- Tight, calm body copy with strong spacing rhythm

### 6.4 Layout principles
- One dominant idea per screen
- Clear vertical hierarchy
- Large tap targets
- Sticky progress cues
- Minimal branching per step
- Edge-to-edge cards with generous padding
- Motion should reinforce understanding, not distract

### 6.5 Signature UI patterns
- Principle cards
- Compare cards
- Loop diagrams
- Progress path
- Drill chips
- Quote spotlight blocks
- Reflection drawer
- “Apply this now” action strips

## 7. Experience design patterns

### 7.1 Overview as interactive strategist map
Instead of showing a static table of contents, represent the document as a living system map:
- Center node: Strategist OS
- Connected nodes: the seven major learning areas
- Tap any node to enter that module
- Completed or reviewed nodes subtly glow

### 7.2 Structured Thinking as a layered explainer
The “System / Levers / Strategy” model should become a swipeable stacked-card experience:
- Card 1: system
- Card 2: levers
- Card 3: strategy
- Final card: real example

### 7.3 Elite questioning as a drill deck
The five elite question types should become a reusable drill interface:
- Front: question category and icon
- Back: explanation, usage, and example
- Optional: “use this at work now” prompt

### 7.4 Prompting as a comparison lab
Show weak and strong prompts side by side or top/bottom:
- Weak prompt in muted styling
- Strong prompt in elevated styling
- Visual annotation of what changed
- Tap highlights: outcome, constraints, levers, risks, sequence

### 7.5 Evolution as identity reinforcement
Translate “User → Operator → Strategist → Architect” into a progress path:
- Not gamified in a childish way
- More like a professional capability ladder
- Milestones tied to review consistency and practice completion

## 8. Content architecture

### 8.1 Canonical source
The canonical content remains the markdown source document.

### 8.2 Structured content layer
At build time, the markdown should be transformed into a structured content schema:
- module_id
- title
- subtitle
- source_block
- visual_type
- body
- quotes
- drills
- comparisons
- examples
- reflection_prompt

### 8.3 Fidelity rules
- No source principle may be removed
- Source wording for key lines and quotes should be preserved verbatim where important
- Every app screen must map back to a source block
- Every practice item must cite the module it came from
- Content edits require explicit review, not silent paraphrasing

## 9. Technical stack

### 9.1 Recommended stack
Use:
- React Native
- Expo
- TypeScript
- Expo Router
- React Native Reanimated
- Zustand
- SQLite or Expo SQLite
- MMKV for fast local preferences
- FlashList for performant long lists
- React Native SVG or Skia for diagrams and loop visuals

### 9.2 Why this stack
This stack is best for:
- Mobile-first development
- Fast iteration
- Excellent native performance
- Strong animation support
- Reliable offline usage
- Easy cross-platform deployment to iOS and Android

### 9.3 Content rendering strategy
Do not rely on raw markdown rendering alone for the core experience.
Instead:
- Keep markdown as source
- Parse it into structured JSON during build
- Render with purpose-built mobile components
- Use markdown rendering only for fallback or reference mode

## 10. Application architecture

```mermaid
flowchart TD
    A[Canonical Markdown Source] --> B[Build-time Parser]
    B --> C[Structured Content JSON]
    C --> D[Learning Modules]
    C --> E[Practice Engine]
    C --> F[Search and Quick Review]
    D --> G[Home]
    D --> H[Learn]
    E --> I[Practice]
    F --> J[Progress]