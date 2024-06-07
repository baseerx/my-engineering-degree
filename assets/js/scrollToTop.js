const scrollBtn = document.querySelector('button#scrollToTop');

const btnVisibility = () => {
  if (window.scrollY > 400) {
    scrollBtn.setAttribute('data-visible', 'true');
  } else {
    scrollBtn.setAttribute('data-visible', 'false');
  }
};

document.addEventListener('scroll', () => {
  btnVisibility();
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  setTimeout(() => {
    scrollBtn.setAttribute('data-visible', 'false');
  }, 150);
});
