class Transition {
  constructor($container) {
    this.$container = $container;
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
    let style = document.createElement('style');
    style.textContent = `
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
    `;

    document.querySelector('head').appendChild(style);
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
