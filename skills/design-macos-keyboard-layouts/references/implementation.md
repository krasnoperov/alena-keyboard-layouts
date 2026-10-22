# Native layout implementation and evidence

## Bundle mechanics

Apple's [TN2056](https://developer.apple.com/library/archive/technotes/tn2056/_index.html)
is an archived specification, useful for XML structure rather than a guarantee
about modern app behavior. `.keylayout` defines physical key codes, modifier-map
selection, map sets, inherited maps, actions and dead-key states/terminators.
`.bundle/Contents/Info.plist` supplies identity and per-layout metadata; Resources
contains .keylayout, matching icons and optional localized names.

Before editing, trace the selected modifier map, mapIndex and mapSet for the
actual keyboard type. A second map set can inherit the first and override specific
physical positions; updating one visible map may not update all keyboard types.

Keep key codes numeric and distinguish outputs from action IDs. An output such
as `é` is immediate. A key action with `when state="none" next="acute"` begins
composition; actions on following letters produce the combined output. Define
terminators, accent+Space behavior, unsupported letters and post-composition reset.
Avoid accidentally outputting combining sequences when a precomposed character
is expected; inspect Unicode scalars, not just appearance.

XML 1.1 files can contain numeric control-character references that XML 1.0
parsers reject. A normalized copy can be used for inspection, but do not replace
the source references with escaped prose or strip the terminal control codes.

## Identity

Retain identities when replacing one mutually exclusive variant. Preserve the
bundle's layout language and ASCII capability where appropriate. Different
simultaneously installed sources need distinct numeric/source identities.

Our source IDs were aligned to `<bundle-id>.keylayout.<NameWithoutSpaces>` after
finding the [Colemak declared/derived-ID fix](https://github.com/ColemakMods/mod-dh/pull/109).
That addresses a documented duplicate-registration cause; it is not a universal
cure for every input-source recovery issue. Old registration caches can survive
live changes. Don't fix an identity issue by repeatedly inventing IDs.

## Cmd and Ctrl are separate layers

For a Cyrillic text source, a Cmd-selected map can expose Latin QWERTY letters
without changing ordinary typing. Terminal Ctrl+A–Z may require explicit ASCII
control outputs U+0001–U+001A on physical US letter keys. Ctrl+[ is Escape,
Ctrl+backslash U+001C, Ctrl+] U+001D; other punctuation bindings should match the
user's terminal expectations. Do not infer Ctrl works because Cmd+C works.
Extra Option/Shift/Command combinations can be intercepted by an app; test the
combinations the user needs instead of claiming every shortcut is universal.

Terminal Option-as-Meta may prevent layout accents from reaching input processing.
[Apple documents that setting](https://support.apple.com/guide/terminal/trmlkbrd/mac).
Decide with the user which gestures should be character input and which Meta
commands; Esc then B/F can provide word movement without consuming Option.

## Three different test levels

1. **Structure:** unique map/key/action IDs, valid references and base maps,
   dead-key targets, XML/plist readability, matching bundle/resource names.
2. **System translation:** register the installed test bundle where authorized,
   enumerate source IDs and call UCKeyTranslate for actual outputs. Use SDK
   constants, test Shift/Caps and keyboard types, and inspect dead-key state over
   a complete sequence. This proves table behavior under the supplied flags.
3. **Real input:** restart a test app or log out/in, physically type the sequences
   or send genuine key-code events through an authorized UI tool, and inspect
   the resulting text. Also test the app where the user observed a failure.

Never label Unicode paste or artificial UCKeyTranslate modifier flags a physical
keyboard test. Record app/OS, input method and observed strings. Test normal text
following accents, punctuation in every source, uppercase, Cmd and terminal Ctrl.
If the test cannot be performed, state the missing evidence. Release status should
reflect the author's acceptance and actual evidence, not an invented certification.
