const fs = require('fs');
const path = 'src/index.css';
let css = fs.readFileSync(path, 'utf8');

css = css.replace(/duration-300/g, 'duration-200 ease-out');
css = css.replace(/transform:\s*translateY\(-2px\);/g, 'transform: translateY(-1px);');
css = css.replace(/transition:\s*all\s*0\.5s\s*cubic-bezier\([^)]+\);/g, 'transition: all 0.2s ease-out;');
css = css.replace(/transform:\s*translateY\(-4px\)\s*scale\(1\.005\);/g, 'transform: scale(1.02);');

fs.writeFileSync(path, css);
console.log('done');
