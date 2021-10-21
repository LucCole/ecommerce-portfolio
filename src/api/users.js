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

export const getUserProfile = async (id) => {
  const data = await callApi({
      url: `users/profile/${id}`
  });
  return data;
};

export const editUserProfile = async (body, token) => {
  const data = await callApi({
    method: 'PATCH',
    url: `users/profile`,
    body,
    token
  });
  return data;
};

export const editUserEmail = async (body, token) => {
  const data = await callApi({
    method: 'PATCH',
    url: `users/email`,
    body,
    token
  });
  return data;
};


export const editUserPassword = async (body, token) => {
  const data = await callApi({
    method: 'PATCH',
    url: `users/password`,
    body,
    token
  });
  return data;
};