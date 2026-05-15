/**
 * Generates index.html with Tailwind CSS inlined and an importmap that uses
 * esm.sh's ?bundle mode. Inlining keeps the AI Studio preview from depending
 * on tailwind.css being served as a separate asset, and ?bundle collapses the
 * deep esm.sh module tree into one fetch per package - the difference between
 * ~30s and ~3s to first paint on mobile.
 *
 * Run via `npm run build:html` whenever you change Tailwind classes (which
 * regenerates tailwind.css via `npm run css` first).
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(resolve(root, 'tailwind.css'), 'utf8');

const REACT = '19.2.3';
const REACT_DOM = '19.2.3';
const LUCIDE = '0.562.0';
const GENAI = '1.34.0';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>NTangible &times; LakePoint Sports &mdash; Integration Proposal</title>
    <link rel="icon" type="image/png" href="/LakePoint.png">

    <link rel="preconnect" href="https://esm.sh" crossorigin>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link rel="modulepreload" href="https://esm.sh/react@${REACT}?bundle">
    <link rel="modulepreload" href="https://esm.sh/react-dom@${REACT_DOM}/client?bundle&deps=react@${REACT}">
    <link rel="modulepreload" href="https://esm.sh/lucide-react@${LUCIDE}?bundle&deps=react@${REACT}">

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet">

    <style>
${css}

html, body, #root { background-color: #050505; margin: 0; min-height: 100vh; }
body { font-family: 'Inter', sans-serif; color: #f8fafc; -webkit-text-size-adjust: 100%; }
    </style>

<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@${REACT}?bundle",
    "react/jsx-runtime": "https://esm.sh/react@${REACT}/jsx-runtime?bundle",
    "react/jsx-dev-runtime": "https://esm.sh/react@${REACT}/jsx-dev-runtime?bundle",
    "react-dom": "https://esm.sh/react-dom@${REACT_DOM}?bundle&deps=react@${REACT}",
    "react-dom/client": "https://esm.sh/react-dom@${REACT_DOM}/client?bundle&deps=react@${REACT}",
    "lucide-react": "https://esm.sh/lucide-react@${LUCIDE}?bundle&deps=react@${REACT}",
    "@google/genai": "https://esm.sh/@google/genai@${GENAI}?bundle"
  }
}
</script>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="./index.tsx"></script>
</body>
</html>
`;

writeFileSync(resolve(root, 'index.html'), html);
console.log(`wrote index.html (${html.length} bytes, css inlined: ${css.length} bytes)`);
