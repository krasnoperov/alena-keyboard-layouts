#!/usr/bin/env python3
"""Build layout and skill ZIPs; never install or change user preferences."""
from pathlib import Path
import hashlib
import runpy
import sys
import zipfile

root = Path(__file__).resolve().parents[1]
version = sys.argv[1] if len(sys.argv) > 1 else 'v1.0.0'
out = root / 'dist'
out.mkdir(exist_ok=True)
skill = root / 'skills/design-macos-keyboard-layouts'
audit = runpy.run_path(str(skill / 'scripts/audit_layout.py'))['audit']
archives = []
for variant in ('direct', 'dead-keys'):
    base = root / 'layouts' / variant
    for source in base.rglob('*.keylayout'):
        report = audit(source)
        assert not report['issues'], report
    target = out / f'Mac-Layouts-{"Direct" if variant == "direct" else "DeadKeys"}-{version}.zip'
    with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as z:
        for path in sorted(base.rglob('*')):
            if path.is_file() and path.name != '.DS_Store':
                z.write(path, path.relative_to(base))
        z.write(root / 'README.md', 'README.md')
        for path in sorted((root / 'assets').glob('*')):
            if path.is_file(): z.write(path, path.relative_to(root))
        for path in sorted((root / 'docs').glob('*.md')):
            z.write(path, path.relative_to(root))
    archives.append(target)
target = out / f'design-macos-keyboard-layouts-{version}.zip'
with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as z:
    for path in sorted(skill.rglob('*')):
        if path.is_file() and '__pycache__' not in path.parts and path.suffix != '.pyc' and path.name != '.DS_Store':
            z.write(path, Path(skill.name) / path.relative_to(skill))
archives.append(target)
for path in archives:
    with zipfile.ZipFile(path) as z:
        assert z.testzip() is None, path
manifest = out / f'Mac-Layouts-{version}-SHA256SUMS.txt'
manifest.write_text(''.join(hashlib.sha256(p.read_bytes()).hexdigest() + '  ' + p.name + '\n' for p in archives))
for path in (*archives, manifest):
    print(path)
