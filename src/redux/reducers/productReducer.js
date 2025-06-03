import { SET_PRODUCTS, SET_FILTERS, RESET_FILTERS, APPLY_FILTERS, SET_LATEST_PRODUCTS, ADD_TO_CART, REMOVE_FROM_CART } from '../actions/productActions';

const initialState = {
    products: [],
    filteredProducts: [],
    latestProducts: [],
    cart: [],  // Inicijalizujemo cart kao prazan niz
    filters: {
        searchText: '',
        category: '',
        minPrice: '',
        maxPrice: '',
    },
};

const productReducer = (state = initialState, action) => {
    console.log('Reducer called with state:', state);
    console.log('Initial state cart:', initialState.cart);

    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                filteredProducts: action.payload,
                latestProducts: action.payload.slice(-3),
            };
        case SET_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.payload,
                },
            };
        case RESET_FILTERS:
            return {
                ...state,
                filters: initialState.filters, // Reset na podrazumevane filtere
            };
        case APPLY_FILTERS:
            const { searchText, category, minPrice, maxPrice } = state.filters;
            const filtered = state.products.filter((product) => {
                const matchesCategory = !category || (product.category && product.category.toLowerCase() === category.toLowerCase());
                const matchesSearchText = !searchText || product.name.toLowerCase().includes(searchText.toLowerCase()) || product.description.toLowerCase().includes(searchText.toLowerCase());
                const matchesMinPrice = !minPrice || product.price >= parseFloat(minPrice);
                const matchesMaxPrice = !maxPrice || product.price <= parseFloat(maxPrice);
                return matchesCategory && matchesSearchText && matchesMinPrice && matchesMaxPrice;
            });
            return {
                ...state,
                filteredProducts: filtered,
            };
        case SET_LATEST_PRODUCTS:
            return {
                ...state,
                latestProducts: action.payload,
            };
        case ADD_TO_CART:
            console.log('Adding to cart, current cart:', state.cart);
            const updatedCart = state.cart ? [...state.cart, action.payload] : [action.payload];
            return {
                ...state,
                cart: updatedCart,
            };
        case REMOVE_FROM_CART:
            console.log('Removing from cart, product id:', action.payload);
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            };
        default:
            return state;
    }
};

export default productReducer;
