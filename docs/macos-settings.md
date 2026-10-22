# Optional macOS settings

Copying the bundle does not change these settings automatically.

## Switching

In System Settings → Keyboard → Keyboard Shortcuts → Input Sources, assign
Cmd+Space to the previous input source, and Cmd+Option+Space to the next one.
In Spotlight, release the conflicting Cmd+Space binding; the author's setup
uses Ctrl+Space for Spotlight and Ctrl+Option+Space for Finder search.
Set “Press Globe/Fn key to” to “Change Input Source”.

## Hide the cursor-side language indicator

The author keeps only the menu-bar icon. Credit to **Chimit at Undocumented Docs**
for [How I finally fixed the keyboard language switching delay on macOS](https://chimit.me/posts/macos-input-source-switch-lag/),
which documents the investigation behind this hidden preference. We used that
finding in this setup:

```sh
defaults write kCFPreferencesAnyApplication TSMLanguageIndicatorEnabled -int 0
```

Log out/in to apply across applications. To restore the default:

```sh
defaults delete kCFPreferencesAnyApplication TSMLanguageIndicatorEnabled
```

This is undocumented and may change between macOS versions. It helped in the
author's setup; it does not guarantee instantaneous Globe switching on every Mac.
No SIP changes or background switcher are required.

## ABC and duplicate entries

Try removing ABC through Settings first. On the author's Mac, third-party
sources are enabled in `com.apple.inputsources` under
`AppleEnabledThirdPartyInputSources`. Built-in sources are listed in
`com.apple.HIToolbox` under `AppleEnabledInputSources`.

Manually adding the same custom layouts to BOTH lists produced duplicates.
The fix was to retain them in inputsources and remove the redundant custom
entries from HIToolbox. ABC was removed from HIToolbox too; CharacterPaletteIM
(the character palette) was retained.

This is a diagnostic description, not a universal preference-reset script.
Before editing, export both domains with `defaults export`. Confirm the wanted
sources are enabled, then remove only the specific redundant entries. Do not
wipe entire domains or import someone else's settings.

Layout IDs: English Es -30031; Russian Es -30020. Bundle ID:
`org.sil.ukelele.keyboardlayout.alenakeyboard`. Declared source IDs match the
macOS-derived `.keylayout.EnglishEs` / `.keylayout.RussianEs` form.

The original menu icons and `TISIconIsTemplate=true` are retained. Attempts to
restyle the cursor-side icon were abandoned; disabling that popup is optional.

## Sources and scope

- Native installation folders and logout/login: [Apple TN2056](https://developer.apple.com/library/archive/technotes/tn2056/_index.html) (archived) and [SIL Ukelele](https://software.sil.org/ukelele/).
- Declared/derived source ID mismatch: [Colemak fix and discussion](https://github.com/ColemakMods/mod-dh/pull/109).
- Left/right modifiers in layout processing: [John Brownie, Ukelele Users](https://groups.google.com/g/ukelele-users/c/kNPut93Fx5I).
- Option-as-Meta: [Apple Terminal settings](https://support.apple.com/guide/terminal/trmlkbrd/mac).
- The two enabled-source preference lists and the duplicate fix above are observations from our Mac, not a published Apple schema.

## Updating an earlier installation

Use `Mac-Layouts-Direct.bundle` or `Mac-Layouts-DeadKeys.bundle`, one installed copy.
Move any previous variant out of both Keyboard Layouts folders; keep backups
elsewhere. Source names remain English Es / Russian Es and their IDs are preserved.
Inspect the enabled list before adding sources again. See [names and updates](names-and-updates.md).
