const HIDE_STYLE = `
  @keyframes transition {
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

  .main {
    animation-duration: .5s;
    animation-name: transition;
    height: 150vw;
    animation-timing-function: ease-in-out;
    transform: scale(0.25);
  }

  .content {
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

  .main {
    animation-duration: .65s;
    animation-direction: reverse;
    height: 150vw;
    animation-timing-function: ease-in-out;
    transform: scale(1);
  }

  .content {
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

  }

  showContainer() {
    this.$container.classList.add('deactivated');
    this.$container.classList.remove('activated');
  }

  play() {
    // make enabled
    this.showContainer();

    return Promise.resolve();
  }

  reverse() {
    this.hideContainer();

    return Promise.resolve();
  }

  disable() {

  }
};

export default Transition;
