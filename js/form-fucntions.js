async function getStates() {
  return fetch('http://api.lazzacriativa.com/v0/state')
    .then((response) => response.json())
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
}

async function getCities(idState) {
  return fetch(`http://api.lazzacriativa.com/v0/city/state/${idState}`)
    .then((response) => response.json())
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
}

function insertStatesOnSelect(AllStates) {
  const statesInput = document.querySelector('#state');
  const states = AllStates.map(({ id_state, name }, index) => {
    const id = index === 0 ? 0 : id_state;
    const stateName = index === 0 ? 'Selecione um estado' : name;
    return `<option value="${id}">${stateName}</option>`;
  });
  statesInput.innerHTML = states;
}

function insertCitiesOnSelect(AllCities) {
  const citiesInput = document.querySelector('#city');
  const cities = AllCities.map(({ id_city, name }, index) => {
    const id = index === 0 ? 0 : id_city;
    const cityName = index === 0 ? 'Selecione uma cidade' : name;
    return `<option value="${id}">${cityName}</option>`;
  });
  citiesInput.disabled = false;
  citiesInput.innerHTML = cities;
}

function fillReadonlyState(idState, states) {
  const index = Number(idState) - 1;
  const stateReadonlyEl = document.querySelector('#stateReady');
  if (idState > 0) {
    stateReadonlyEl.value = states[index].initials;
    triggerBlurEvent(stateReadonlyEl);
  }
}

function fillReadonlyCity(idCity, cities) {
  const cityReadonlyEl = document.querySelector('#cityReady');
  if (idCity > 0) {
    cityReadonlyEl.value = cities.filter((city) => city.id_city === idCity).map((city) => city.name);
    triggerBlurEvent(cityReadonlyEl);
  }
}

function triggerBlurEvent(element) {
  const event = document.createEvent('Event');
  event.initEvent('blur', true, true);
  element.dispatchEvent(event);
}

function checkClickedCategory(clickedCategory) {
  if (clickedCategory === 'Comida e bebida') {
    return 'Comida e bebida';
  } else if (clickedCategory === 'Passeio') {
    return 'Passeio';
  } else if (clickedCategory === 'Hospedagem') {
    return 'Hospedagem';
  }
}

function handleActiveCategory(categories, clickedCategory) {
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    category.classList.remove('active');
    if (category.innerText === clickedCategory) category.classList.add('active');
  }
}

function checkClickedSubcategory(clickedCategory) {
  if (clickedCategory === 'Parques') {
    return clickedCategory;
  } else if (clickedCategory === 'Caminhadas') {
    return clickedCategory;
  } else if (clickedCategory === 'Museus') {
    return clickedCategory;
  } else if (clickedCategory === 'Praias') {
    return clickedCategory;
  } else if (clickedCategory === 'Cachoeiras') {
    return clickedCategory;
  }
}

function handleActiveSubcategory(categories, clickedSubcategory) {
  for (let index = 0; index < categories.length; index++) {
    const subcategory = categories[index];
    subcategory.classList.remove('active');
    if (subcategory.innerText === clickedSubcategory) subcategory.classList.add('active');
  }
}

/**
 * Generates a random password.
 *
 * @param int $length Length of password, option, 8 by default
 * @return string The random password
 */
function genRandomString(length = 8) {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*';
  const charactersLength = characters.length;
  let randomString = '';
  for (index = 0; index < length; index++) {
    const index = Math.floor(Math.random() * (charactersLength - 1 - 0) + 0);
    randomString += characters[index];
  }
  return randomString;
}
