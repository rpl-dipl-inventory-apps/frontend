import { POPULATE_PROFILE } from 'constant/types/users';

export const populateProfile = (profile = {}) => ({
    type: POPULATE_PROFILE,
    payload: profile,
});
