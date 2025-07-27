import { useState } from 'react';
import './App.css';
import earbudImg1 from './assets/earbud.png';
import earbudImg2 from './assets/earbud.png';
import earbudImg3 from './assets/earbud.png';
import earbudImg4 from './assets/earbud.png';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51Rpch9Hm0QlgAbWAAjjqQdIimYELzEFr6mqOaTjHf0onrp6qDWoRm0L0BAcO0v6Rkf6CScB7hlH0YHPzQmTvEpSr00LJYBYQpW');

const products = [
  { name: 'Feats Bit Pro', price: 49.99, image: earbudImg1 },
  { name: 'Balaxy Guds Pro 3', price: 49.99, image: earbudImg2 },
  { name: 'Feats Studio Buds', price: 49.99, image: earbudImg3 },
  { name: 'EchoSounds AirVibe', price: 49.99, image: earbudImg4 },
];

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCheckout = async () => {
    console.log("Initiating checkout...");
  const stripe = await stripePromise;

  // Create line items from cart
  const lineItems = cart.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100), // Stripe uses cents
    },
    quantity: 1,
  }));

  // Call your serverless backend or mock backend
  const response = await fetch('https://ereptronics-backend.netlify.app/.netlify/functions/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ lineItems }),
});

  const session = await response.json();

  // Redirect to Stripe Checkout
  console.log("Stripe session ID:", session.id);
  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });

  if (result.error) {
    alert(result.error.message);
  }
};

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
<button className="checkout-btn" onClick={() => {
    console.log('Clicked ✅');
    handleCheckout();
  }}>
  Proceed to Checkout
</button>
          </>
        )}
      </aside>
    </>
  );
}

export default App;
