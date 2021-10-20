import { callApi } from './';

export const userLogin = async ({username, password}) => {
    const data = await callApi({
        method: 'POST',
        url: 'users/login',
        body: {
            username,
            password
        }
    });
    return data;
};

export const userRegister = async ({username, email, password}) => {
    const data = await callApi({
        method: 'POST',
        url: 'users/register',
        body: {
            username, 
            email, 
            password
        }
    });
    return data;
};

export const getUser = async (token) => {
    const data = await callApi({
        url: 'users/me',
        token
    });
    return data;
};
