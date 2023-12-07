import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const info = document.querySelector('.cat-info');
function setLoadingState (isLoading) {
    loader.style.display = isLoading ? 'block' : 'none';
};
function setErrorState (hasError) {
    errorMessage.style.display = hasError ? 'block' : 'none';
    select.style.display = hasError ? 'none' : 'block';
};

const defaultOption = document.createElement('option');
defaultOption.textContent = "Виберіть породу кота";
defaultOption.value = "";
select.appendChild(defaultOption);
    
fetchBreeds()
    .then(data => {
        data.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            select.appendChild(option)
            select.style.display = "block"; 
        });
    })
    .catch(() => {
        setErrorState(true)
        select.style.display = "none"; 
    })
    .finally(() => {
        setLoadingState(false);
    })

select.addEventListener('change', onSelectBreed);
function onSelectBreed(event) {
    setErrorState(false);
    setLoadingState(true);
    info.innerHTML = '';
    const breedId = event.target.value;
        fetchCatByBreed(breedId)
        .then(data => {
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
        .catch(onFetchError)
            .finally(() => {
                setLoadingState(false)
                select.style.display = 'block';
            })
    
}

function onFetchError() {
    setLoadingState(true);
    Notify.failure(errorMessage.textContent, {
        position: 'center-center',
        timeout: 5000,
        width: '400px',
        fontSize: '24px'
    });
};