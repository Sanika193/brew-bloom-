
import { useState } from "react";
import "./App.css";

const menu = [
  { name: "Cappuccino", price: 120, category: "Coffee", emoji: "☕" },
  { name: "Cold Coffee", price: 150, category: "Coffee", emoji: "🧋" },
  { name: "Latte", price: 140, category: "Coffee", emoji: "🥛" },
  { name: "Chocolate Cake", price: 100, category: "Desserts", emoji: "🍰" },
  { name: "Croissant", price: 90, category: "Desserts", emoji: "🥐" },
  { name: "Brownie", price: 110, category: "Desserts", emoji: "🍫" },
  { name: "Veg Sandwich", price: 130, category: "Snacks", emoji: "🥪" },
  { name: "French Fries", price: 100, category: "Snacks", emoji: "🍟" }
];

export default function App() {
  const [category, setCategory] = useState("All");
  const [order, setOrder] = useState([]);
  const [notice, setNotice] = useState("");
  const [sent, setSent] = useState(false);

  const add = item => {
    setOrder(old => [...old, item]);
    setNotice(`${item.name} added to your order!`);
  };

  const remove = index => {
    setOrder(old => old.filter((_, i) => i !== index));
    setNotice("Item removed.");
  };

  const total = order.reduce((sum, item) => sum + item.price, 0);
  const filtered = category === "All"
    ? menu
    : menu.filter(item => item.category === category);

  return (
    <div>
      <nav>
        <h2>☕ Brew & Bloom</h2>
        <a href="#home">Home</a>
        <a href="#menu">Menu</a>
        <a href="#order">My Order ({order.length})</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>

      <section id="home" className="hero">
        <p>WELCOME TO BREW & BLOOM</p>
        <h1>Your Daily Dose of Happiness</h1>
        <p>Freshly brewed coffee, delicious bites, and cozy moments.</p>
        <button onClick={() =>
          document.getElementById("menu").scrollIntoView({ behavior: "smooth" })
        }>
          Explore Our Menu
        </button>
      </section>

      <section id="menu">
        <h2>Our Menu</h2>
        <p>Find your favourite treat.</p>

        {["All", "Coffee", "Desserts", "Snacks"].map(c => (
          <button key={c} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}

        <div className="menu-grid">
          {filtered.map(item => (
            <div className="menu-card" key={item.name}>
              <h2>{item.emoji}</h2>
              <h3>{item.name}</h3>
              <p>{item.category}</p>
              <h3>₹{item.price}</h3>
              <button onClick={() => add(item)}>Add to Order</button>
            </div>
          ))}
        </div>
      </section>

      <section id="order">
        <h2>Your Order 🛍️</h2>
        {order.length === 0 ? <p>Your order is empty. Choose something from the menu!</p> :
          order.map((item, i) => (
            <p key={i}>
              {item.emoji} {item.name} — ₹{item.price}
              <button onClick={() => remove(i)}>Remove</button>
            </p>
          ))}
        <h3>Total: ₹{total}</h3>
        <button onClick={() => {
          setOrder([]);
          setNotice("Your order has been cleared.");
        }}>Clear Order</button>
        <p>{notice}</p>
      </section>

      <section id="about">
        <h2>A Little About Us 🌷</h2>
        <p>Brew & Bloom is a cozy café made for coffee lovers, sweet treats,
          and little breaks from busy days.</p>
      </section>

      <section id="contact">
        <h2>Let's Talk 💌</h2>
        <form onSubmit={e => {
          e.preventDefault();
          setSent(true);
          e.target.reset();
        }}>
          <input placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required />
          <button type="submit">Send Message</button>
        </form>
        {sent && <p>Thank you! Your message was submitted successfully.</p>}
      </section>

      <footer>
        <p>☕ Brew & Bloom Café</p>
        <p>Made with love, coffee & a little sweetness.</p>
        <a href="#home">Back to Top ↑</a>
      </footer>
    </div>
  );
}
