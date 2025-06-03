export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_FILTERS = 'SET_FILTERS';
export const RESET_FILTERS = 'RESET_FILTERS';
export const APPLY_FILTERS = 'APPLY_FILTERS';
export const SET_LATEST_PRODUCTS = 'SET_LATEST_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products,
});

export const setFilters = (filters) => ({
    type: SET_FILTERS,
    payload: filters,
});

export const resetFilters = () => ({
    type: RESET_FILTERS,
});

export const applyFilters = () => ({
    type: APPLY_FILTERS,
});

export const setLatestProducts = (latestProducts) => ({
    type: SET_LATEST_PRODUCTS,
    payload: latestProducts,
});

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
});

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});
