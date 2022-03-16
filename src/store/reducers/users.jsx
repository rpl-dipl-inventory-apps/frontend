import { POPULATE_PROFILE } from 'constant/types/users';

const initialState = null;

export const users = (state = initialState, action) => {
    switch (action.type) {
        case POPULATE_PROFILE:
            return action.payload;
        default:
            return state;
    }
};
