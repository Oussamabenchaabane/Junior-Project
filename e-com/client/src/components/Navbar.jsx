import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useState } from 'react';

function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>Store</div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      <ul>
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
        <li><NavLink to="/cart">Cart</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar; 