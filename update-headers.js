const fs = require('fs');

function updatePageHeader(filePath, bgUrl, colorClass) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Try to find the solid bg wrapper
  content = content.replace(
    /<div className="bg-[a-z]+-[0-9]+ text-white py-12 px-4">/,
    `<div className="relative text-white py-20 px-4">
        <div className="absolute inset-0 z-0">
          <Image src="` + bgUrl + `" alt="Background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-` + colorClass + `-900/70 mix-blend-multiply"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">`
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

updatePageHeader('src/app/alugar/page.tsx', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop', 'blue');
updatePageHeader('src/app/comprar/page.tsx', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop', 'blue');
updatePageHeader('src/app/contato/page.tsx', 'https://images.unsplash.com/photo-1516328314061-1baa85cb79c5?q=80&w=1600&auto=format&fit=crop', 'blue');
updatePageHeader('src/app/guias/page.tsx', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop', 'blue');
updatePageHeader('src/app/trabalhe-conosco/page.tsx', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop', 'blue');

console.log("Headers updated!");
