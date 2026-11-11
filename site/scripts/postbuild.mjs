// Keeps the old /privacy.html URL serving the policy with a 200, because
// published Play Store listings link to it.
import { copyFileSync } from 'node:fs';
copyFileSync('dist/privacy/index.html', 'dist/privacy.html');
console.log('postbuild: dist/privacy.html written');
