'use strict';

const path = require('path');
const Page = require('./libs/page');

// path to pagePath/(page name)
// path to stylesPath/[style names] | (style name)
// path to scriptsPath/[script names] | (script name)

let indexPage = new Page("frontpage");
indexPage.addScripts([ "index", "frontpage" ]);
indexPage.addStyles([ "frontpage" ]);

let aboutPage = new Page("about");
aboutPage.addScripts([ "about" ]);
aboutPage.addStyles([ "about" ]);

let projectsPage = new Page("projects");
projectsPage.addScripts([ "projects" ]);
projectsPage.addStyles([ "projects" ]);

let contactsPage = new Page("contacts");
contactsPage.addScripts([ "contacts" ]);
contactsPage.addStyles([ "contacts" ]);

module.exports = {
  distDir: path.resolve(__dirname, '../dist'),
  srcDir: path.resolve(__dirname, '../src'),
  pagesDir: path.resolve(__dirname, '../src/pages'),
  scriptsDir: path.resolve(__dirname, '../src/scripts'),
  stylesDir: path.resolve(__dirname, '../src/styles/pages'),
  assetsDir: path.resolve(__dirname, '../src/assets'),
  pages: [
    indexPage,
    aboutPage,
    projectsPage,
    contactsPage
  ].map(page => page.data())
}
