#!/usr/bin/env python3
"""Stage the static viewer with byte-identical copies of native layout sources."""
import argparse
from pathlib import Path
import shutil
ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', type=Path, default=ROOT/'dist/demo')
args = parser.parse_args()
out = args.output.resolve()
if out == ROOT or out == ROOT/'demo':
    parser.error('Output must be a separate staging directory.')
out.mkdir(parents=True, exist_ok=True)
for name in ('index.html','styles.css','viewer.js','layout-parser.js','typing-story.html'):
    shutil.copy2(ROOT/'demo'/name,out/name)
for name in ('media','typing-demo'):
    if (ROOT/'demo'/name).exists():shutil.copytree(ROOT/'demo'/name,out/name,dirs_exist_ok=True)
for variant in ('direct','dead-keys'):
    target=out/'layouts'/variant
    target.mkdir(parents=True,exist_ok=True)
    for language in ('English','Russian'):
        bundle='Mac-Layouts-Direct.bundle' if variant=='direct' else 'Mac-Layouts-DeadKeys.bundle'
        source=ROOT/'layouts'/variant/bundle/'Contents/Resources'/f'{language} Es.keylayout'
        shutil.copy2(source,target/source.name)
print(f'Staged viewer and four unmodified .keylayout files in {out}')
