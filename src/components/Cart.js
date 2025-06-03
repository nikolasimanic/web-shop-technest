import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/actions/productActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import '../styles/Cart.scss';

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.product.cart);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const totalAmount = cart.reduce((total, item) => total + item.price, 0);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={`cart ${cart.length === 0 ? 'empty' : ''}`}>
            {cart.length === 0 ? (
                <div className="stylish-empty-cart">
                    <div className="content-wrapper">
                        <div className="icon-container">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="empty-cart-icon"
                            >
                                <circle cx="9" cy="20" r="1"></circle>
                                <circle cx="20" cy="20" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </div>
                        <h2>Oops! Your cart is empty</h2>
                        <p>Explore amazing products and find something you'll love!</p>
                        <button className="explore-btn" onClick={() => window.location.href = '/products'}>
                            Explore Products
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        <h1>Products in cart</h1>
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p className="price">€{item.price.toFixed(2)}</p>
                                    <button className="remove-item-btn" onClick={() => handleRemoveFromCart(item.id)}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Summary</h3>
                        <p>Total Amount: €{totalAmount.toFixed(2)}</p>
                        <Button className="checkout-btn" onClick={handleOpenModal}>
                            Proceed to Checkout
                        </Button>
                    </div>

                    {/* Modal za plaćanje */}
                    <Dialog open={isModalOpen} onClose={handleCloseModal}>
                        <DialogTitle>Checkout</DialogTitle>
                        <DialogContent>
                            <PayPalScriptProvider
                                options={{
                                    'client-id': 'AbCC5pm2MkxouRMFuX8JhfpNFtvWUdJWeNMiunZhMvJhYwHGhLG5Iriz6RZaV-EgMkXOHMygrpCQQm1j', // Zamenite svojim PayPal client-id
                                    currency: 'EUR',
                                }}
                            >
                                <PayPalButtons
                                    style={{ layout: 'vertical' }}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: totalAmount.toFixed(2),
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            alert(`Payment successful! Thank you, ${details.payer.name.given_name}`);
                                            handleCloseModal();
                                        });
                                    }}
                                    onError={(err) => {
                                        console.error('PayPal Checkout Error:', err);
                                        alert('Payment failed. Please try again.');
                                    }}
                                />
                            </PayPalScriptProvider>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseModal} color="secondary">Close</Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </div>
    );
};

export default Cart;
