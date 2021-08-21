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

  const cityChooseFile = document.querySelector('#cityCover');
  cityChooseFile.addEventListener('change', (e) => {
    const imgPreview = document.querySelector('#cityImgPreview');
    const element = e.target;
    getImageData(element, imgPreview, 'city');
  });

  const experienceChooseFile = document.querySelector('#experienceCover');
  experienceChooseFile.addEventListener('change', (e) => {
    const imgPreview = document.querySelector('#experienceImgPreview');
    const element = e.target;
    getImageData(element, imgPreview, 'experience');
  });

  const categoriesEl = document.querySelector('.categories-wrapper');
  const categoriesWrapper = categoriesEl.querySelector('.categories');

  addCategories(categoriesWrapper);

  categoriesEl.addEventListener('click', (e) => {
    let clickedCard = '';
    const categories = categoriesEl.children[1].children;

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
    handleActiveCategory(categories, clickedCard);
  });

  const subcategoriesEl = document.querySelector('.subcategories-wrapper');
  const subcategoriesWrapper = subcategoriesEl.querySelector('.subcategories');

  addSubcategories(subcategoriesWrapper);

  subcategoriesEl.addEventListener('click', (e) => {
    let clickedCard = '';
    const subcategories = subcategoriesEl.children[1].children;

    if (e.target.localName === 'label') {
      clickedCard = e.target.innerText;
    } else if (e.target.localName === 'input') {
      clickedCard = e.target.nextElementSibling.innerText;
    }
    handleActiveSubcategory(subcategories, clickedCard);
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

  // Adicionar local
  const registerButton = document.querySelector('#registerButton');
  registerButton.addEventListener('click', (e) => {
    e.preventDefault();
    // const form = document.forms[0];
    // let dataObj = {};
    // let imagesFD = new FormData();

    // for (let index = 0; index < form.length; index++) {
    //   if (form[index].name !== 'registerButton') {
    //     if (form[index].name !== 'city_image_name' && form[index].name !== 'experience_image_name') {
    //       dataObj[form[index].name] = form[index].value;
    //     } else {
    //       const image = document.querySelector(`#${form[index].id}`).files[0];
    //       const imageName = genRandomString(16);
    //       const extension = form[index].value.split('.').slice(-1);
    //       imagesFD.append([form[index].name], image, `${imageName}.${extension}`);
    //       dataObj[form[index].name] = `${imageName}.${extension}`;
    //     }
    //   }
    // }

    $.ajax({
      url: 'http://localhost/_Lofi/api/v0/seeder',
      type: 'POST',
      // data: dataObj,
      cache: false,
      beforeSend: () => {
        showLoading();
      },
      success: (response) => {
        const res = JSON.parse(response);
        if (res.status === 200) {
          $.ajax({
            // url: 'save_images.php',
            url: 'http://localhost/_Lofi/api/v0/upload',
            type: 'POST',
            // data: imagesFD,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: (response) => {
              const res = JSON.parse(response.substring(69, 138));
              if (res.success && res.status === 200) {
              }
              Swal.close();
            },
            error: (err) => {
              console.dir(err);
              Swal.close();
            },
          });
        }
        Swal.close();
      },
      error: (err) => {
        console.dir(err);
        Swal.close();
      },
    });
  });
});

function showLoading() {
  Swal.fire({
    title: 'Salvando sua experiência..',
    html: 'Aguarde um momento por favor',
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
  });
}
