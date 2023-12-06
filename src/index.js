import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const info = document.querySelector('.cat-info');

function setLoadingState (isLoading) {
    loader.style.display = isLoading ? 'block' : 'none';
};
function setErrorState (hasError) {
    errorMessage.style.display = hasError ? 'block' : 'none';
};

let arrBreedsId = [];
fetchBreeds()
    .then(data => {
        data.forEach(breed => {
            arrBreedsId.push({ text: breed.name, value: breed.id });
        });
        new SlimSelect({
            select: select,
            data: arrBreedsId
        });
    })
    .catch(() => setErrorState(true))
    .finally(() => setLoadingState(false))

select.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
    setErrorState(false);
    setLoadingState(false);

    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
        .then(data => {
            info.innerHTML=''
            const { url, breeds } = data[0];
            const markup = `
            <div class="box-img">
            <img src="${url}" alt="${breeds[0].name}" width="400"/>
            </div><div class="box">
            <h1>${breeds[0].name}</h1>
            <p>${breeds[0].description}</p>
            <p>
            <b>Temperament:</b>
            ${breeds[0].temperament}</p>
            </div>`
            info.insertAdjacentHTML('beforeend', markup);
        })
        .catch(onFetchError);
};

function onFetchError() {
    setLoadingState(true);
    Notify.failure(errorMessage.textContent, {
        position: 'center-center',
        timeout: 5000,
        width: '400px',
        fontSize: '24px'
    });
};