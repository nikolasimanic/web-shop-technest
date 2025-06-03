import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { GET_PRODUCTS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { setProducts, setFilters, resetFilters, applyFilters, addToCart, removeFromCart } from '../redux/actions/productActions';
import '../styles/ProductList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { store } from '../store/index.js';

const ProductList = () => {
    const dispatch = useDispatch();
    const { loading, error, data } = useQuery(GET_PRODUCTS);
    const products = useSelector(state => state.product.filteredProducts);
    const filters = useSelector(state => state.product.filters);
    const cart = useSelector((state) => state.product.cart);

    useEffect(() => {
        if (data) {
            console.log('Products data:', data.products); // Logiranje podataka o proizvodima
            dispatch(setProducts(data.products));
        }
    }, [data, dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFilters({ [name]: value }));
    };

    const handleResetFilters = () => {
        setFilters({
            searchText: '',
            category: '',
            minPrice: '',
            maxPrice: '',
        });
        dispatch(resetFilters()); 
        handleApplyFilters();
    };


    const handleApplyFilters = () => {
        dispatch(applyFilters());
    };

    const handleAddToCart = (product) => {
        console.log('Product to add:', product);
        dispatch(addToCart(product));
        setTimeout(() => {
            console.log('Current state of cart:', store.getState().product.cart);
        }, 1000);
    };

    const handleRemoveFromCart = (productId) => {
        console.log('Product to remove:', productId);
        dispatch(removeFromCart(productId));
        setTimeout(() => {
            console.log('Current state of cart:', store.getState().product.cart);
        }, 1000);
    };

    return (
        <div className="product-page">
            <div className="filter-section">
                <div className="filter-item">
                    <label htmlFor="searchText">Search:</label>
                    <input
                        id="searchText"
                        type="text"
                        name="searchText"
                        placeholder="Product name or description"
                        onChange={handleFilterChange}
                        value={filters.searchText}
                    />
                </div>

                <div className="filter-item">
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        name="category"
                        onChange={handleFilterChange}
                        value={filters.category}
                    >
                        <option value="">All Categories</option>
                        <option value="Phone">Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="TV">TV</option>
                        <option value="Audio">Audio</option>
                    </select>
                </div>

                <div className="filter-item">
                    <label htmlFor="minPrice">Min Price (€):</label>
                    <input
                        id="minPrice"
                        type="number"
                        name="minPrice"
                        placeholder="Min"
                        onChange={handleFilterChange}
                        value={filters.minPrice}
                    />
                </div>

                <div className="filter-item">
                    <label htmlFor="maxPrice">Max Price (€):</label>
                    <input
                        id="maxPrice"
                        type="number"
                        name="maxPrice"
                        placeholder="Max"
                        onChange={handleFilterChange}
                        value={filters.maxPrice}
                    />
                </div>

                <div className="filter-actions">
                    <button className="filter-btn" onClick={handleApplyFilters}>Filter</button>
                    <button className="reset-filters-btn" onClick={handleResetFilters}>Reset Filters</button>
                </div>
            </div>



            <hr />

            <div className="product-list">
                {products.map((product) => {
                    const isInCart = cart.find(item => item.id === product.id);

                    return (
                        <motion.div
                            key={product.id}
                            className="product-item"
                            whileHover={{ scale: 1.1, boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="price">€{product.price.toFixed(2)}</p>
                            {isInCart ? (
                                <button className="remove-from-cart-btn" onClick={() => handleRemoveFromCart(product.id)} style={{ backgroundColor: 'red' }}>
                                    <span>-</span><FontAwesomeIcon icon={faShoppingCart} />
                                </button>
                            ) : (
                                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                                    <span>+</span><FontAwesomeIcon icon={faShoppingCart} />
                                </button>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
export default ProductList;
