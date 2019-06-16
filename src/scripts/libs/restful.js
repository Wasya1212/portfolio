class Loader {
  constructor(contentHandler = content => content) {
    if (typeof contentHandler !== 'function') {
      throw new Error("Restfull content handler must be a function!");
    }
    this.contentHandler = contentHandler;
  }

  loadContent(link) {
    let http = this.createRequestObject();
    let contentHandler = this.contentHandler;

    return new Promise((resolve, reject) => {
      if(http) {
        http.open('get', link);
          http.onreadystatechange = function () {
            if(http.readyState == 4) {
              let content = contentHandler(http.responseText) || http.responseText;
              resolve(content);
            }
          }
          http.send(null);
      } else {
        document.location = link;
        resolve(null);
      }
    });
  }

  // ajax object
  createRequestObject() {
    try {
      return new XMLHttpRequest()
    } catch(e) {
      try {
        return new ActiveXObject('Msxml2.XMLHTTP');
      } catch(e) {
        try {
          return new ActiveXObject('Microsoft.XMLHTTP');
        } catch(e) {
          return null;
        }
      }
    }
  }
}

export default Loader;
