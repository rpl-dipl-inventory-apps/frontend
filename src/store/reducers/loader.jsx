import {
    SET_LOADER,
    SET_LOADER_IS_AUTH,
} from 'constant/types/loader';

const initialState = {
    isActive: false,
    isAuthenticated: false, // temporary change
};

export const loader = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADER:
            return {
                ...state,
                isActive: action.payload,
                isAuthenticated: false,
            };
        case SET_LOADER_IS_AUTH:
            return {
                ...state,
                isAuthenticated: action.payload,
            };
        default:
            return state;
    }
};
