"""List or unpack bundled, credential-free open templates. No network calls."""
import argparse
import hashlib
import json
from pathlib import Path
import stat
import zipfile

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=['list', 'unpack'])
    parser.add_argument('template', nargs='?')
    args = parser.parse_args()
    catalog = json.loads((ROOT / 'templates.json').read_text(encoding='utf-8'))
    if args.command == 'list':
        print(json.dumps(catalog, ensure_ascii=False, indent=2))
        return
    item = next((x for x in catalog if x['id'] == args.template), None)
    if item is None:
        parser.error('Unknown template ID')
    archive = ROOT / item['file']
    if hashlib.sha256(archive.read_bytes()).hexdigest() != item['sha256']:
        raise ValueError('Archive checksum mismatch')
    target = ROOT / '.runtime' / (item['id'] + '-' + item['version'])
    if target.exists():
        raise FileExistsError(f'Preserving existing directory: {target}')
    base = target.resolve()
    with zipfile.ZipFile(archive) as bundle:
        seen = set()
        for entry in bundle.infolist():
            name = entry.filename.replace('\\', '/')
            resolved = (base / name).resolve()
            if not resolved.is_relative_to(base) or name.casefold() in seen:
                raise ValueError('Unsafe or duplicate archive path')
            if name.startswith('personal/') or stat.S_ISLNK(entry.external_attr >> 16):
                raise ValueError('Credentials or symbolic link not allowed')
            seen.add(name.casefold())
        if bundle.testzip() is not None:
            raise ValueError('Corrupt ZIP')
        target.mkdir(parents=True)
        bundle.extractall(target)
    print(target)


if __name__ == '__main__':
    main()
