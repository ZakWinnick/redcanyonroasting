#!/usr/bin/env bash
# build.sh — Sync shared nav and footer partials into all HTML pages.
#
# Replaces content between <!-- NAV:START --> / <!-- NAV:END --> and
# <!-- FOOTER:START --> / <!-- FOOTER:END --> with the canonical partials,
# then applies per-page nav-dark class and active link state.
#
# Usage:  ./build.sh
# Safe to re-run — idempotent. Compatible with macOS bash 3.2+.

set -euo pipefail
cd "$(dirname "$0")"

NAV_PARTIAL="partials/nav.html"
FOOTER_PARTIAL="partials/footer.html"

PAGES=(index.html origins.html story.html rangeway.html community.html)

# Pages that need nav-dark class (all except index)
DARK_NAV_PAGES=(origins.html story.html rangeway.html community.html)

# Get the active link href for a given page (empty for index)
active_link_for() {
  case "$1" in
    origins.html)   echo "origins.html" ;;
    story.html)     echo "story.html" ;;
    rangeway.html)  echo "rangeway.html" ;;
    community.html) echo "community.html" ;;
    *)              echo "" ;;
  esac
}

inject_partial() {
  local page="$1"
  local start_marker="$2"
  local end_marker="$3"
  local partial_file="$4"
  local tmp

  tmp=$(mktemp)

  awk -v start="$start_marker" -v end="$end_marker" -v pfile="$partial_file" '
    BEGIN { printing = 1 }
    $0 ~ start {
      print start
      while ((getline line < pfile) > 0) print line
      close(pfile)
      printing = 0
      next
    }
    $0 ~ end {
      print end
      printing = 1
      next
    }
    printing { print }
  ' "$page" > "$tmp"

  mv "$tmp" "$page"
}

for page in "${PAGES[@]}"; do
  echo "Syncing $page..."

  # Inject nav partial
  inject_partial "$page" "<!-- NAV:START -->" "<!-- NAV:END -->" "$NAV_PARTIAL"

  # Inject footer partial
  inject_partial "$page" "<!-- FOOTER:START -->" "<!-- FOOTER:END -->" "$FOOTER_PARTIAL"

  # Add nav-dark class for inner pages
  for dark_page in "${DARK_NAV_PAGES[@]}"; do
    if [[ "$page" == "$dark_page" ]]; then
      sed -i '' 's/<nav id="navbar">/<nav id="navbar" class="nav-dark">/' "$page"
      break
    fi
  done

  # Set active link for the current page
  href=$(active_link_for "$page")
  if [[ -n "$href" ]]; then
    # Only match nav links (inside <li> tags), not footer or mobile menu links
    sed -i '' "s|<li><a href=\"${href}\">|<li><a href=\"${href}\" class=\"active\">|" "$page"
  fi
done

echo "Done. All pages synced."
