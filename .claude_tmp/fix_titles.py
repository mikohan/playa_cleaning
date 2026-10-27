import sys

def nl(s):
    return s.replace("\n", "\r\n")

def patch(path, replacements, crlf=True):
    with open(path, "r", newline="", encoding="utf-8") as f:
        c = f.read()
    for old, new in replacements:
        oc = nl(old) if crlf else old
        nc = nl(new) if crlf else new
        n = c.count(oc)
        if n != 1:
            print(f"!!! {path}: expected 1 match, got {n} for: {old[:70]!r}")
            sys.exit(1)
        c = c.replace(oc, nc)
    with open(path, "w", newline="", encoding="utf-8") as f:
        f.write(c)
    print(f"OK {path} ({len(replacements)} replacements)")

# homepage (LF)
patch("app/page.tsx", [
    (
        '  title:\n    "Premium Maid Services & Residential Cleaning Los Angeles | Playa Cleaning",',
        '  title: "Premium Maid Services & Residential Cleaning Los Angeles",',
    ),
], crlf=False)

# about (mine, CRLF)
patch("app/about/page.tsx", [
    (
        '  title: "About Playa Cleaning | Meet Alicia, Our Founder",',
        '  title: "About Us | Meet Alicia, Our Founder",',
    ),
])

# terms (mine, CRLF)
patch("app/terms/page.tsx", [
    (
        '  title: "Terms of Service | Playa Cleaning",',
        '  title: "Terms of Service",',
    ),
])

# cleaning-calculator (CRLF)
patch("app/cleaning-calculator/page.tsx", [
    (
        '  title: "Instant Cleaning Quote | Playa Cleaning Los Angeles",',
        '  title: "Instant Cleaning Quote | Los Angeles",',
    ),
])

# locations index (CRLF)
patch("app/locations/page.tsx", [
    (
        '  title:\n    "Service Areas | Professional Cleaning Across Los Angeles | Playa Cleaning",',
        '  title: "Service Areas | Professional Cleaning Across Los Angeles",',
    ),
])

# offers index (CRLF)
patch("app/offers/page.tsx", [
    (
        '  title: "Professional House Cleaning Los Angeles | Playa Cleaning",',
        '  title: "Professional House Cleaning Los Angeles",',
    ),
])

# pricing (CRLF)
patch("app/pricing/page.tsx", [
    (
        '  title: "Flat-Rate House Cleaning Pricing Los Angeles | Playa Cleaning",',
        '  title: "Flat-Rate House Cleaning Pricing Los Angeles",',
    ),
])

# privacy-policy (CRLF)
patch("app/privacy-policy/page.tsx", [
    (
        '  title: "Privacy Policy | Playa Cleaning Los Angeles",',
        '  title: "Privacy Policy | Los Angeles",',
    ),
])

# services index (CRLF)
patch("app/services/page.tsx", [
    (
        '  title: "Professional Cleaning Services in Los Angeles | Playa Cleaning",',
        '  title: "Professional Cleaning Services in Los Angeles",',
    ),
])

print("All title fixes applied.")
