class Page {
  constructor(page) {
    if (typeof page == "string") {
      this.name = page;
      this.scripts = [];
      this.styles = [];

      return;
    }

    const { pageName, scriptNames, styleNames } = page;

    if (!pageName || typeof pageName != "string") {
      throw new Error("Enter page name in config file!!!");
    }

    this.name = pageName;
    this.scripts = scriptNames || [];
    this.styles = styleNames || [];
  }

  addScripts(scripts) {
    if (Array.isArray(scripts)) {
      this.scripts = this.scripts.concat(scripts);
    } else {
      this.scripts.push(scripts.toString());
    }
  }

  addStyles(styles) {
    if (Array.isArray(styles)) {
      this.styles = this.styles.concat(styles);
    } else {
      this.styles.push(styles.toString());
    }
  }

  data() {
    return {
      name: this.name,
      scripts: this.scripts,
      styles: this.styles
    };
  }
}

module.exports = Page;
