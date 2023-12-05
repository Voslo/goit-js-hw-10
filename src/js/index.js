import { fetchBreed, fetchCatByBreed } from "./cat-api";


const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');

const info = document.querySelector('.info');

function setLoadingState (isLoading) {
    loader.style.display = isLoading ? 'block' : 'none';
};
function setErrorState (hasError) {
    errorMessage.style.display = hasError ? 'block' : 'none';
};

function populateBreeds () {
    setLoadingState(true);
    setErrorState(false);
    fetchBreed()
        .then(data => {
            data.forEach(breed => {
                const option = document.querySelector('option');
                console.log(option);
                option.value = breed.id;
                option.textContent = breed.name;
                select.appendChild(option);
            });
        })
        .catch(err => setErrorState(true))
        .finally(() => setLoadingState(false))
}
const displayCats = (breedId) => {
    setLoadingState(true);
    setErrorState(false);
    fetchCatByBreed(breedId)
        .then(catData => {
            const catInfo = `
            <img src="${catData.url}" alt="${catData.breeds[0].name}">
            <h2>${catData.breeds[0].name}</h2>
            <p>${catData.breeds[0].description}</p>
            <p>Temperament:${catData.breeds[0].temperament}</p>
            `
            info.innerHTML= catInfo;
        })
        .catch(error => {
            setErrorState(true);
        })
        .finally(() => {
            setLoadingState(false);
        })
}

select.addEventListener('change', selectedBreed)

function selectedBreed(evt) {
    const selectedBreedId = evt.target.value;
    if (selectedBreedId) {
        displayCats(selectedBreedId);
    }
}

populateBreeds();
