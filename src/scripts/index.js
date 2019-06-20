import RestFull from "./libs/restful";
import Transition from "./libs/transition";

document.addEventListener("DOMContentLoaded", ready);

let nextPageTransition = new Transition();

// slice text to many parts
function sliceText(str, maxLen = 10000) {
  let slices = [];
  const slicesCount = Math.ceil(str.length / maxLen);


  for (let i = 1, begin = 0, end = maxLen; i <= slicesCount; i++) {
    slices.push(str.slice(begin, maxLen * i));
    begin = maxLen * i;
  }

  return slices;
}

// get sliced body
function getBody(page) {
  let slices = sliceText(page, 100);
  const sliceLength = slices[0].length;

  let startIndex; // start of body
  let endIndex; // end of body

  // searching for body start
  for (let i = 0; i < slices.length - 1; i++) {
    startIndex = (slices[i] + slices[i + 1]).search(new RegExp('(?<=<body?(.*)>)'));
    if (startIndex != -1) {
      startIndex += i * sliceLength;
      break;
    }
  }

  // searching for body end
  for (let i = slices.length - 1; i > 0; i--) {
    endIndex = (slices[i] + slices[i - 1]).search(new RegExp('(?<=</body>)'));
    if (endIndex != -1) {
      endIndex += i * sliceLength;
      break;
    }
  }

  // remove trash slices from start
  slices.splice(0, Math.floor(startIndex / sliceLength));
  // remove trash slices from end
  slices.splice(Math.ceil(endIndex / sliceLength), slices.length - Math.ceil(endIndex / sliceLength));

  // remove trash words from start
  slices[0] = slices[0].substring(startIndex % sliceLength, slices[0].length);
  // remove trash words from end
  slices[slices.length - 1] = slices[slices.length - 1].substring(0, endIndex % sliceLength);

  return slices;
}

// create object which contains body, head, and page scripts
let loader = new RestFull(page => {
  const head = new RegExp('(?<=<head>)(.*)(?=</head>)').exec(page)[0];
  const bodyParts = getBody(page);
  const scripts = page.match(/(?<=script src=").*?(?=")/g);

  return { head, bodyParts, scripts };
});

// init func
function ready() {
  let $_links = document.querySelectorAll('.link[pagePath]');

  // set transition control to all links
  Array.from($_links).forEach($_link => {
    let link = $_link.getAttribute('pagePath');
    $_link.removeAttribute('href');
    $_link.setAttribute('nohref', true);
    $_link.addEventListener('click', e => {
      showContent(link);
    });
  });
}

// play animation and show new page
function showContent(link) {
  nextPageTransition
    .play()
    .then(() => loader.loadContent(link))
    .then(content => {
      setContent(content);
    })
    .then(() => nextPageTransition.reverse())
    .then(() => {
      // close transition animation
      nextPageTransition.disable();

      if (!document.init) {
        document.init = [];
      }

      document.init.push(() => { ready(); });
    });
}

function setContent(content) {
  // add body
  document.getElementsByTagName('body')[0].innerHTML = content.bodyParts.join('');

  // add head
  document.querySelector('head').innerHTML = content.head;

  // create scripts
  const $scripts = content.scripts.map(script => {
    let $script = document.createElement('script');
    $script.type = 'text/javascript';
    $script.src = script;
    $script.onload = () => {
      let $script = document.createElement('script');
      $script.type = 'text/javascript';
      $script.textContent = `
        if (document.init.length > 0) {
          var shifted = document.init.shift();
          shifted();
        }
      `;
      document.getElementsByTagName('body')[0].appendChild($script);
    };

    return $script;
  });

  // add scripts
  $scripts.forEach($script => {
    document.getElementsByTagName('body')[0].appendChild($script);
  });
}
