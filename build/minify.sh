#!/bin/sh
# Minify CSS + JS for production. Source files stay readable; .min files are what pages load.
# Run after editing styles.css or script.js, then bump the ?v= version and deploy.
set -e
cd "$(dirname "$0")/.."
npx --yes esbuild@0.23.0 styles.css --minify --outfile=styles.min.css
npx --yes esbuild@0.23.0 script.js  --minify --outfile=script.min.js
echo "minified: styles.min.css + script.min.js"
