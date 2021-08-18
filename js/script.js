$(document).ready(async function () {
  toggleFavicon();

  const states = await getStates();
  let cities = '';
  insertStatesOnSelect(states);

  const stateEl = document.querySelector('#state');
  stateEl.addEventListener('change', async (e) => {
    const idState = e.target.value;
    fillReadonlyState(idState, states);
    cities = await getCities(idState);
    insertCitiesOnSelect(cities);
  });

  const cityEl = document.querySelector('#city');
  cityEl.addEventListener('change', (e) => {
    const idCity = e.target.value;
    fillReadonlyCity(idCity, cities);
  });

  const categoriesEl = document.querySelector('.categories-wrapper');
  categoriesEl.addEventListener('click', (e) => {
    let clickedCard = '';
    const categories = categoriesEl.children[1].children;
    console.dir(e.target.localName);
    console.dir(e.target);
    if (e.target.localName === 'img') {
      clickedCard = e.target.nextElementSibling.lastElementChild.innerText;
    } else if (e.target.localName === 'label') {
      clickedCard = e.target.innerText;
    } else if (e.target.localName === 'input') {
      clickedCard = e.target.nextElementSibling.innerText;
    } else if (e.target.localName === 'figcaption') {
      clickedCard = e.target.children[1].innerText;
    } else if (e.target.localName === 'figure') {
      clickedCard = e.target.children[1].children[1].innerText;
    } else if (e.target.localName === 'div') {
      clickedCard = e.target.children[0].children[1].children[1].innerText;
    }
    const clickedCardName = checkClickedCategory(clickedCard);
    handleActiveCategory(categories, clickedCardName);
  });

  const subcategoriesEl = document.querySelector('.subcategories-wrapper');
  subcategoriesEl.addEventListener('click', (e) => {
    const subcategories = subcategoriesEl.children[1].children;
    const clickedCard = e.target.innerText;
    if (e.target.localName === 'label') {
      const clickedCardName = checkClickedSubcategory(clickedCard);
      handleActiveSubcategory(subcategories, clickedCardName);
    }
  });

  const ratesEl = document.querySelector('.rate .form-input');
  ratesEl.addEventListener('click', (event) => {
    const images = {
      filled: 'url(../assets/icons/star-filled.png)',
      outline: 'url(../assets/icons/star-outline.png)',
    };

    const element = {
      elements: ratesEl,
      event,
    };
    handleBackgroundImage(element, images);
  });

  const valuesEl = document.querySelector('.values .form-input');
  valuesEl.addEventListener('click', (event) => {
    const images = {
      filled: 'url(../assets/icons/value-filled.png)',
      outline: 'url(../assets/icons/value-outline.png)',
    };

    const element = {
      elements: valuesEl,
      event,
    };

    handleBackgroundImage(element, images);
  });

  const cepEl = document.querySelector('#cep');
  cepEl.addEventListener('input', async (e) => {
    const el = e.target;
    let cepValue = parseCepFromForm(el);
    el.value = cepValue;
    if (cepValue.length === 9) {
      const cepNumbers = cepValue.replace('-', '');
      const address = await getCep(cepNumbers);
      fillFormAddress(address);
    }
  });

  const registerButton = document.querySelector('#registerButton');
  registerButton.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.forms[0];
    let dataObj = {};
    let imagesFD = new FormData();

    for (let index = 0; index < form.length; index++) {
      if (form[index].name !== 'registerButton') {
        if (form[index].name !== 'city_image_name' && form[index].name !== 'experience_image_name') {
          dataObj[form[index].name] = form[index].value;
        } else {
          const image = document.querySelector(`#${form[index].id}`).files[0];
          const imageName = genRandomString(16);
          const extension = form[index].value.split('.').slice(-1);
          imagesFD.append([form[index].name], image, `${imageName}.${extension}`);
          dataObj[form[index].name] = `${imageName}.${extension}`;
        }
      }
    }

    $.ajax({
      url: 'http://localhost/_Lofi/api/v0/seeder',
      type: 'POST',
      data: dataObj,
      cache: false,
      success: (response) => {
        const res = JSON.parse(response);
        if (res.status === 200) {
          $.ajax({
            // url: 'save_images.php',
            url: 'http://localhost/_Lofi/api/v0/upload',
            type: 'POST',
            data: imagesFD,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: (response) => {
              const res = JSON.parse(response.substring(69, 138));
              if (res.success && res.status === 200) {
                alert('Cadastro feito com sucesso');
              }
            },
            error: (err) => {
              console.dir(err);
            },
          });
        }
      },
      error: (err) => {
        console.dir(err);
      },
    });
  });
});
