const heroItems = document.querySelectorAll('button[data-type="herolink"]');
const contentItems = document.querySelectorAll(
  'div[data-type="highlightitem"]'
);

const deactivateHeroItems = () => {
  heroItems.forEach(item => {
    const parent = item.parentElement;

    parent.setAttribute('data-active', 'false');
    item.setAttribute('data-active', 'false');
  });
  contentItems.forEach(item => {
    item.setAttribute('data-active', 'false');
  });
};

heroItems.forEach(item => {
  item.addEventListener('click', () => {
    const parent = item.parentElement;
    const section = item.dataset.section;
    const contentItem = document.querySelector(
      `div[data-type="highlightitem"][data-section="${section}"]`
    );

    deactivateHeroItems();
    parent.setAttribute('data-active', 'true');
    item.setAttribute('data-active', 'true');
    contentItem.setAttribute('data-active', 'true');
  });
});
