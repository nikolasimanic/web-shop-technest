import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { setLatestProducts, addToCart, removeFromCart } from '../redux/actions/productActions';
import Particles from 'react-tsparticles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import Lottie from 'lottie-react';
import animationData from '../lottie/backgroundAnimation.json';
import '../styles/Home.scss';
import { store } from '../store/index.js';

const Home = () => {
    const dispatch = useDispatch();
    const latestProducts = useSelector((state) => state.product.latestProducts);
    const products = useSelector((state) => state.product.products);
    const cart = useSelector((state) => state.product.cart);

    useEffect(() => {
        if (products.length > 0) {
            const latest = products.slice(-3);
            dispatch(setLatestProducts(latest));
        }
    }, [dispatch, products]);

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
        <div className="home">
            <Particles
                options={{
                    particles: {
                        number: { value: 50 },
                        size: { value: 3 },
                        move: { speed: 1 },
                        opacity: { value: 0.5 },
                        links: { enable: true, color: "#ffffff" }
                    }
                }}
            />

            {/* Hero Section */}
            <section className="hero">
                <div className="lottie-background">
                    <Lottie animationData={animationData} loop={true} />
                </div>

                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror", ease: "easeOut" }}
                    >
                        Welcome to TechNest
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1, repeat: Infinity, repeatType: "mirror", ease: "easeOut" }}
                    >
                        Your ultimate destination for tech products and gadgets.
                    </motion.p>
                    <NavLink to="/products" className="cta">Explore Products</NavLink>
                </motion.div>
            </section>

            {/* Latest Products Section */}
            <section className="latest-products">
                <motion.h2
                    initial={{ opacity: 0, y: -100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    Latest Products
                </motion.h2>
                <motion.div
                    className="product-list"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.3,
                            },
                        },
                    }}
                >
                    {latestProducts && latestProducts.length > 0 ? (
                        latestProducts.map((product) => {
                            const isInCart = cart.find(item => item.id === product.id);

                            return (
                                <motion.div
                                    key={product.id}
                                    className="product-item"
                                    initial={{ opacity: 0, y: 50, rotate: -10, scale: 0.8 }}
                                    whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: "easeOut", type: "spring", bounce: 0.4 }}
                                >
                                    <img src={product.image} alt={product.name} />
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p className="price">€{product.price}</p>
                                    {isInCart ? (
                                        <button className="remove-from-cart-btn" onClick={() => handleRemoveFromCart(product.id)}>
                                            <span>-</span><FontAwesomeIcon icon={faShoppingCart} />
                                        </button>
                                    ) : (
                                        <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                                            <span>+</span><FontAwesomeIcon icon={faShoppingCart} />
                                        </button>
                                    )}
                                </motion.div>
                            );
                        })
                    ) : (
                        <p>Loading latest products...</p>
                    )}
                </motion.div>
            </section>




            {/* Footer Section */}
            <footer className="footer">
                <p>© 2024 TechNest. All Rights Reserved.</p>
                <nav>
                    <NavLink to="/about">About Us</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                </nav>
            </footer>
        </div>
    );
};

export default Home;
