const header = document.querySelector('header');
const navOverlay = document.querySelector('div[data-type="overlay"]');
const linksWChildren = document.querySelectorAll(
  'section[data-type="header"] li[data-children="true"]'
);
const linksWOChildren = document.querySelectorAll(
  'section[data-type="header"] li[data-children="false"]'
);
const mobileLinksWChildren = document.querySelectorAll(
  'section[data-type="mobilenav"] li[data-children="true"]'
);
const subnav = document.querySelector('section[data-type="subnav"]');
const mobileNav = document.querySelector('section[data-type="mobilenav"]');
const openMobileNav = document.querySelector(
  'section[data-type="header"] button#mobile-nav-button'
);
const closeMobileNav = document.querySelector(
  'section[data-type="mobilenav"] button[data-type="close"]'
);
const backToParentMobileNav = document.querySelectorAll(
  'section[data-type="mobilenav"] button[data-type="back"]'
);
const childNavs = subnav.querySelectorAll('nav');
const mobileParentNav = document.querySelector(
  `section[data-type="mobilenav"] ul[data-type="mobileparent"]`
);
const mobileChildNavs = document.querySelectorAll(
  `section[data-type="mobilenav"] ul[data-type="mobilechild"]`
);

linksWChildren.forEach(link => {
  link.addEventListener('mouseenter', () => {
    const childNav = document.querySelector(
      `nav[data-parent="${link.dataset.parent}"]`
    );

    childNavs.forEach(nav => {
      nav.setAttribute('data-active', 'false');
    });
    link.setAttribute('data-active', 'true');
    navOverlay.setAttribute('data-active', 'true');
    subnav.setAttribute('data-active', 'true');
    if (childNav) childNav.setAttribute('data-active', 'true');
  });
});

linksWOChildren.forEach(link => {
  link.addEventListener('mouseenter', () => {
    navOverlay.setAttribute('data-active', 'false');
    subnav.setAttribute('data-active', 'false');
    childNavs.forEach(nav => {
      nav.setAttribute('data-active', 'false');
    });
    linksWChildren.forEach(link => {
      link.setAttribute('data-active', 'false');
    });
  });
});

header.addEventListener('mouseleave', () => {
  navOverlay.setAttribute('data-active', 'false');
  subnav.setAttribute('data-active', 'false');
  linksWChildren.forEach(link => {
    link.setAttribute('data-active', 'false');
  });
  childNavs.forEach(nav => {
    nav.setAttribute('data-active', 'false');
  });
});

openMobileNav.addEventListener('click', () => {
  navOverlay.setAttribute('data-active', 'true');
  mobileNav.setAttribute('data-active', 'true');
});

closeMobileNav.addEventListener('click', () => {
  navOverlay.setAttribute('data-active', 'false');
  mobileNav.setAttribute('data-active', 'false');
});

mobileLinksWChildren.forEach(link => {
  link.addEventListener('click', evt => {
    const childNav = document.querySelector(
      `ul[data-type="mobilechild"][data-parent="${link.dataset.parent}"]`
    );

    evt.stopPropagation();
    if (childNav) childNav.setAttribute('data-active', 'true');
    mobileParentNav.setAttribute('data-active', 'false');
  });
});

backToParentMobileNav.forEach(btn => {
  btn.addEventListener('click', () => {
    mobileParentNav.setAttribute('data-active', 'true');
    mobileChildNavs.forEach(nav => {
      nav.setAttribute('data-active', 'false');
    });
  });
});


