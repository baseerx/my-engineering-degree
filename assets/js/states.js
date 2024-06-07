const statesSelects = document.querySelectorAll('select#states');

statesSelects.forEach(statesSelect => {
  const option = statesSelect.querySelectorAll('option');
  const infoBtn = statesSelect.parentNode.querySelector('a#request-info');
  const defaultVal = statesSelect.getAttribute('data-default');
  const defaualtOption = statesSelect.querySelector(
    `option[value="${defaultVal}"]`
  );

  option[0].removeAttribute('selected');
  defaualtOption.setAttribute('selected', 'selected');
  infoBtn.setAttribute('data-disabled', 'false');
  infoBtn.href = defaultVal;
  infoBtn.innerHTML = 'View';
});

statesSelects.forEach(statesSelect => {
  statesSelect.addEventListener('change', event => {
    const infoBtn = statesSelect.parentNode.querySelector('a#request-info');

    infoBtn.setAttribute('data-disabled', 'false');
    infoBtn.href = event.target.value;
    infoBtn.innerHTML = 'View';
  });
});


