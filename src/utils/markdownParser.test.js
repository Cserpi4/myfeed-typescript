// Egyszerű Markdown parser React-ben történő megjelenítéshez.
// Ez csak a legfontosabb elemeket kezeli, mint pl. a linkek és új sorok.

// Ha bonyolultabbat szeretnél, használhatsz pl. 'marked' vagy 'react-markdown' csomagokat.

export function parseMarkdown(text) {
  if (!text) return '';

  // Egyszerű helyettesítések:
  let html = text
    .replace(/\n/g, '<br />') // új sorok HTML <br> címkékre
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'); 
    // [link szöveg](url) -> <a> tag

  return html;
}
