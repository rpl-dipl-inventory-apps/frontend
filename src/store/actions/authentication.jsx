import { SET_AUTHENTICATION_TOKEN } from 'constant/types/authentication';

export const setAuthenticationToken = (token = null) => ({
    type: SET_AUTHENTICATION_TOKEN,
    payload: token,
});
