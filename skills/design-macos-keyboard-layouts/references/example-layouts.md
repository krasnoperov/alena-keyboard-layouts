# Worked example: preserve habits across seven languages

## Input problem and chosen invariant

The user has an Apple US keyboard with no Cyrillic or Spanish labels. They use
English, Russian and Spanish, then added Catalan. They wanted to stop checking
the current language to choose a punctuation key.

Russian letters occupy the physical US comma/period positions; the standard
Russian Mac layout places punctuation elsewhere. The user chose Option+comma
and Option+period in BOTH languages, even where unmodified English punctuation
would be shorter. The desired outcome was one gesture, not a claim of fewer
keystrokes. The shared US number row preserves `!@#$%^&*()` too.

## Decisions, not universal defaults

| Need | Choice | Why / tradeoff |
|---|---|---|
| English + Spanish | One Latin input source | Accents are a small extension; no third source |
| Russian | Second source | Cyrillic letters change, symbol habits stay |
| Spanish direct input | Option+A/E/I/O/U, N, Y → á/é/í/ó/ú, ñ, ü | Mnemonic vowels; Y is a nearby spare key for ü |
| Alternative accent habit | Separate Dead Keys download | Classic Option+E/U/N/I/grave sequences, no unreliable side split |
| Russian ё | Option+Russian Е → ё; Shift uppercase | One needed letter doesn't require a dead-key ceremony |
| Catalan ç/Ç | Option+C; Shift uppercase | Displaces ©, which the user needs less |
| Catalan l·l | Option+L → · | Learnable; replaces an ellipsis shortcut |
| Catalan à/è/ò | Option+grave, then vowel | One dead key handles a family |
| Catalan ï in Direct | Option+J, then I | Preserves direct Option+U → ú and Option+Y → ü |
| Ordinal indicators | Option+9 → ª, Option+0 → º | Adjacent pair; Shift keeps the same symbols |
| Cmd/Ctrl in Cyrillic | Latin Cmd plane, ASCII Ctrl plane | Keep app shortcuts and terminal editing usable |

Ordinals and the middle dot are shared across English/Russian and both variants.
ç and Latin accent combinations stay in the Latin source. We do not replace
Russian ё merely to make every Option+letter identical across scripts.
Braces displaced from Option+9/0 remain on Shift+Option+[ / ].

Examples: English text with stable punctuation; Spanish `mañana, pingüino`;
Catalan `català, cafè, això, raïm, plaça, col·legi`; Russian `ещё` and `Ё`.
For exact gestures, inspect the released key guide rather than extrapolating
that every punctuation or letter behaves identically without modifiers.

## What the investigation corrected

- An initial README described a personal layout and buried the design rationale.
  The reusable method now leads; downloadable layouts are a worked example.
- Copying custom enabled sources into both macOS preference lists caused duplicates.
  Inspecting the two domains resolved this without wiping all input preferences.
- Side-specific Option tests used flags supplied by the test itself. They were
  not evidence that physical right Option reached Codex with those flags.
- IconRef rendering showed colors while the cursor popup still looked wrong.
  That was a separate rendering path. The user chose original icons and hid the popup.
- Direct is now a hybrid for supplementary Catalan accents. The name describes
  its usual Spanish input, not a guarantee that no dead keys exist.

The user manually tested Dead Keys in Codex, then returned to Direct and
confirmed it, including ï. System/API checks and human acceptance are recorded
separately; the example is locally accepted, not universally certified.

## Extending the same Latin source

Portuguese, French and Italian reuse existing accent states. Both variants expose
Option+K for circumflex and Option+W for tilde, plus Option+S/M for æ/œ (Shift
uppercase). The extra dead keys keep Spanish Direct bindings intact. Reusing
composition states avoids a separate direct binding for every accented vowel.
Character coverage was checked against CLDR and native translation; new physical
acceptance is not inferred from those checks. Exact language-specific preferences
can be customized by the skill's interview process.
