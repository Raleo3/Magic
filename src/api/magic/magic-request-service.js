import axiosRequestCreator from '../axios-request-creator';

/**
  *
  * @return {Object} Axios request object - primed with appropriate Magic Cards API
  */
export default function magicRequestService () {
    return axiosRequestCreator('https://api.magicthegathering.io');
}
