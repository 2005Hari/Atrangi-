import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { ToastProvider } from './context/ToastContext';

// Public Pages
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import ArtworkDetailPage from './pages/ArtworkDetailPage';
import CommissionPage from './pages/CommissionPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Auth Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// User Dashboard Pages
import UserDashboard from './pages/user/UserDashboard';
import OrderTrackingPage from './pages/user/OrderTrackingPage';
import CheckoutPage from './pages/user/CheckoutPage';

// Artist Dashboard Pages
import ArtistDashboard from './pages/artist/ArtistDashboard';
import ArtistArtworks from './pages/artist/ArtistArtworks';
import ArtistSales from './pages/artist/ArtistSales';
import ArtistCommissions from './pages/artist/ArtistCommissions';

// Admin Dashboard Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManager from './pages/admin/ProductManager';
import ArtistManager from './pages/admin/ArtistManager';
import OrderManager from './pages/admin/OrderManager';
import CommissionManager from './pages/admin/CommissionManager';
import UserManager from './pages/admin/UserManager';

// Info & Legal Pages
import FAQPage from './pages/FAQPage';
import ShippingPage from './pages/ShippingPage';
import ReturnsPage from './pages/ReturnsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

// Route Protection Guards
import { UserProtectedRoute, ArtistProtectedRoute, AdminProtectedRoute } from './components/RouteGuards';

import { api } from './services/api';
import { useStore } from './store/useStore';

function App() {
  const { setProducts, setArtists } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, artistsData] = await Promise.all([
          api.getProducts({ limit: 100 }),
          api.getArtists()
        ]);
        setProducts(productsData?.products || productsData || []);
        setArtists(artistsData || []);
      } catch (error) {
        console.error("Failed to fetch initial curatorial data:", error);
      }
    };
    fetchData();
  }, [setProducts, setArtists]);

  return (
    <ToastProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          {/* Public & General User Layout Routes */}
          <Route element={<Layout><Outlet /></Layout>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
            <Route path="/commission" element={<CommissionPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected Client Dashboard Routes */}
            <Route path="/account" element={
              <UserProtectedRoute>
                <UserDashboard />
              </UserProtectedRoute>
            } />
            <Route path="/tracking" element={
              <UserProtectedRoute>
                <OrderTrackingPage />
              </UserProtectedRoute>
            } />
            <Route path="/checkout" element={
              <UserProtectedRoute>
                <CheckoutPage />
              </UserProtectedRoute>
            } />

            {/* Protected Artist Dashboard Routes */}
            <Route path="/artist" element={
              <ArtistProtectedRoute>
                <ArtistDashboard />
              </ArtistProtectedRoute>
            } />
            <Route path="/artist/artworks" element={
              <ArtistProtectedRoute>
                <ArtistArtworks />
              </ArtistProtectedRoute>
            } />
            <Route path="/artist/sales" element={
              <ArtistProtectedRoute>
                <ArtistSales />
              </ArtistProtectedRoute>
            } />
            <Route path="/artist/commissions" element={
              <ArtistProtectedRoute>
                <ArtistCommissions />
              </ArtistProtectedRoute>
            } />

            {/* Public Informational / Legal Pages */}
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/shipping-policy" element={<ShippingPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Route>

          {/* Secure Admin Dashboard Routes */}
          <Route path="/admin" element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="artworks" element={<ProductManager />} />
            <Route path="artists" element={<ArtistManager />} />
            <Route path="orders" element={<OrderManager />} />
            <Route path="commissions" element={<CommissionManager />} />
            <Route path="users" element={<UserManager />} />
          </Route>
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
