# Key guide

## Shared punctuation

In both English Es and Russian Es (punctuation rows below):

| Gesture | Output |
|---|---|
| Option+, | , |
| Option+. | . |
| Option+[ / ] | [ / ] |
| Option+; | ; |
| Option+' | ' |
| Option+Shift+1 | ¡ |
| Option+Shift+/ | ¿ |
| Option+9 (also with Shift) | ª |
| Option+0 (also with Shift) | º |
| Option+L (also with Shift) | · |


Digits and their Shift symbols retain the US positions. Some other Option
symbols are inherited from the original layout; this is not a complete US/ABC clone.

## English Es — shared Catalan and ordinal keys

- Option+C → ç; Shift+Option+C → Ç (replaces the old © shortcuts).
- Option+L → · (replaces the old ellipsis shortcut). Type L, Option+L, L for l·l.
- Option+9 → ª; Option+0 → º, including with Shift. Example: 8.º / 8.ª; these are not degree signs.
- Braces remain on Shift+Option+[ → { and Shift+Option+] → }.
- Option+grave is the grave dead key in both variants; ordinary grave/tilde stay unchanged.

Ordinal indicators and the middle dot are unified in English Es and Russian Es.
The ç/Ç and accent additions apply only to English Es; language-specific letter bindings are unchanged.

## English Es — Direct

Option+A/E/I/O/U → á/é/í/ó/ú. Option+N → ñ. Option+Y → ü.
Add Shift for Á/É/Í/Ó/Ú/Ñ/Ü. Caps+Option uses the uppercase plane.

Direct also has two supplementary dead keys: Option+grave followed by A/E/O
produces à/è/ì/ò/ù; Option+J followed by A/E/I/O/U/Y produces ä/ë/ï/ö/ü/ÿ. For uppercase, hold
Shift on the second key. These do not replace the direct Spanish accents.
Option+J is also available in Dead Keys as an alias for diaeresis.

## English Es — Dead Keys

Press the first chord, release it, then press the letter:

| First chord | Following letter(s) | Output |
|---|---|---|
| Option+E | A/E/I/O/U | á/é/í/ó/ú |
| Option+U | A/E/I/O/U/Y | ä/ë/ï/ö/ü/ÿ |
| Option+N | A/N/O | ã/ñ/õ |
| Option+I | A/E/I/O/U | â/ê/î/ô/û |
| Option+` | A/E/I/O/U | à/è/ì/ò/ù |

Use Shift on the second key for uppercase. Dead key followed by Space emits
the accent itself. Option+A/O gives å/ø, and Option+Y gives ¥ in this variant.
English Es uses the existing composition states from the original bundle.

Both Option keys use the same mappings. An earlier left/right split passed
artificial UCKeyTranslate tests but failed real input in Codex. It was removed.

## Russian Es — both variants

Ordinary typing uses Cyrillic. Option+Russian Е (physical T) gives ё;
Shift+Option+Е gives Ё. Cmd uses Latin QWERTY.

Ctrl+A–Z emits ASCII control characters based on physical US key positions.
Examples: Ctrl+C → U+0003, Ctrl+D → U+0004, Ctrl+Z → U+001A.
Ctrl+[ → Escape; Ctrl+\ → U+001C; Ctrl+] → U+001D; Ctrl+6 → U+001E;
Ctrl+- → U+001F; Ctrl+Space/2 → NUL; Ctrl+/ → DEL.
The control plane also matches Shift/Caps/Option/Command combinations;
applications may intercept those additional modifiers independently.

## Terminal movement

With standard Emacs-style bash/zsh bindings:

- Ctrl+A / Ctrl+E: beginning / end of line.
- Ctrl+B / Ctrl+F: backward / forward one character.
- Esc, then B / F: backward / forward one word.

In Russian Es, Ctrl+A/E are the physical A/Ф and E/У keys. vi mode and custom
bindings differ. Home/End and Cmd+arrows depend on the terminal and may scroll
its buffer instead. Option-as-Meta can intercept Option before the layout;
leave it off to preserve accent input, or use Esc sequences for Meta commands.

## Additional Latin letters — both variants

These four bindings are identical in Direct and Dead Keys:

| Gesture | Output |
|---|---|
| Option+K, release, then A/E/I/O/U | â ê î ô û |
| Option+W, release, then A/N/O | ã ñ õ |
| Option+S | æ |
| Shift+Option+S or Caps+Option+S | Æ |
| Option+M | œ |
| Shift+Option+M or Caps+Option+M | Œ |

For uppercase composed letters, hold Shift on the following letter. Accent+Space
emits ˆ or ˜. An unsupported following letter emits the accent and that letter.
Dead Keys also retains its classic circumflex and tilde bindings.

Examples: Portuguese `não, pão, ações, você`; French `cœur, œuvre, français,
Noël, où, île`; Italian `città, perché, più`.

This covers the main letters used by the five listed Romance languages, not every
Romance language or every typographic convention. For example, Romanian needs
additional analysis. The reusable skill helps users customize further.
