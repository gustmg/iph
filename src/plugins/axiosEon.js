import axios from 'axios'

export default axios.create({
    baseURL: 'http://eonproduccion.net:31000/v2017001/API',
    headers: {
        Authorization: localStorage.getItem('token'),
    },
})
