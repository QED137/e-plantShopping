import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductList.css';
import CartItem from './CartItem';
import { addItem } from './CartSlice';

// --- Static data moved outside the component for performance ---
// This prevents the large array and style objects from being recreated on every re-render.

const plantsArray = [
    {
        category: "Air Purifying Plants",
        plants: [
            { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
            { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
            { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies the air.", cost: "$18" },
            { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity to the air and removes toxins.", cost: "$20" },
            { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to care for and effective at removing toxins.", cost: "$17" },
            { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Purifies the air and has healing properties for skin.", cost: "$14" }
        ]
    },
    {
        category: "Aromatic Fragrant Plants",
        plants: [
            { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Calming scent, used in aromatherapy.", cost: "$20" },
            { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Sweet fragrance, promotes relaxation.", cost: "$18" },
            { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating scent, often used in cooking.", cost: "$15" },
            { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing aroma, used in teas and cooking.", cost: "$12" },
            { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Citrusy scent, relieves stress and promotes sleep.", cost: "$14" },
            { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description: "Hyacinth is a beautiful flowering plant known for its fragrant.", cost: "$22" }
        ]
    },
    // ... other categories
];

const styleObj = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center', // Corrected typo: alignIems -> alignItems
    fontSize: '20px',
};

const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1100px',
};

const styleA = {
    color: 'white',
    fontSize: '30px',
    textDecoration: 'none',
};


function ProductList({ onHomeClick }) {
    // --- State and Hooks are now correctly inside the component ---
    const [showCart, setShowCart] = useState(false);
    
    // Redux hooks for dispatching actions and selecting state
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    // Calculate total quantity directly from the Redux state
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // --- Event Handlers ---
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false); // Simply hide the cart to show plants
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" onClick={handleHomeClick}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a>
                    <a href="#" onClick={handleCartClick} style={styleA}>
                        <div className='cart' style={{ display: 'flex', alignItems: 'center' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68">
                                <rect width="156" height="156" fill="none"></rect>
                                <circle cx="80" cy="216" r="12"></circle>
                                <circle cx="184" cy="216" r="12"></circle>
                                <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"></path>
                            </svg>
                            {/* Display cart count next to the icon */}
                            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                        </div>
                    </a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category) => (
                        <div key={category.category}>
                            <h1>{category.category}</h1>
                            <div className="product-list">
                                {category.plants.map((plant) => {
                                    // Check if the current plant is already in the cart
                                    const isInCart = cartItems.some(item => item.name === plant.name);

                                    return (
                                        <div className="product-card" key={plant.name}>
                                            <img
                                                className="product-image"
                                                src={plant.image}
                                                alt={plant.name}
                                            />
                                            <div className="product-title">{plant.name}</div>
                                            <div className="product-description">{plant.description}</div>
                                            <div className="product-cost">{plant.cost}</div>
                                            
                                            {/* --- CONSOLIDATED BUTTON --- */}
                                            {/* This single button handles both adding and showing the "Added" state */}
                                            <button
                                                className="product-button"
                                                onClick={() => handleAddToCart(plant)}
                                                disabled={isInCart}
                                            >
                                                {isInCart ? "Added to Cart" : "Add to Cart"}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;