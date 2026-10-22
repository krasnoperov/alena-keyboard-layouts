# macOS installation, source state and optional settings

## Install one copy

Apple's [installation note](https://developer.apple.com/library/archive/technotes/tn2056/_index.html)
and [SIL Ukelele](https://software.sil.org/ukelele/) describe the native layout
folders. `~/Library/Keyboard Layouts` is user-only; `/Library/Keyboard Layouts`
is shared. Choose one, back up existing content and avoid a second installed copy.
Add sources in Keyboard settings after logout/login. Replacing an alternative
bundle does not mean enabling all alternative variants at once.

TISRegisterInputSource can refresh registration for a bundle in an installation
folder. A success code is not proof that every running app dropped its cache.
Restart the affected app or log out/in and check actual input. Don't log the user
out, restart unrelated apps or discard unsaved documents without authorization.

## ABC and duplicate registrations

Try the Settings UI first. Before preference edits, export only the relevant
input-source domains and inspect the current machine. Keep a working Latin source
while diagnosing. ASCII capability alone doesn't explain every disabled Remove button.

On the Alena test Mac, custom enabled sources were in
`com.apple.inputsources:AppleEnabledThirdPartyInputSources`; the built-in list
was `com.apple.HIToolbox:AppleEnabledInputSources`. Adding the custom layouts to
both lists created two picker entries per layout despite one bundle on disk.
Removing the redundant HIToolbox entries, while retaining the custom-source list,
removed duplicates. ABC was removed from the built-in enabled list. The character
palette entry was retained. This is a local observed fix, not a documented Apple
schema valid for all versions. Other duplicates may be physical copies, ID
mismatches or stale caches. Diagnose before editing.

Don't wipe HIToolbox, import another Mac's entire preferences, disable SIP or
lock preference files as a routine fix. Don't claim a `noErr` return from
TISDisableInputSource proves a source disappeared: enumerate again and inspect
its persisted and visible state.

## Switching and conflicting shortcuts

Use the user's preferred modifier, not this example by default. In our setup,
Cmd+Space selects the previous source; Cmd+Option+Space selects the next.
Spotlight was moved to Ctrl+Space to release the collision. Globe/Fn was set to
Change Input Source. Hidden numeric symbolic-hotkey IDs need current verification;
prefer Settings UI when it is available and preserve unrelated bindings.

## Cursor-side language popup and delay

Credit: **Chimit, Undocumented Docs**, [How I finally fixed the keyboard language
switching delay on macOS](https://chimit.me/posts/macos-input-source-switch-lag/).
The author describes years of intermittent investigation and a hidden preference
that improved their switching behavior. Our user also reported satisfactory
behavior after disabling the cursor-side indicator:

```sh
defaults write kCFPreferencesAnyApplication TSMLanguageIndicatorEnabled -int 0
```

Log out/in for all apps to pick it up. Preserve an existing value before changing
it. If previously absent, return to the default with:

```sh
defaults delete kCFPreferencesAnyApplication TSMLanguageIndicatorEnabled
```

This is undocumented and version-dependent. It hides the cursor-side indicator,
not the menu-bar icon. Don't promise zero latency or no Globe overlay on every
system, or repeat unverified Siri/Quick Note tweaks as requirements.

## Icons and modifier sides

Use matching .icns assets; `TISIconIsTemplate=true` makes an alpha-mask/template
icon, while false requests the supplied colors. Menu rendering and cursor-popup
rendering can differ. We restored original icons after unsuccessful styling
attempts; do not claim that a correctly loaded IconRef proves the popup is fixed.

Ukelele's author explains [limitations of left/right modifiers in layout processing](https://groups.google.com/g/ukelele-users/c/kNPut93Fx5I).
Our side-specific Option maps passed synthetic translation but failed physical
input in Codex. That is evidence against shipping that design for this setup,
not a claim that no API anywhere can distinguish physical modifier keys.
Separate variants or a different chord avoid a background remapper. A remapper
is a distinct user choice with additional software and permissions, not a silent
layout-installation dependency.
