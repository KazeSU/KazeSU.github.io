#!/usr/bin/env python3
"""Add or refresh a device entry in docs/repos.json from an issue form.

GitHub issue forms render as a sequence of "### Heading" sections, so this
parser keys off the headings instead of blank-line positions. That keeps
working when a maintainer puts blank lines, multiple devices or extra prose in
a field.

Reads the issue body from $ISSUE_CONTENT and writes these GitHub Actions
outputs when $GITHUB_OUTPUT is set:

    success  "true" or "false"
    changed  "true" when the JSON actually needs a new commit
    repo     "owner/repo"
    device   the normalised device list
    error    a human-readable reason on failure

Usage: add_device_handler.py docs/repos.json
"""

import json
import os
import re
import sys

HEADING_RE = re.compile(r"^###\s+(.+?)\s*$", re.MULTILINE)
OWNER_REPO_RE = re.compile(r"[A-Za-z0-9_.-]+")


def write_output(key, value):
    path = os.environ.get("GITHUB_OUTPUT")
    if not path:
        return
    # Heredoc form: safe for values containing quotes, newlines or backticks.
    delimiter = "EOF_" + key.upper()
    with open(path, "a", encoding="utf-8") as fh:
        fh.write(f"{key}<<{delimiter}\n{value}\n{delimiter}\n")


def split_sections(body):
    matches = list(HEADING_RE.finditer(body))
    sections = {}
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(body)
        sections[match.group(1).strip().lower()] = body[match.end():end].strip()
    return sections


def lookup(sections, *names):
    for name in names:
        if name in sections:
            return sections[name]
    return ""


def parse_repository(url):
    url = url.strip().strip("<>").rstrip("/")
    url = re.split(r"[?#]", url, maxsplit=1)[0]
    if url.lower().endswith(".git"):
        url = url[:-4]
    url = re.sub(r"^(?:https?://)?(?:www\.)?", "", url, flags=re.IGNORECASE)

    parts = url.split("/")
    if len(parts) < 3 or parts[0].lower() != "github.com":
        raise ValueError(
            "Repository URL must look like https://github.com/<owner>/<repo>."
        )

    owner, repo = parts[1], parts[2]
    if not OWNER_REPO_RE.fullmatch(owner) or not OWNER_REPO_RE.fullmatch(repo):
        raise ValueError(f"'{owner}/{repo}' is not a valid GitHub repository.")
    return owner, repo


def load_entries(path):
    if not os.path.exists(path):
        return []
    with open(path, "r", encoding="utf-8") as fh:
        raw = fh.read().strip()
    if not raw:
        return []
    data = json.loads(raw)
    if not isinstance(data, list):
        raise ValueError(f"{path} must contain a JSON array.")
    return data


def main():
    if len(sys.argv) != 2:
        raise SystemExit(f"usage: {sys.argv[0]} <repos.json>")

    path = sys.argv[1]
    body = os.environ.get("ISSUE_CONTENT", "")

    try:
        sections = split_sections(body)
        url = lookup(sections, "repository url", "repo url", "repository")
        devices = lookup(sections, "supported devices", "devices", "device")
        conduct = lookup(sections, "code of conduct", "terms")

        if not url:
            raise ValueError(
                "No 'Repository URL' section found. Please use the Add Device form."
            )
        if not devices:
            raise ValueError(
                "No 'Supported devices' section found. Please use the Add Device form."
            )
        if "[x]" not in conduct.lower():
            raise ValueError(
                "Please confirm that you are the maintainer of the repository."
            )

        owner, repo = parse_repository(url)
        device_text = " ".join(devices.split())

        entry = {
            "maintainer": owner,
            "maintainer_link": f"https://github.com/{owner}",
            "kernel_name": repo,
            "kernel_link": f"https://github.com/{owner}/{repo}",
            "devices": device_text,
        }

        data = load_entries(path)
        changed = False

        for item in data:
            link = str(item.get("kernel_link", "")).rstrip("/").lower()
            if link == entry["kernel_link"].lower():
                if any(item.get(key) != value for key, value in entry.items()):
                    item.update(entry)
                    changed = True
                    print(f"updated {owner}/{repo}")
                else:
                    print(f"{owner}/{repo} is already listed unchanged")
                break
        else:
            data.append(entry)
            changed = True
            print(f"added {owner}/{repo}")

        if changed:
            with open(path, "w", encoding="utf-8") as fh:
                json.dump(data, fh, indent=2, ensure_ascii=False)
                fh.write("\n")

        write_output("success", "true")
        write_output("changed", "true" if changed else "false")
        write_output("repo", f"{owner}/{repo}")
        write_output("device", device_text)
    except Exception as exc:  # noqa: BLE001 - report every failure to the issue
        write_output("success", "false")
        write_output("changed", "false")
        write_output("error", str(exc))
        print(f"error: {exc}", file=sys.stderr)
        raise SystemExit(1) from exc


if __name__ == "__main__":
    main()
