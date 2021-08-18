/**
 * Returns an array of objects of states from API
 *
 * @returns {Array<objects>} Object ex.: {id_state: number, name: string, initials: string}
 */
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

/**
 * Return an array of objects of cities from API by id of state
 *
 * @param {number} idState
 * @returns {Array<objects>} Object ex.: {id_city: number, name: string}
 */
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

/**
 * Create options to select tag with states from API
 *
 * @param {Array<objects>} AllStates
 */
function insertStatesOnSelect(AllStates) {
  const statesInput = document.querySelector('#state');
  const states = AllStates.map(({ id_state, name }, index) => {
    const id = index === 0 ? 0 : id_state;
    const stateName = index === 0 ? 'Selecione um estado' : name;
    return `<option value="${id}">${stateName}</option>`;
  });
  statesInput.innerHTML = states;
}

/**
 * Create options to select tag with cities from API
 *
 * @param {Array<object} AllCities
 */
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

/**
 * Fill the input state of experience form (readonly input)
 *
 * @param {number} idState id of selected state
 * @param {Array<object>} states
 */
function fillReadonlyState(idState, states) {
  const index = Number(idState) - 1;
  const stateReadonlyEl = document.querySelector('#stateReady');
  if (idState > 0) {
    stateReadonlyEl.value = states[index].initials;
    triggerBlurEvent(stateReadonlyEl);
  }
}

/**
 * Fill the input city of experience form (readonly input)
 *
 * @param {number} idCity id of selected city
 * @param {Array<object>} cities
 */
function fillReadonlyCity(idCity, cities) {
  const cityReadonlyEl = document.querySelector('#cityReady');
  if (idCity > 0) {
    cityReadonlyEl.value = cities.filter((city) => city.id_city === idCity).map((city) => city.name);
    triggerBlurEvent(cityReadonlyEl);
  }
}

/**
 * Trigger blur event on element
 *
 * @param {Object} element Input to trigger event
 */
function triggerBlurEvent(element) {
  const event = document.createEvent('Event');
  event.initEvent('blur', true, true);
  element.dispatchEvent(event);
}

/**
 * Check which category card was clicked and returns the name of card
 *
 * @param {string} clickedCategory Text of category clicked
 * @returns {string}
 */
function checkClickedCategory(clickedCategory) {
  if (clickedCategory === 'Comida e bebida') {
    return 'Comida e bebida';
  } else if (clickedCategory === 'Passeio') {
    return 'Passeio';
  } else if (clickedCategory === 'Hospedagem') {
    return 'Hospedagem';
  }
}

/**
 * Handle which category card was clicked, set active class on index clicked
 *
 * @param {Array<Object>} categories HTML elements
 * @param {number} clickedCategory
 */
function handleActiveCategory(categories, clickedCategory) {
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    category.classList.remove('active');
    if (category.innerText === clickedCategory) category.classList.add('active');
  }
}

/**
 * Check which subcategory card was clicked and returns the name of card
 *
 * @param {string} clickedSubcategory Text of subcategory clicked
 * @returns {string}
 */
function checkClickedSubcategory(clickedSubcategory) {
  if (clickedSubcategory === 'Parques') {
    return clickedSubcategory;
  } else if (clickedSubcategory === 'Caminhadas') {
    return clickedSubcategory;
  } else if (clickedSubcategory === 'Museus') {
    return clickedSubcategory;
  } else if (clickedSubcategory === 'Praias') {
    return clickedSubcategory;
  } else if (clickedSubcategory === 'Cachoeiras') {
    return clickedSubcategory;
  }
}

/**
 * Handle which subcategory card was clicked, set active class on index clicked
 *
 * @param {Array<Object>} subcategories HTML elements
 * @param {number} clickedSubcategory
 */
function handleActiveSubcategory(subcategories, clickedSubcategory) {
  for (let index = 0; index < subcategories.length; index++) {
    const subcategory = subcategories[index];
    subcategory.children[1].classList.remove('active');
    subcategory.classList.remove('active');
    if (subcategory.innerText === clickedSubcategory) {
      console.dir(subcategory.children[1]);
      subcategory.children[1].classList.add('active');
      subcategory.classList.add('active');
    }
  }
}

/**
 * Iterates an array of HTML element, if clicked element is an figure
 * and the index of element is smaller then index of clicked element added the filled image
 * else added outline image on background
 *
 * @param {Object} param0 Object with array of HTML element (rates) and an event of element clicked
 * @param {Object} images An object with 'star' image filled and outline
 */
function handleBackgroundImage({ elements, event }, images) {
  const clickedEl = event.target;
  if (clickedEl.localName === 'figure') {
    const clickedIndex = event.target.dataset.index;
    Array.from(elements.children).map((el) => {
      if (el.localName === 'figure') {
        el.style.backgroundImage = images.filled;
        if (el.dataset.index > clickedIndex) el.style.backgroundImage = images.outline;
      }
    });
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

/**
 * Return cep object from API Viacep
 * @param {string} cep Cep from address form
 * @returns {Object}
 */
async function getCep(cep) {
  return fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => response.json())
    .then((cep) => {
      return cep;
    })
    .catch((err) => console.error(err));
}

/**
 * Fill address form with object and set focus on input number
 *
 * @param {Object} address Object from API Viacep
 */
function fillFormAddress(address) {
  const street = document.querySelector('#street');
  const district = document.querySelector('#district');
  const number = document.querySelector('#number');
  street.value = address.logradouro;
  triggerBlurEvent(street);
  district.value = address.bairro;
  triggerBlurEvent(district);
  number.focus();
}

/**
 * Parse cep string, add dash and replace to max value
 *
 * @param {Object} cepEl An HTML object of cep
 * @returns {string}
 */
function parseCepFromForm(cepEl) {
  let cepString = cepEl.value;
  if (cepString.length === 5) cepString += '-';
  if (cepString.length > 9) cepString = cepString.substring(0, 9);
  const cepValue = cepString.replace(this.regexCep, '');
  return cepValue;
}

/**
 * Change favicon according to theme color
 */
function toggleFavicon() {
  const faviconWhite = 'assets/favicon/favicon-white.png';
  const faviconPurple = 'assets/favicon/favicon-purple.png';
  const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
  const iconUrl = mediaQueryList.matches ? faviconWhite : faviconPurple;
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = iconUrl;
  document.getElementsByTagName('head')[0].appendChild(link);
}
