import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartSidebar from './CartSidebar';
import FavoritesSidebar from './FavoritesSidebar';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        onFavoritesClick={() => setIsFavoritesOpen(true)}
      />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <FavoritesSidebar isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
