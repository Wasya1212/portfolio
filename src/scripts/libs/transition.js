const HIDE_STYLE = `
  @keyframes reverseTransition {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.25);
    }
  }

  body.deactivated {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 100vh;
    overflow: hidden;
  }

  body.deactivated .main {
    animation-duration: .5s;
    animation-name: reverseTransition;
    height: 150vw;
    animation-timing-function: ease-in-out;
    transform: scale(0.25);
  }

  body.deactivated .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

const SHOW_STYLE = `
  @keyframes transition {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.25);
    }
  }

  body.activated {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 100vh;
    height: 100vh
    overflow: hidden;
  }

  body.activated .main {
    animation-duration: .65s;
    animation-direction: reverse;
    animation-name: transition;
    height: 150vw;
    animation-timing-function: ease-in-out;
    transform: scale(1);
  }

  body.activated .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

class Transition {
  constructor($container) {
    this.$container = $container;
  }

  get hideStyle() {
    return HIDE_STYLE;
  }

  get showStyle() {
    return SHOW_STYLE;
  }

  get container() {
    // get main block with animated slides
    return this.$container;
  }

  hideContainer() {
    this.$container.classList.remove('deactivated');
    this.$container.classList.add('activated');
    this.$container.querySelector('main').style.webkitAnimationPlayState="paused";
    this.$container.querySelector('main').style.webkitAnimationPlayState="running";
  }

  showContainer() {
    this.$container.classList.add('deactivated');
    this.$container.classList.remove('activated');
    this.$container.querySelector('main').style.webkitAnimationPlayState="paused";
    this.$container.querySelector('main').style.webkitAnimationPlayState="running";
  }

  play() {
    // make enabled
    this.showContainer();

    return Promise.resolve();
  }

  reverse() {
    this.hideContainer();

    return new Promise((resolve, reject) => {
      setTimeout(resolve, 700)
    });
  }

  disable() {

  }
};

export default Transition;
