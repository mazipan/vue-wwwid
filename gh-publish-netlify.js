const ghpages = require('gh-pages');
const BRANCH = 'netlify-pages';
const TODAY = new Date().toLocaleString();

console.log(`start publishing to ${BRANCH}`);

ghpages.publish('build-netlify', {
  branch: BRANCH,
  message: `Merge to ${BRANCH} ==> ${TODAY}`
}, () => {
  console.log(`done publishing to ${BRANCH}`);
});
