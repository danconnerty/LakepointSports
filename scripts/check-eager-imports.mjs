/**
 * Prevents the 30s-mobile-load regression from coming back.
 *
 * App.tsx is the first thing on screen. The user lands on the LandingPage,
 * so the only post-landing component that should be statically (eagerly)
 * imported there is LandingPage itself. Everything else must be `lazy()`'d
 * - otherwise it ships with the first paint, which is exactly what made the
 * original load take 30 seconds on mobile.
 *
 * This script fails the build if anything in App.tsx is statically imported
 * from `./components/...` other than LandingPage. Run it via `npm run check`.
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(resolve(root, 'App.tsx'), 'utf8');

const allowed = new Set(['LandingPage']);
const offenders = [];

// Match: import Foo from './components/Foo'
//        import { Foo } from './components/Foo'
const eager = /import\s+(?:[\w*\s{},]+)\s+from\s+['"]\.\/components\/([\w-]+)['"]/g;
let m;
while ((m = eager.exec(src)) !== null) {
  if (!allowed.has(m[1])) offenders.push(m[1]);
}

if (offenders.length) {
  console.error('\nFAIL: App.tsx is eagerly importing components that should be lazy:\n');
  offenders.forEach(o => console.error('  - ' + o));
  console.error('\nWrap them with React.lazy() so they don\'t ship on first paint:\n');
  console.error('  const ' + offenders[0] + ' = lazy(() => import(\'./components/' + offenders[0] + '\'));');
  console.error('\nSee App.tsx for the existing pattern.\n');
  process.exit(1);
}

console.log('ok: App.tsx eager imports are minimal');
