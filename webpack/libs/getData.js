const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const getEntryScripts = config => {
  let scriptsList = Object.create(null);

  config.pages.forEach(page => {
    page.scripts.forEach(script => {
      scriptsList[script.toString()] = path.join(config.scriptsDir, `${script}.js`);
    });
  });

  return scriptsList;
}

const getEntryStyles = config => {
  let stylesList = [];

  config.pages.forEach(page => {
    page.styles.forEach(style => {
      if (stylesList.indexOf(path.join(config.stylesDir, `${style}.sass`)) == -1) {
        stylesList.push(path.join(config.stylesDir, `${style}.sass`));
      }
    });
  });

  return stylesList;
}

const getProductionHtmlPlugins = config => {
  return config.pages.map(page => {
    return new HtmlWebpackPlugin({
      filename: `${page.name}.html`,
      inject: false,
      template: path.join(config.pagesDir, `${page.name}.pug`),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true
      }
    });
  });
}

const getDevelopmentHtmlPlugins = config => {
  return config.pages.map(page => {
    return new HtmlWebpackPlugin({
      filename: `${page.name}.html`,
      inject: false,
      template: path.join(config.pagesDir, `${page.name}.pug`),
      minify: false
    });
  });
}

module.exports = (config) => ({
  entryScripts: getEntryScripts(config),
  entryStyles: getEntryStyles(config),
  htmlPlugins: {
    production: getProductionHtmlPlugins(config),
    development: getDevelopmentHtmlPlugins(config)
  }
})
