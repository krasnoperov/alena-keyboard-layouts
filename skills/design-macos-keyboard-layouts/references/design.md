# Design choices: fewer decisions while typing

## Start with the repeated interruption

Ask for an actual sentence or workflow, not just a list of desired Unicode points.
Examples: a comma changes position with the language; Spanish requires switching a
third source; Ctrl+C fails while editing a shell command in Cyrillic. The question
is what the user has to remember at that moment, and which small change removes it.

Count context-dependent choices, conflicts and relearning as well as keystrokes.
A user may choose Option+comma even in English, where comma needs no modifier:
one repeatable gesture can be preferable to two context-specific gestures. This
is a personal design choice, not a measured claim about cognition or typing speed.

## Choose a small set of invariants

- Keep number-row punctuation in the physical keycap positions when that is the user's habit.
- Use a consistent symbol layer across scripts for punctuation displaced by letters.
- Combine Latin languages when a small accent repertoire avoids source switching.
- Keep language-specific letters on mnemonic keys; don't force uniformity that displaces ё.
- Preserve Cmd and terminal Ctrl separately. An ASCII-capable text source does not guarantee either.
- Reuse stable gestures before inventing new ones, but prioritize the user's established habits.

Create a character inventory with frequency and context: basic letters, accent
variants, punctuation, typography, terminal control characters. Mark which are
required for a language versus optional conveniences. Include uppercase.

## Direct, dead keys or hybrid

| Choice | Useful when | Cost to explain |
|---|---|---|
| Direct Option+letter | Small, frequently used accent set | Multiple accents on one base letter need extra keys |
| Dead accent, then letter | One diacritic applies to several vowels; familiar Mac sequences | Two stages; unsupported combinations and state reset need testing |
| Hybrid | Existing direct habits must survive while another language adds accents | Document the exceptions rather than naming it completely direct |
| Separate sources | Scripts or habits differ enough to justify switching | Preserve a shared symbol layer and shortcuts |

Do not make apostrophe, quote, grave or tilde dead in the unmodified programming
layer without discussing the consequence. For rare accents, a supplementary dead
key may be less work than memorizing several unrelated direct assignments.

Do not silently displace an existing character: list its alternate location or
ask if it is no longer needed. Shift should be meaningful and predictable:
uppercase for letters, often the same output for symbols with no case.

## Present a reviewable design

Show physical key / modifiers / output for every changed binding and explain
what it replaces. For dead keys show complete sequences, including release and
where Shift is pressed. Keep immutable original layouts for comparison.
Offer alternatives only for genuine tradeoffs; ordinary implementation details
need not become a long preference questionnaire.
