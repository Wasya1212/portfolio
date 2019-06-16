class Transition {
  constructor(options) {
    this.$_container = document.createElement('section');
    this.$_container.classList.add('transition-container');
    this.$_container.id = `tr-container-${this.containerId}`;
  }

  get container() {
    // get main block with animated slides
    return this.$_container;
  }

  hideContainer() {
    this.$_container.setAttribute('state', 'disabled');
  }

  showContainer() {
    this.$_container.removeAttribute('state');
  }

  play() {
    // blocks must by full screen
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    // make enabled
    this.showContainer();

    return Promise.resolve();
  }

  reverse() {
    // blocks must by full screen
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    // make enabled
    this.showContainer();

    return Promise.resolve();
  }

  disable() {
    this.hideContainer();
    delete this.animatedBlocks;
  }
};

export default Transition;
