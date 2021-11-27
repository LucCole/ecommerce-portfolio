import { callApi } from './';

// √
export const createProduct = async (body, token) => {

  const data = await callApi({
      method: 'POST',
      url: 'products',
      body,
      token
  });

  return data;
};

export const editProduct = async (token, body, productId) => {
  const data = await callApi({
      method: 'PATCH',
      url: `products/${productId}`,
      body,
      token
  });
  return data;
};

// export const changeAvailability = async (token, body, productId) => {
//   const data = await callApi({
//       method: 'POST',
//       url: `products/availability/${productId}`,
//       body,
//       token
//   });
//   return data;
// };

export const getProduct = async (productId) => {
  const data = await callApi({
      url: `products/${productId}`
  });

  return data;
};

// √
export const getProducts = async () => {
  const data = await callApi({
      url: `products`
  });
  return data;
};

// √
export const getUsersProducts = async (userId) => {
  const data = await callApi({
      url: `products/user/${userId}`
  });
  return data;
};
