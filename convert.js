const fs = require('fs');

const html = fs.readFileSync('Design/feed.html', 'utf8');

const startIdx = html.indexOf('<body>');
const endIdx = html.lastIndexOf('<script src="assets/js/bootstrap.bundle.min.js">');

let bodyHtml = html.substring(startIdx + 6, endIdx);

bodyHtml = bodyHtml.replace(/class=/g, 'className=');
bodyHtml = bodyHtml.replace(/for=/g, 'htmlFor=');
bodyHtml = bodyHtml.replace(/tabindex=/g, 'tabIndex=');
bodyHtml = bodyHtml.replace(/aria-current=/g, 'ariaCurrent=');
bodyHtml = bodyHtml.replace(/fill-opacity=/g, 'fillOpacity=');
bodyHtml = bodyHtml.replace(/fill-rule=/g, 'fillRule=');
bodyHtml = bodyHtml.replace(/clip-rule=/g, 'clipRule=');
bodyHtml = bodyHtml.replace(/stroke-width=/g, 'strokeWidth=');
bodyHtml = bodyHtml.replace(/stroke-linecap=/g, 'strokeLinecap=');
bodyHtml = bodyHtml.replace(/stroke-linejoin=/g, 'strokeLinejoin=');

// Fix unclosed tags by simple replace
bodyHtml = bodyHtml.replace(/<img(.*?)>/g, (match, p1) => {
  if (p1.endsWith('/')) return match;
  return `<img${p1}/>`;
});
bodyHtml = bodyHtml.replace(/<hr(.*?)>/g, (match, p1) => {
  if (p1.endsWith('/')) return match;
  return `<hr${p1}/>`;
});
bodyHtml = bodyHtml.replace(/<input(.*?)>/g, (match, p1) => {
  if (p1.endsWith('/')) return match;
  return `<input${p1}/>`;
});
bodyHtml = bodyHtml.replace(/<br(.*?)>/g, (match, p1) => {
  if (p1.endsWith('/')) return match;
  return `<br${p1}/>`;
});
bodyHtml = bodyHtml.replace(/<circle(.*?)>/g, (match, p1) => {
  if (p1.endsWith('/')) return match;
  return `<circle${p1}/>`;
});
bodyHtml = bodyHtml.replace(/<rect(.*?)>/g, (match, p1) => {
  if (p1.endsWith('/')) return match;
  return `<rect${p1}/>`;
});
bodyHtml = bodyHtml.replace(/<path(.*?)>/g, (match, p1) => {
  if (p1.endsWith('/')) return match;
  return `<path${p1}/>`;
});
bodyHtml = bodyHtml.replace(/<ellipse(.*?)>/g, (match, p1) => {
  if (p1.endsWith('/')) return match;
  return `<ellipse${p1}/>`;
});

// Remove comments
bodyHtml = bodyHtml.replace(/<!--[\s\S]*?-->/g, '');

const finalTsx = `'use client';
import React from 'react';
import Link from 'next/link';

export default function FeedPage() {
  return (
    <>
      ${bodyHtml}
    </>
  );
}
`;

fs.writeFileSync('frontend/src/app/(main)/page.tsx', finalTsx);
console.log("Conversion complete and fast.");
