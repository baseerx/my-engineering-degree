const body = document.querySelector('body');

const updateBody = element => {
  window.requestAnimationFrame(() => {
    const rect = element.getBoundingClientRect();

    if (rect.width < 768 && body) {
      body.setAttribute('data-mobile', 'true');
    } else if (body) {
      body.setAttribute('data-mobile', 'false');
    }
  });
};
const debounce = (ms, cb) => {
  let timer;

  // eslint-disable-next-line prettier/prettier
  return function() {
    const argmnts = Array.prototype.slice.call(arguments);

    clearTimeout(timer);
    argmnts.unshift(this);
    timer = setTimeout(cb.bind.apply(cb, argmnts), ms);
  };
};

if ('ResizeObserver' in window && body) {
  const resizeObserver = new ResizeObserver(
    debounce(250, entries => {
      for (const entry of entries) {
        updateBody(entry.target);
      }
    })
  );

  resizeObserver.observe(body);
} else if (body) {
  window.addEventListener(
    'resize',
    () => {
      let throttled = false;
      if (!throttled) {
        updateBody(body);
        throttled = true;
        setTimeout(() => {
          throttled = false;
        }, 250);
      }
    },
    false
  );
}
