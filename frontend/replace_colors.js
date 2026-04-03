const fs = require('fs');
const path = require('path');

function replaceColorsInDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  const colorMap = {
    '[#1890FF]': 'bs-primary',
    '[#F0F2F5]': 'bs-bg',
    '[#FFFFFF]': 'bs-white',
    '[#112032]': 'bs-dark',
    '[#232E42]': 'bs-dark2',
    '[#2D3748]': 'bs-text',
    '[#666666]': 'bs-muted',
    '[#666]': 'bs-muted',
    '[#0ACF83]': 'bs-green',
    '[#E8E8E8]': 'bs-border'
  };

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceColorsInDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      for (const [hex, cssVar] of Object.entries(colorMap)) {
        // Find bg-[#hex], text-[#hex], border-[#hex], etc.
        const encoded = hex.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
        // e.g. text-[#1890FF] -> text-bs-primary
        const classPrefixes = ['text-', 'bg-', 'border-', 'divide-', 'ring-', 'shadow-', 'fill-', 'stroke-', 'hover:text-', 'hover:bg-', 'hover:border-', 'group-hover:text-', 'group-hover:bg-'];
        
        classPrefixes.forEach(prefix => {
          // regex syntax: match prefix + literal hex, replace with prefix + cssVar
          const regex = new RegExp(prefix + encoded, 'gi');
          content = content.replace(regex, prefix + cssVar);
        });
      }

      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${path.basename(fullPath)}`);
      }
    }
  });
}

replaceColorsInDirectory('/Users/shakilahmedbillal/Desktop/Project/buddyscript/frontend/src/components');
