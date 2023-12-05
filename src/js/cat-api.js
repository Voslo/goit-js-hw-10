import axios from "axios"

axios.defaults.headers.common['x-api-key'] = "live_lStqY7ZXaIh8bTYkAWQQwtY1ZaukecGyxFgNhs65GXBvR5Z0FNm0tR2N66Vj12yQ";

export function fetchBreed() {
    return axios.get("https://api.thecatapi.com/v1/breeds")
        .then(resp => {
            resp.data
            console.log(resp.data)
        })
        .catch(err => {
            throw new Error(err)
        })
}

export function fetchCatByBreed(breedId) {
    return axios.get("`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`")
        .then(resp => {
            resp.data
        })
        .catch(err => {
            throw new Error(err)
        })
}