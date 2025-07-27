import { useState } from 'react';
import './App.css';
import earbudImg from './assets/earbud.png';

const products = [
  { name: 'Feats Bit Pro', price: 49.99, image: earbudImg },
  { name: 'Balaxy Guds Pro 3', price: 49.99, image: null },
  { name: 'Feats Studio Buds', price: 49.99, image: null },
  { name: 'EchoSounds AirVibe', price: 49.99, image: null },
];

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <>
      {/* Header with Cart Icon */}
      <header className="site-header">
        <h1 className="main-heading">High-Quality Wireless Earbuds</h1>
        <button className="cart-toggle" onClick={() => setIsCartOpen(!isCartOpen)}>
          🛒 ({cart.length})
        </button>
      </header>

      <p className="subtext">
        2–5 Day Free Shipping • Quality Electronics • <span className="alert">No Refunds</span>
      </p>

      <main className="page-container">
        <section className="product-grid">
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <div className="placeholder">Image Coming Soon</div>
              )}
              <h2>{product.name}</h2>
              <p>Awesome sound, reliable quality, and all-day comfort.</p>
              <p className="price">${product.price.toFixed(2)}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </section>
      </main>

      {/* Cart Drawer */}
      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>🛍️ Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)}>✖</button>
        </div>
        {cart.length === 0 ? (
          <p className="cart-empty">Cart is empty.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item, i) => (
                <li key={i} className="cart-item">
                  <span>{item.name} - ${item.price.toFixed(2)}</span>
                  <button className="remove-btn" onClick={() => handleRemoveFromCart(i)}>Remove</button>
                </li>
              ))}
            </ul>
            <p className="cart-total">Total: ${total}</p>
            <button className="checkout-btn">Proceed to Checkout</button>
          </>
        )}
      </aside>
    </>
  );
}

export default App;
