const fs = require('fs');
const path = require('path');

function fixImports(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      fixImports(fullPath);
    } else if (fullPath.endsWith('page.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('<Image') && !content.includes('import Image')) {
        content = 'import Image from "next/image";\n' + content;
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  });
}

fixImports('src/app');
console.log('Fixed imports');
