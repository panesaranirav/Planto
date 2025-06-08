import { readFileSync, writeFileSync } from 'fs';

const data = JSON.parse(readFileSync('db.json', 'utf-8'));
const popular = {};

const merged = { ...data, ...popular };

writeFileSync('db.json', JSON.stringify(merged, null, 2));

console.log('✅ Merged successfully into db.json');
