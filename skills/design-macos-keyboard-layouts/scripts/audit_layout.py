#!/usr/bin/env python3
"""Read-only keylayout structure audit. No installation or preference changes."""
import argparse
import json
from pathlib import Path
import plistlib
import re
import sys
import xml.etree.ElementTree as ET


def audit(path):
    issues = []
    text = path.read_text(encoding='utf-8')
    if '<!ENTITY' in text:
        raise ValueError('Custom entity declarations are not supported by this inspector')
    def normalize(match):
        number = int(match[1], 16) if match[1] else int(match[2])
        return f'__CONTROL_U{number:04X}__' if number < 32 and number not in (9,10,13) else match[0]
    # Inspection copy only: source bytes and numeric control references are untouched.
    normalized = re.sub(r'&#(?:x([0-9a-fA-F]+)|(\d+));', normalize, text)
    tree = ET.fromstring(normalized)
    if tree.tag != 'keyboard': issues.append('Root element is not keyboard')
    def unique(items, attr, label):
        found = {}
        for item in items:
            value = item.get(attr)
            if value is None: issues.append(f'{label} missing {attr}')
            elif value in found: issues.append(f'Duplicate {label}: {value}')
            else: found[value] = item
        return found
    modifier_maps = unique(tree.findall('modifierMap'), 'id', 'modifierMap')
    mapsets = unique(tree.findall('keyMapSet'), 'id', 'keyMapSet')
    actions = unique(tree.findall('./actions/action'), 'id', 'action')
    maps = {}
    graph = {}
    referenced_actions = set()
    states = {'none'}
    targets = set()
    for action in actions.values():
        seen = set()
        for when in action.findall('when'):
            state = when.get('state')
            if state in seen: issues.append(f'Duplicate action state {action.get("id")}/{state}')
            seen.add(state)
            if state: states.add(state)
            if when.get('next'): targets.add(when.get('next'))
    for set_id, node in mapsets.items():
        indexed = unique(node.findall('keyMap'), 'index', f'keyMap in {set_id}')
        for index, keymap in indexed.items():
            identity = (set_id, index)
            maps[identity] = keymap
            keys = unique(keymap.findall('key'), 'code', f'key in {set_id}/{index}')
            for key in keys.values():
                code = key.get('code')
                if not code.isdigit(): issues.append(f'Non-numeric key code: {code}')
                if ('output' in key.attrib) == ('action' in key.attrib):
                    issues.append(f'Key {identity}/{code} needs exactly one output or action')
                if key.get('action'): referenced_actions.add(key.get('action'))
            if keymap.get('baseMapSet') is not None:
                graph[identity] = (keymap.get('baseMapSet'), keymap.get('baseIndex'))
    for identity, base in graph.items():
        if base not in maps: issues.append(f'Missing base map: {identity} -> {base}')
        seen = {identity}; current = base
        while current in graph:
            if current in seen:
                issues.append(f'Base-map cycle from {identity}'); break
            seen.add(current); current = graph[current]
    for action in referenced_actions - actions.keys(): issues.append(f'Missing action: {action}')
    for state in targets - states: issues.append(f'Dead-key target has no action state: {state}')
    for layout in tree.findall('./layouts/layout'):
        mods = modifier_maps.get(layout.get('modifiers'))
        set_id = layout.get('mapSet')
        if mods is None: issues.append(f'Missing modifierMap: {layout.get("modifiers")}'); continue
        indexes = {mods.get('defaultIndex')}
        indexes.update(sel.get('mapIndex') for sel in mods.findall('keyMapSelect'))
        for index in indexes:
            if (set_id, index) not in maps: issues.append(f'Missing selected map: {set_id}/{index}')
    return {
        'file': str(path), 'name': tree.get('name'), 'numeric_id': tree.get('id'),
        'modifier_maps': {k: [{'index': s.get('mapIndex'), 'matches': [x.get('keys') for x in s.findall('modifier')]} for s in v.findall('keyMapSelect')] for k,v in modifier_maps.items()},
        'map_sets': list(mapsets), 'actions': len(actions), 'dead_key_targets': sorted(targets),
        'issues': issues,
        'scope': 'Structural inspection only; not DTD, compiler, physical-input or application validation.'
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('path', type=Path, help='.keylayout file, bundle, or directory')
    args = parser.parse_args()
    files = [args.path] if args.path.is_file() else sorted(args.path.rglob('*.keylayout'))
    if not files: parser.error('No .keylayout files found')
    result = []; failed = False
    for path in files:
        try:
            item = audit(path); failed |= bool(item['issues']); result.append(item)
        except (OSError, ValueError, ET.ParseError) as error:
            failed = True; result.append({'file': str(path), 'issues': [str(error)]})
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return int(failed)

if __name__ == '__main__': sys.exit(main())
