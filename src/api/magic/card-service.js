import baseURL from './baseURL';
import { CREATURE } from '../../constants/type';

export function getCardsByType (nextPage = 1, type = CREATURE) {
    return baseURL.get('/v1/cards', {
        params: {
            type: type,
            page: nextPage,
            pageSize: 50
         }
    });
}
