const ghpages = require('gh-pages');
const BRANCH = 'gh-pages';
const TODAY = new Date().toLocaleString();

console.log(`start publishing to ${BRANCH}`);

ghpages.publish('build-github', {
  branch: BRANCH,
  message: `Deploy to ${BRANCH} ==> ${TODAY}`,
  dotfiles: true
}, () => {
  console.log(`done publishing to ${BRANCH}`);
});
