import { writeFileSync } from 'fs';
import { join } from 'path';

import { modules } from '../content/modules';

const out = join(__dirname, '..', 'content', 'content.json');
writeFileSync(out, JSON.stringify({ modules, exportedAt: new Date().toISOString() }, null, 2));
console.log('Wrote', out);
