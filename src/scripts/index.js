import RestFull from "./libs/restful";
import Transition from "./libs/transition";

document.addEventListener("DOMContentLoaded", ready);

let scr = document.querySelector('script')

setTimeout(() => {
  scr.parentNode.removeChild(scr)
}, 5000)

let nextPageTransition = new Transition();

function sliceText(str, maxLen = 10000) {
  let slices = [];
  const slicesCount = Math.ceil(str.length / maxLen);


  for (let i = 1, begin = 0, end = maxLen; i <= slicesCount; i++) {
    slices.push(str.slice(begin, maxLen * i));
    begin = maxLen * i;
  }

  return slices;
}

function getBody(page) {
  const slices = sliceText(page, 100);
  const sliceLength = slices[0].length;

  let startIndex;
  let endIndex;

  for (let i = 0; i < slices.length - 1; i++) {
    startIndex = (slices[i] + slices[i + 1]).search(new RegExp('(?<=<body?(.*)>)'));
    if (startIndex != -1) {
      startIndex += i * sliceLength;
      break;
    }
  }

  console.log(slices[slices.length - 1])

  for (let i = slices.length - 1; i > 0; i--) {
    endIndex = (slices[i] + slices[i - 1]).search(new RegExp('(?<=</body>)'));
    if (endIndex != -1) {
      endIndex += i * sliceLength;
      console.log(endIndex);
      break;
    }
  }
}

let loader = new RestFull(page => {
  // console.log(page.replace(new RegExp('(<head>)(.*)(/head>)'), ''));
  getBody(page)
  console.log(page.search(new RegExp('(?<=</body>)')));
  const head = new RegExp('(?<=<head>)(.*)(?=</head>)').exec(page)[0];
  const body = new RegExp('(?<=<body?(.*)>)(.*)(?=</body>)').exec(page)[0];
  const scripts = page.match(/(?<=script src=").*?(?=")/g);



  return { head, body, scripts };
});

function ready() {
  let $_links = document.querySelectorAll('.link[pagePath]');

  Array.from($_links).forEach($_link => {
    let link = $_link.getAttribute('pagePath');
    $_link.addEventListener('click', e => {
      showContent(link);
    });
  });
}

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
  document.body.innerHTML = content.body;

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
