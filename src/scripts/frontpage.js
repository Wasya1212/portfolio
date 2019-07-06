// 1920px / 100vw * 444px
// 1080px / (100vw * 0,5625) * -667px

document.addEventListener("DOMContentLoaded", ready, true);

if (!document.init) {
  document.init = [];
} else {
  document.init = [() => { ready(); }];
}

function ready() {
  let $_drawContainer = document.querySelector('.intro');
  let $_windContainer = document.querySelector('.intro__animated-block-2');

  // console.log(`w: ${$_drawContainer.offsetWidth}; h: ${$_drawContainer.offsetHeight}`);
  setWind($_windContainer, { w: $_drawContainer.offsetWidth, h: $_drawContainer.offsetHeight });

  window.addEventListener('resize', () => {
    // console.log(`w: ${$_drawContainer.offsetWidth}; h: ${$_drawContainer.offsetHeight}`);
    setWind($_windContainer, { w: $_drawContainer.offsetWidth, h: $_drawContainer.offsetHeight });
  });
}

function setWind(windContainer, { w, h }) {
  const width = w / 1920 * 486;
  const height = w / 1920 * 1080 / h * 426;
  const left = (w / 1920 * 455) - (width / 2);
  // const bottom = (w / 1920 * 1080 / h * 635) - (windContainer.offsetHeight / 2);
  const bottom = 730 / (1920 / w) - height / 2;
  console.log(1080 / 1920)
  console.log(1080 - 425);
  console.log(h)
  // const bottom = left / 0.56;// 1080 / (h * 0,5625) * 667;

  windContainer.style.width = `${width}px`;
  windContainer.style.height = `${height}px`;
  windContainer.style.left = `${left}px`;
  windContainer.style.bottom = `${bottom}px`;
}
