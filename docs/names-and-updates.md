# Names and updates

| Surface | Name |
|---|---|
| Site | Multilingual Mac Keyboard Layouts |
| Immediate Spanish accents plus supplementary dead keys | Direct input |
| Classic accent composition plus the shared additions | Dead keys |
| ZIP files | Mac-Layouts-Direct-v1.0.0.zip / Mac-Layouts-DeadKeys-v1.0.0.zip |
| Bundle folders | Mac-Layouts-Direct.bundle / Mac-Layouts-DeadKeys.bundle |
| macOS menu, both variants | English Es / Russian Es |
| Desktop guide | Mac-Layouts-Setup.md |

English, Spanish, Catalan, Portuguese, French and Italian share the Latin source.
Russian uses the Cyrillic source. The Russian layout is identical in both variants.

## Stable native identities

- Bundle: `org.sil.ukelele.keyboardlayout.alenakeyboard`
- English: `org.sil.ukelele.keyboardlayout.alenakeyboard.keylayout.EnglishEs`
- Russian: `org.sil.ukelele.keyboardlayout.alenakeyboard.keylayout.RussianEs`
- Numeric keyboard IDs: English -30031; Russian -30020.

Internal and macOS display names remain English Es / Russian Es. Stable technical
IDs retain their historical spelling; they are not branding. User-specific display
name changes are separate customization and need care with generated identities.

## Updating an earlier installation

Install only one variant. Move any older bundle out of both Keyboard Layouts
folders before copying the replacement. Earlier bundles may be named
`AlenaEspanol.bundle`, `Alena-Direct.bundle` or `Alena-DeadKeys.bundle`.
Keep backups elsewhere. Preserve enabled-source settings and inspect registration
before adding sources again. Log out/in if an app retains an old bundle reference.
