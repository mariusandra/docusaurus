module.exports = {
  names: [ "enforce-toc" ],
  description: "Enforces the sections of the markdown render a table of contents",
  tags: [ "TOC", "h2", "h3" ],
  function: function rule(params, onError) {
    params.tokens.filter(function filterToken(token) {
      return token.type === 'heading_open' && (token.tag !== "h2" && token.tag !== "h3");
    }).forEach(function forToken(section) {
      if(section.map) {
        const lines = section.map[1] - section.map[0];
        onError({
            "lineNumber": section.lineNumber,
            "detail": "This section current is not covered by our toc in " + lines + " line(s).",
            "context": section.line.substr(0, 7)
        });
      }
    });
  }
}
