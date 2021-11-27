import { callApi } from './';

export const addProductToWishlist = async (body, token) => {

  const data = await callApi({
      method: 'POST',
      url: 'wishlist/add',
      body,
      token
  });

  return data;
};

export const removeProductFromWishlist = async (body, token) => {

  const data = await callApi({
      method: 'DELETE',
      url: 'wishlist/delete',
      body,
      token
  });

  return data;
};

export const getWishlist = async (userId) => {
  const data = await callApi({
      url: `wishlist/${userId}`
  });

  return data;
};

export const getWishlistEntry = async (productId, token) => {
  const data = await callApi({
      url: `wishlist/product/${productId}`,
      body: {
        productId
      },
      token
  });

  return data;
};
