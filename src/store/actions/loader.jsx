import {
    SET_LOADER,
    SET_LOADER_IS_AUTH,
} from 'constant/types/loader';

export const setLoader = (isActive = false) => ({
    type: SET_LOADER,
    payload: isActive,
});

export const setLoaderIsAuth = (isLoading = false) => ({
    type: SET_LOADER_IS_AUTH,
    payload: isLoading,
});
