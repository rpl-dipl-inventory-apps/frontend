import { SET_AUTHENTICATION_TOKEN } from 'constant/types/authentication';

const initialState = {
    isAuthenticated: false,
    token: null,
};

export const authentication = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATION_TOKEN:
            return {
                ...state,
                isAuthenticated: action.payload ? true : false,
                token: action.payload,
            };
        default:
            return state;
    }
};