$(document).ready(async function () {
  const states = await getStates();
  insertStatesOnSelect(states);

  async function getStates() {
    return fetch('http://api.lazzacriativa.com/v0/state')
      .then((response) => response.json())
      .then(({ data }) => {
        return data.map(({ id_state, name }, index) => {
          const id = index === 0 ? 0 : id_state;
          const stateName = index === 0 ? 'Selecione um estado' : name;
          return `<option value="${id}">${stateName}</option>`;
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function insertStatesOnSelect(states) {
    const statesInput = document.querySelector('#state');
    statesInput.innerHTML = states;
  }

  const stateEl = document.querySelector('#state');
  stateEl.addEventListener('change', async (e) => {
    const idState = e.target.value;
    const cities = await getCities(idState);
    insertCitiesOnSelect(cities);
  });

  async function getCities(idState) {
    return fetch(`http://api.lazzacriativa.com/v0/city/state/${idState}`)
      .then((response) => response.json())
      .then(({ data }) => {
        return data.map(({ id_city, name }, index) => {
          const id = index === 0 ? 0 : id_city;
          const cityName = index === 0 ? 'Selecione uma cidade' : name;
          return `<option value="${id}">${cityName}</option>`;
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function insertCitiesOnSelect(cities) {
    const citiesInput = document.querySelector('#city');
    citiesInput.disabled = false;
    citiesInput.innerHTML = cities;
  }

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
