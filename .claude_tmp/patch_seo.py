import sys, io

def nl(s):
    return s.replace("\n", "\r\n")

def read(path, crlf):
    with open(path, "r", newline="", encoding="utf-8") as f:
        return f.read()

def write(path, content):
    with open(path, "w", newline="", encoding="utf-8") as f:
        f.write(content)

def replace_all_domain(path, crlf, old_domain, new_domain):
    c = read(path, crlf)
    n = c.count(old_domain)
    c2 = c.replace(old_domain, new_domain)
    write(path, c2)
    print(f"OK {path}: replaced {n} occurrences of {old_domain!r}")

# --- 1. Global www -> non-www domain fix across hardcoded metadata files (CRLF files) ---
for path in [
    "app/services/page.tsx",
    "app/services/[slug]/page.tsx",
    "app/locations/page.tsx",
    "app/locations/[slug]/page.tsx",
]:
    replace_all_domain(path, True, "https://www.playacleaning.com", "https://playacleaning.com")

# --- 2. Global www -> non-www domain fix (LF files) ---
for path in ["app/layout.tsx", "app/page.tsx"]:
    replace_all_domain(path, False, "https://www.playacleaning.com", "https://playacleaning.com")

# --- 3. notFound() -> permanentRedirect() for unknown service/location slugs (CRLF files) ---
def patch_crlf(path, replacements):
    c = read(path, True)
    for old, new in replacements:
        oc, nc = nl(old), nl(new)
        n = c.count(oc)
        if n != 1:
            print(f"!!! {path}: expected 1 match, got {n} for: {old[:60]!r}")
            sys.exit(1)
        c = c.replace(oc, nc)
    write(path, c)
    print(f"OK {path} ({len(replacements)} replacements)")

patch_crlf("app/services/[slug]/page.tsx", [
    (
        'import { notFound } from "next/navigation"',
        'import { notFound, permanentRedirect } from "next/navigation"',
    ),
    (
        "  if (!service) notFound()",
        "  if (!service) permanentRedirect(\"/services\")",
    ),
])

patch_crlf("app/locations/[slug]/page.tsx", [
    (
        'import { notFound } from "next/navigation"',
        'import { notFound, permanentRedirect } from "next/navigation"',
    ),
    (
        "  if (!location) notFound()",
        "  if (!location) permanentRedirect(\"/locations\")",
    ),
])

print("All patches applied.")
