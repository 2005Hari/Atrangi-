import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { ToastProvider } from './context/ToastContext';

// Placeholder pages
import Hero from './components/Hero';
import FeaturedSection from './components/FeaturedSection';
import ArtistShowcase from './components/ArtistShowcase';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';

const Home = () => (
  <div className="min-h-screen">
    <Hero />
    <FeaturedSection />
    <ArtistShowcase />
    <AboutSection />
    <Testimonials />
    <Newsletter />
  </div>
);

import Collections from './pages/Collections';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ArtistsPage from './pages/ArtistsPage';
import CommissionPage from './pages/CommissionPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import CollectionsPage from './pages/CollectionsPage';
import MessagesPage from './pages/MessagesPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ArtistDetailsPage from './pages/ArtistDetailsPage';
import FAQPage from './pages/FAQPage';
import ShippingPage from './pages/ShippingPage';
import ReturnsPage from './pages/ReturnsPage';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManager from './pages/admin/ProductManager';
import ArtistManager from './pages/admin/ArtistManager';
import CommissionManager from './pages/admin/CommissionManager';
import OrderManager from './pages/admin/OrderManager';
import UserManager from './pages/admin/UserManager';

import { api } from './services/api';
import { useStore } from './store/useStore';
import { useEffect } from 'react';

function App() {
  const { setProducts, setArtists } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, artistsData] = await Promise.all([
          api.getProducts(),
          api.getArtists()
        ]);
        setProducts(productsData);
        setArtists(artistsData);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ToastProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          {/* Public Routes wrapped in Main Layout */}
          <Route element={<Layout><Outlet /></Layout>}>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/artists" element={<ArtistsPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/commission" element={<CommissionPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-collections" element={<CollectionsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/orders" element={<OrderTrackingPage />} />
            <Route path="/artists/:id" element={<ArtistDetailsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<OrderManager />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="artists" element={<ArtistManager />} />
            <Route path="commissions" element={<CommissionManager />} />
            <Route path="users" element={<UserManager />} />
          </Route>
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
