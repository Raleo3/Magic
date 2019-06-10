import axios from 'axios';

/**
  * Generic Axios Request wrapper
  *
  * @return {Object} Axios request object
  */
export default function axiosRequestCreator(url) {
    return axios.create({
        baseURL: url,
        timeout: 20000
    });
}
