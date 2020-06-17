// The difference between the heading token and paragraph is 3,
// heading_open, inline, heading_close
const OFFSET_PARAGRAPH = 3;

module.exports = {
  names: [ "enforce-api-" ],
  description: "Enforces the structure of an API file",
  tags: [ "API", "md", "structure" ],
  function: function rule(params, onError) {
    const indexes = params.tokens.map(function mapToIndex(token, index) {
      const isNewSection = token.type === 'heading_open';
      if (isNewSection) return index
      return undefined
    }).filter(function filterIndexes(index) {
      return index !== undefined
    })

    for (let i = 0; i < indexes.length; i++){
      const headingToken = params.tokens[indexes[i]];
      const content = params.tokens.slice(indexes[i]+OFFSET_PARAGRAPH, indexes[i+1])
      const isInvalidContent = content.some(function isValid(token) {
        if(token.tag != 'p' && token.tag != 'code' && token.tag != ''){
          const lines = token.map[1] - token.map[0];
          if(token.map) {
            onError({
              "lineNumber": token.lineNumber,
              "detail": "This section current is not covered by our toc in " + lines + " line(s).",
              "context": token.line.substr(0, 7)
            });
          }
        }
      })
      // Before the next section, the last element should be a code token
      const [codeToken] = content.slice(-1)
      const isInvalidCode = codeToken.tag == 'code' && codeToken.content != '';

      if(isInvalidCode){
        onError({
          "lineNumber": codeToken.lineNumber,
          "detail": "This section current is not covered by our toc in  line(s).",
          "context": codeToken.line.substr(0, 7)
        });
      }
    }
  }
}
