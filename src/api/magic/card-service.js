import magicRequestService from './magic-request-service';
import { CREATURE } from '../../constants/type';

/**
  * Makes a GET request to the Magic Cards API
  *
  * @param {Number} nextPage - the next page to fetch from the API
  * @param {String} type - card type needed for targeted API request
  * @param {Number} pageSize - Number of Cards objects to return in response
  * @return {Object} GET request response object
  */
export const getCardsByType = (nextPage = 1, type = CREATURE, pageSize = 20) => {
    return magicRequestService().get('/v1/cards', {
        params: {
            type: type,
            page: nextPage,
            pageSize: pageSize
         }
    });
}
