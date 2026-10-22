# Design a keyboard layout with an LLM

A layout is part of a person's workflow. Start by finding the decisions they
repeat, then choose which of those decisions the keyboard can remove.

## Tell the assistant what keeps interrupting you

A useful brief includes the physical keyboard, languages, applications and a few
actual examples. “I want English, Russian and Spanish” is less informative than:

> I use a US keyboard without extra labels. I don't want to move punctuation when
> I switch languages. I already type accented vowels with Option and want to keep
> that habit. I also need Ctrl shortcuts in my terminal while Russian is selected.

Have the assistant inspect existing editable sources, not invent a full keyboard
from memory. Choose which properties remain invariant before assigning new keys.
[The skill](../skills/design-macos-keyboard-layouts/SKILL.md) contains the workflow
and links to the implementation details another assistant needs.

## Keep the common layer common

This example uses two sources rather than three or four. English, Spanish and Catalan
share Latin letters; the additional characters fit into an Option layer. Russian
still needs a script change, but punctuation doesn't have to follow that change.

The user chose Option+comma and Option+period in both sources. Even English uses
the modifier. The benefit is a stable gesture rather than a smaller key count.
Later, Option+9/0 and Option+L were unified too: ª/º and the middle dot should not
change just because the text is Cyrillic. Letter-specific choices stayed local:
Option+Russian Е remains ё rather than becoming a Latin accent command.

The US number row is preserved. This doesn't mean every unmodified key is identical:
Russian letters occupy the physical bracket, semicolon, quote, comma and period
positions. The explicit common symbol layer is what resolves that collision.

## Choose direct or sequential accent input

For a small familiar set, direct chords work well: Option+O → ó. For multiple
accent families, a dead key can be easier to remember: accent first, then vowel.

We provide alternatives so the user doesn't have to relearn an existing habit:
Direct gives immediate Spanish characters. Dead Keys uses familiar Mac accent
sequences. Both are otherwise synchronized. Catalan added à/è/ò, ï/ü, ç/Ç and l·l.
To avoid displacing Direct's Option+U → ú, its diaeresis dead key is Option+J.
That is an explicit tradeoff, not a universal recommendation for every user.

The [case study](../skills/design-macos-keyboard-layouts/references/alena-case-study.md)
records the decisions, replacements and examples. A different user's languages
or preferred Option gestures should lead to different assignments.

## Preserve the application workflow

Cmd and Ctrl are not interchangeable. The Russian Cmd layer exposes Latin
QWERTY for application shortcuts. Its Ctrl layer emits ASCII control codes for
terminal use. Terminal Option-as-Meta may intercept accents before the layout;
that's a per-application setting to discuss, not something to silently overwrite.

The same principle applies to input-source switching: choose the user's shortcut,
release any conflict, and keep preferences separate from bundle installation.
[The system guide](macos-settings.md) covers our setup and rollback paths.

## Edit, inspect, then type

An LLM can modify the XML definitions and plist without a GUI editing session.
Ukelele remains useful for viewing and editing those files. The important part is
to retain a known-good reference, make targeted edits and inspect what changed.

Static checks catch missing actions and broken map inheritance. UCKeyTranslate
checks the output for the supplied key codes and modifiers. Real input checks
whether the keyboard and the application actually deliver those inputs.

We learned the difference when a left/right Option split passed the API test but
failed in Codex. The test supplied the very flags that real input wasn't delivering
to the layout. We removed that design and shipped two variants instead.

Likewise, one bundle on disk did not guarantee one source in the picker: we had
accidentally enabled the custom sources in two preference lists. Diagnose actual
state before reaching for a broad reset. Keep useful working input available.

[Installation and source-state notes](macos-settings.md) and the
[technical reference](../skills/design-macos-keyboard-layouts/references/implementation.md)
cover the details. Credit is linked where each external fix is used.
