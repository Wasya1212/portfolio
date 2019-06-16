import RestFull from "./libs/restful";
import Transition from "./libs/transition";
import cheerio from "cheerio";

let nextPageTransition = new Transition();

let loader = new RestFull(page => {
  // create ready template
  let htmlPage = cheerio.load(page);
  // get content from template
  let content = htmlPage('.content').children();

  return content;
});

function showContent(link) {
  nextPageTransition
    .play()
    .then(() => loader.loadContent(link))
    .then(content => {
      // set page content
      setContent(content);
      // initialize main script
      init();
      // initialize page script
      loadScript();
    })
    .then(() => nextPageTransition.reverse())
    .then(() => {
      // close transition animation
      nextPageTransition.disable();
    });
}

function setContent(content) {
  let $_container = document.querySelector('.content');
  $_container.innerHTML = content;
}

function loadScript() {
  let pageName = document.body.getAttribute('name');
  try {
    pagesScripts.init(pageName);
  } catch (e) {
    console.log(`Page "${pageName}" doesn't have any scripts!`);
  }
}

function init() {
  let $_links = document.querySelectorAll('.link[pagePath]');

  $_links.forEach($_link => {
    let link = $_link.getAttribute('pagePath');
    $_link.addEventListener('click', e => {
      let pageName = link.match(/(\w+)\.\w+$/).pop();
      document.body.setAttribute('name', pageName)
      showContent(link);
    });
  });
}
