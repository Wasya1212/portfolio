document.addEventListener("DOMContentLoaded", ready);

function ready() {
  // let $_drawContainer = document.querySelector('.intro');
  // let $_windContainer = document.querySelector('.intro__animated-block-2');
  //
  // console.log(`w: ${$_drawContainer.offsetWidth}; h: ${$_drawContainer.offsetHeight}`);
  // setWind($_windContainer, { w: $_drawContainer.offsetWidth, h: $_drawContainer.offsetHeight });
  //
  // window.addEventListener('resize', () => {
  //   console.log(`w: ${$_drawContainer.offsetWidth}; h: ${$_drawContainer.offsetHeight}`);
  //   setWind($_windContainer, { w: $_drawContainer.offsetWidth, h: $_drawContainer.offsetHeight });
  // });

  let $projects = document.querySelectorAll('.project');
  let projectsAnimationCoords = Array.from($projects).map($project => ({ project: $project, distance: $project.offsetTop }));

  checkProjectsAnimation(projectsAnimationCoords, window.pageYOffset || document.documentElement.scrollTop);

  window.addEventListener("scroll", e => {
    checkProjectsAnimation(projectsAnimationCoords, window.pageYOffset || document.documentElement.scrollTop);
  });
}

function checkProjectsAnimation(projectsCoords, currentPosition) {
  projectsCoords.forEach((project, index) => {
    if (currentPosition + window.innerHeight * 0.5 > project.distance) {
      project.project.classList.add('animated');
      projectsCoords.splice(index, 1);
    }
  });
}
