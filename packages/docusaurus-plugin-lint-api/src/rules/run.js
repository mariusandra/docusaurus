const markdownlint = require('markdownlint');
const enforceAPIStructure = require('./enforce-api-structure.js');

const options = {
  files: ['test2.md'],
  customRules: [enforceAPIStructure]
}

markdownlint(options, function callback(err, result) {
  if (!err) {
    console.log(result.toString());
  }
  console.log(err)
});
