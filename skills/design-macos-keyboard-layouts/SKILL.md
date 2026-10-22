---
name: design-macos-keyboard-layouts
description: Design and edit native macOS keyboard layouts around a user's languages, muscle memory and application shortcuts. Use for custom .keylayout/.bundle creation, adaptation, installation and verification.
---

# Design macOS keyboard layouts around the user

Reduce context-dependent decisions while typing. Start from the user's habits,
not a standard mapping or this repository's particular language combination.
Prefer a few learnable, consistent gestures over a feature-dense symbol collection.

## Establish the invariants

Ask only for information that affects the design: physical keyboard (ANSI/ISO/JIS
and key labels), languages/scripts, frequently needed characters, existing gestures
the user wants to keep, and applications that intercept Option or use Ctrl.
Read existing layouts and enabled input sources before proposing changes.

Separate physical keys, input sources, languages and character outputs. One Latin
source can cover several languages; a second script may still require switching.
Agree which symbols should have the same physical gesture in every source.
Preserve ordinary letters and working shortcuts unless the user requests changes.

Read [design choices](references/design.md) when planning the mapping. Use the
[Worked example](references/example-layouts.md) for examples, not defaults.

## Make the change concrete

Use an editable reference .keylayout or bundle with known provenance. An LLM can
make focused XML/plist edits without requiring Ukelele, but Ukelele remains a useful
editor, inspection tool and source of reference layouts. Do not imply that an LLM
removes the need for validation or gives permission to redistribute inherited assets.

Make a before/after mapping table, including Shift/Caps, ordinary punctuation,
Option punctuation and Cmd/Ctrl behavior. Keep symbol invariants synchronized
across every source and variant. Direct and Dead Keys alternatives may share
identities only when users install one at a time; separately enabled alternatives
need distinct identities. Do not promise different left/right Option behavior
from XML selectors alone; see the failure case in the case study.

Read [implementation and testing](references/implementation.md) before editing.
The bundled `scripts/audit_layout.py` is a read-only structural inspector. It does
not compile layouts, emulate physical input or prove application compatibility.
Preserve XML 1.1 control references in source; never serialize the inspector's
normalized parse tree back over a layout.

## Install and prove the result

Back up the exact installed bundle and relevant settings before changing them.
Use one installation directory. Keep working sources available while testing.
Register/reload where supported; log out/in when apps retain old mappings.

Check structure, actual UCKeyTranslate results and real application input as
separate evidence. Test dead-key composition, uppercase, accent+Space, unsupported
following keys and reset to normal typing. Test shared symbols in every source,
plus Cmd/Ctrl in the user's real apps. Typed Unicode strings and clipboard paste
are not keyboard-input tests. If UI automation lacks permission, offer a physical
keyboard checklist; do not claim a GUI pass from synthetic flags.

When temporarily testing another variant, agree the final variant, save the
original and restore it after the test, including on failure. Record what the
user actually confirmed, not every possible feature. An author can release after
local acceptance without claiming all hardware/app combinations are certified.

For ABC, duplicate sources, switching shortcuts, icons or the cursor-side popup,
read [macOS settings](references/macos-settings.md). Treat hidden preferences and
undocumented storage layouts as version-dependent observations. Do not reset all
preferences, disable SIP or add background key monitors as routine installation.

Deliver the bundle, an input guide, reversible installation steps and a test record
that distinguishes API checks from physical input. Apply system changes and publish
only within the user's requested scope. Credit the people whose documented fixes
were used, linking the original posts beside the relevant instructions.
