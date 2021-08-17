$(document).ready(async function () {
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
    const categories = categoriesEl.children[1].children;
    const clickedCard = e.target.innerText;
    const clickedCardName = checkClickedCategory(clickedCard);
    handleActiveCategory(categories, clickedCardName);
  });

  const subcategoriesEl = document.querySelector('.subcategories-wrapper');
  subcategoriesEl.addEventListener('click', (e) => {
    const subcategories = subcategoriesEl.children[1].children;
    const clickedCard = e.target.innerText;
    if (e.target.localName === 'label') {
      const clickedCardName = checkClickedSubcategory(clickedCard);
      console.dir(e.target);
      handleActiveSubcategory(subcategories, clickedCardName);
    }
  });

  const rates = document.querySelector('.evaluation-wrapper .rate .form-input');
  rates.addEventListener('click', (e) => {
    const images = {
      filled: 'url(../assets/icons/star-filled.png)',
      outline: 'url(../assets/icons/star-outline.png)',
    };

    const clickedEl = e.target;
    if (clickedEl.localName === 'figure') {
      const clickedIndex = e.target.dataset.index;
      Array.from(rates.children).map((el) => {
        if (el.localName === 'figure') {
          console.dir(el);
          el.style.backgroundImage = images.filled;
          if (el.dataset.index > clickedIndex) el.style.backgroundImage = images.outline;
        }
      });
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
