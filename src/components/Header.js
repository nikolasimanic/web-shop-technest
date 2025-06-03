import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux'; // 👈 Import Redux state
import '../styles/Header.scss';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 📌 Dohvati broj proizvoda u korpi iz Redux-a
    const cartItems = useSelector(state => state.product.cart);
    const cartCount = cartItems.length;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }, [isMenuOpen]);

    return (
        <header className="header">
            {/* Logo */}
            <NavLink to="/" className="header__logo">TechNest</NavLink>

            {/* Hamburger Menu Icon */}
            <div 
                className={`header__hamburger ${isMenuOpen ? 'open' : ''}`} 
                onClick={toggleMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Navigation Links */}
            <div className={`header__nav ${isMenuOpen ? 'active' : ''}`}>
                <NavLink to="/" className="header__link" activeClassName="active">Home</NavLink>
                <NavLink to="/products" className="header__link" activeClassName="active">Products</NavLink>
                <NavLink to="/about" className="header__link" activeClassName="active">About Us</NavLink>
                <NavLink to="/contact" className="header__link" activeClassName="active">Contact</NavLink>
            </div>

            {/* Cart Icon */}
            <NavLink to="/cart" className="header__cart">
                <FaShoppingCart size={27} />
                {cartCount > 0 && <span className="header__cart-badge">{cartCount}</span>}
            </NavLink>
        </header>
    );
};

export default Header;
