document.addEventListener("DOMContentLoaded", ready);

function ready() {
  let $projects = document.querySelectorAll('.project');
  let $projectsCategoriesControllers = document.querySelectorAll('.projects__control__item');

  // select project by first category
  selectProjects($projects, Array.from($projectsCategoriesControllers)[0].getAttribute('category'));

  // create projects categories filter controller
  Array.from($projectsCategoriesControllers).forEach($controller => {
    $controller.addEventListener('click', e => {
      selectProjects($projects, e.currentTarget.getAttribute('category'));
    });
  });

  let projectsAnimationCoords = Array.from($projects).map($project => ({ $project, distance: $project.offsetTop }));

  // check for animation projects when page is loded
  checkProjectsAnimation(projectsAnimationCoords, window.pageYOffset || document.documentElement.scrollTop);

  // check for animation projects when scroll is active
  window.addEventListener("scroll", e => {
    checkProjectsAnimation(projectsAnimationCoords, window.pageYOffset || document.documentElement.scrollTop);
  });
}

function checkProjectsAnimation(projectsCoords, currentPosition) {
  projectsCoords.forEach((project, index) => {
    if (currentPosition + window.innerHeight * 0.5 > project.distance) {
      project.$project.classList.add('animated');
      projectsCoords.splice(index, 1);
    }
  });
}

function selectProjects($projects, category) {
  Array.from($projects).forEach($project => {
    if ($project.getAttribute('category') == category) {
      $project.classList.remove('hidden');
    } else {
      $project.classList.add('hidden');
    }
  });
}
