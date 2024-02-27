import axios from 'axios'

export const smwApiClient = axios.create({
    baseURL: 'https://api.smw.juanpanasiti.com.ar/api/v1'
})
