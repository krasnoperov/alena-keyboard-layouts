# References and acknowledgments

| Topic | Original source | How it informed this project |
|---|---|---|
| Native XML layouts, bundle installation | [Apple TN2056: Installable Keyboard Layouts](https://developer.apple.com/library/archive/technotes/tn2056/_index.html) | File structure and installation folders; archived documentation |
| Layout editing and dead keys | [SIL Ukelele](https://software.sil.org/ukelele/) | Editor, reference material and existing layout provenance |
| Input-source identity mismatch | [Colemak PR #109](https://github.com/ColemakMods/mod-dh/pull/109) | Align declared IDs with derived IDs; not a universal duplicate fix |
| Left/right modifier limitations | [John Brownie in Ukelele Users](https://groups.google.com/g/ukelele-users/c/kNPut93Fx5I) | Explained why XML-side separation should not be assumed to work |
| Switching delay and cursor-side popup | **[Chimit, Undocumented Docs](https://chimit.me/posts/macos-input-source-switch-lag/)** | Documented the long investigation and hidden indicator preference used in our setup |
| Terminal Option behavior | [Apple Terminal keyboard settings](https://support.apple.com/guide/terminal/trmlkbrd/mac) | Option-as-Meta can intercept character input |
| Terminal movement | [GNU Readline movement commands](https://www.gnu.org/software/bash/manual/html_node/Readline-Movement-Commands.html) | Ctrl+A/E and character/word movement in Emacs-style bindings |
| Catalan characters | [CPNL alphabet](https://www.cpnl.cat/gramatica/41/1-l-alfabet), [accentuation](https://www.cpnl.cat/gramatica/35/17-l-accentuacio-grafica/nivell/intermedi-1) | ç, l·l and accent repertoire |
| Spanish ordinal indicators | [RAE abbreviation formation](https://www.rae.es/ortograf%C3%ADa/formaci%C3%B3n) | º/ª versus the degree sign and the abbreviation dot |

We link the original findings rather than presenting them as discoveries of this
repository. In particular, thanks to Chimit for publishing the switching-delay
work after years of searching, and to Ukelele's maintainers and community for
explaining the native format and its practical limitations.

The preference-list duplicate fix, icon experiments and physical Codex test results
are local observations. Hidden preferences and application behavior can change;
see the explicit evidence and limitations in [testing.md](testing.md).

Letter-set references: Unicode CLDR [Portuguese](https://github.com/unicode-org/cldr/blob/main/common/main/pt.xml), [French](https://github.com/unicode-org/cldr/blob/main/common/main/fr.xml) and [Italian](https://github.com/unicode-org/cldr/blob/main/common/main/it.xml). These inform character coverage; native translation and physical input are separate validation steps.
