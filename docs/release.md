# 1.0.0 — Multilingual Mac Keyboard Layouts

One US keyboard, two macOS input sources: **English Es** for English, Spanish,
Catalan, Portuguese, French and Italian; **Russian Es** for Cyrillic.
The layouts keep the US number row and provide consistent Option punctuation
across scripts. They are native macOS bundles and need no background app.

[Explore the interactive keyboard](https://keyboard.krasnoperov.me) ·
[Watch the typing demo](https://keyboard.krasnoperov.me/typing-demo/) ·
[Key guide](https://github.com/krasnoperov/macos-multilingual-layouts/blob/main/docs/key-guide.md) ·
[macOS setup](https://github.com/krasnoperov/macos-multilingual-layouts/blob/main/docs/macos-settings.md)

## Choose one variant

| | Direct input | Dead keys |
|---|---|---|
| é | Option+E | Option+E, release, then E |
| ñ | Option+N | Option+N, release, then N |
| ü | Option+Y | Option+U, release, then U |
| Other accents | Supplementary dead keys | Classic Mac dead-key families |

Direct keeps immediate Spanish á/é/í/ó/ú/ñ/ü. Both variants also provide grave
accents, diaeresis and the additions below. Hold Shift on the following letter
for uppercase composition. Russian Es is identical in both variants.

## Shared Latin additions

- **Option+K**, then A/E/I/O/U → **â ê î ô û**.
- **Option+W**, then A/N/O → **ã ñ õ**.
- **Option+S / Shift+Option+S** → **æ / Æ**.
- **Option+M / Shift+Option+M** → **œ / Œ**.
- **Option+C** → ç; Shift gives Ç.
- **Option+grave**, then a vowel → à è ì ò ù.
- **Option+J**, then a vowel or Y → ä ë ï ö ü ÿ.

Dead Keys retains Option+E/U/N/I/grave for acute/diaeresis/tilde/circumflex/grave.
Its K/W/J bindings are additional aliases. These bindings cover the main letters
of the listed languages; they do not claim every Romance language or every
locale's typography.

## What stays consistent

- US digits and Shift symbols `!@#$%^&*()` in English and Russian.
- Option+comma / Option+period → comma / period in either source.
- Option+9 / Option+0 → ª / º; Option+L → ·, including with Shift.
- Russian Option+Е (physical T) → ё; Shift gives Ё.
- Latin QWERTY Cmd shortcuts and explicit Ctrl+A–Z control codes in Russian.
- Left and right Option behave the same.

## Downloads and contents

- **Mac-Layouts-Direct-v1.0.0.zip** — the Direct bundle, README, key guide,
  macOS setup, test record, release notes and a short typing GIF.
- **Mac-Layouts-DeadKeys-v1.0.0.zip** — the Dead Keys bundle and the same guides.
- **design-macos-keyboard-layouts-v1.0.0.zip** — a reusable LLM skill: interview
  the user, design around their languages/habits, adapt native XML, install and
  verify; includes references and a read-only structure inspector.
- **Mac-Layouts-v1.0.0-SHA256SUMS.txt** — SHA-256 checksums for all three ZIPs.

The repository's source archives additionally contain the editable layouts,
interactive demo, build tools and native verification script. On the demo site,
copy an agent setup prompt for either variant, or a design prompt for your own.

## Install

Unzip **one** variant and copy its bundle into `~/Library/Keyboard Layouts/`.
Log out/in, then add **English Es** and **Russian Es** in Keyboard → Text Input.
Do not install both variants or duplicate a bundle in the system-wide folder.
When updating an earlier installation, back it up **outside** Keyboard Layouts
and move the old bundle out before installing the replacement. Source IDs and
macOS names are preserved. The bundle does not change preferences automatically;
the setup guide covers shortcuts, ABC, duplicate-source diagnosis and the optional
cursor indicator setting, with credit to the original investigations.

## Validation

Both variants passed native UCKeyTranslate checks for the new bindings,
uppercase/Shift/Caps, accent+Space, unsupported-letter fallback, following input
and 17 Portuguese/French/Italian words. Existing Spanish/Catalan mappings and
Russian control/shortcut behavior were checked too. Direct is the final installed
variant on the author's Mac. Structural audits, archive/checksum validation and
browser tests cover XML parsing, composition, Globe switching and agent prompts.

Earlier Spanish/Catalan input was manually accepted on an Apple US keyboard in
Codex. New Portuguese/French/Italian physical-input acceptance is not claimed;
these additions were verified through the system translation API. See the test
record for scope and limits. Test real input in your own apps after installation.
