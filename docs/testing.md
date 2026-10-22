# Test record

## Initial public release — 1.0.0, 22 October 2026

The source names remain English Es / Russian Es and their bundle/source/numeric
IDs remain stable. The Russian XML and original icons are unchanged. New Latin
bindings are Option+K (circumflex), Option+W (tilde), Option+S (æ/Æ) and Option+M
(œ/Œ), in both variants.

## Native system checks

Both variants were installed and registered sequentially. UCKeyTranslate verified:

- The four additions, accented lowercase/uppercase and Shift/Caps ligatures.
- Accent+Space, unsupported following letters and ordinary input after composition.
- 17 Portuguese/French/Italian words, including não, ações, você, cœur, œuvre,
  français, Noël, où, île, città, perché, più and uppercase examples.
- Existing Spanish direct input and classic dead keys, Catalan additions,
  punctuation, ordinals and the middle dot.
- Russian Ctrl+A–Z control codes and the existing Latin Cmd plane.
- Final Direct installation, exactly two enabled sources, no ABC or duplicates.

`swift tools/verify-layout.swift direct` checks the currently installed Direct
variant. Use `dead-keys` when that variant is installed. It does not install or
switch variants. UCKeyTranslate state is an opaque value: follow-up behavior,
rather than a presumed numeric zero, is used to check composition completion.

Structural audits cover all four XML files. ZIP integrity, SHA-256 manifests and
Desktop copies are checked. Browser checks cover XML parsing, dead-key previews,
Globe switching, prompt copying, native input handling and stable desktop/mobile
layout. These do not replace physical typing.

## Earlier manual input evidence

The author tested Spanish/Catalan in Codex on an Apple US keyboard, sequentially
using both variants. Dead Keys produced `éíóúáñüÁÉÍÓÚÜÑ´`; Direct was accepted,
including ï. This evidence applies to those retained mappings. No new physical
input test is claimed for the Portuguese/French/Italian additions.

## Limits

No exhaustive test of every application, ISO/JIS keyboard, macOS version or
accent/punctuation combination was performed. A previous side-specific Option
experiment passed artificial modifier tests but failed physical input; both
variants therefore use the same behavior for left/right Option.

When changing a layout, back up the current installation, test real sequences in
the user's apps and restore the agreed final variant. Record automated and manual
results separately.
