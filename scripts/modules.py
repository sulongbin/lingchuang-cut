"""List or unpack bundled reference modules without installing software."""
import argparse
import hashlib
import json
from pathlib import Path
import zipfile

ROOT = Path(__file__).resolve().parents[1]


def unpack(module):
    archive = ROOT / module["archive"]
    if hashlib.sha256(archive.read_bytes()).hexdigest() != module["sha256"]:
        raise ValueError("Module checksum mismatch")
    dest = (ROOT / ".runtime" / module["id"]).resolve()
    if dest.exists():
        raise FileExistsError(f"Already exists; read existing module: {dest}")
    with zipfile.ZipFile(archive) as z:
        for entry in z.infolist():
            target = (dest / entry.filename).resolve()
            if not target.is_relative_to(dest):
                raise ValueError("Unsafe archive path")
            if (entry.external_attr >> 16) & 0o170000 == 0o120000:
                raise ValueError("Archive links are not supported")
        z.extractall(dest)
    return dest


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=["list", "unpack"])
    parser.add_argument("module", nargs="?")
    args = parser.parse_args()
    modules = json.loads((ROOT / "modules.json").read_text(encoding="utf-8"))
    if args.action == "list":
        for m in modules:
            print(m["id"])
    else:
        matches = [m for m in modules if m["id"] == args.module]
        if not matches:
            parser.error("Choose a module shown by list")
        print(unpack(matches[0]))


if __name__ == "__main__":
    main()
