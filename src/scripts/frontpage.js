// 1920px / 100vw * 444px
// 1080px / (100vw * 0,5625) * -667px

document.addEventListener("DOMContentLoaded", ready);

if (!document.init) {
  document.init = [];
}

document.init.push(() => { ready(); });

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

  windContainer.style.width = `${width}px`;
  windContainer.style.height = `${height}px`;

  const left = (w / 1920 * 455) - (windContainer.offsetWidth / 2);
  const bottom = (w / 1920 * 1080 / h * 635) - (windContainer.offsetHeight / 2);
  // const bottom = 1080 / (w * 0,5625) * 667;

  windContainer.style.left = `${left}px`;
  windContainer.style.bottom = `${bottom}px`;
}
