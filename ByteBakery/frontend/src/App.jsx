import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/components/auth-context'
import { CartProvider } from '@/components/cart-context'
import { Header } from '@/components/bytebakery/header'

import HomePage from '@/app/page'
import AdminPage from '@/app/admin/page'
import BucaramangaPage from '@/app/bucaramanga/page'
import CarritoPage from '@/app/carrito/page'
import CatalogoPage from '@/app/catalogo/page'
import ContactoPage from '@/app/contacto/page'
import DashboardPage from '@/app/dashboard/page'
import LoginPage from '@/app/login/page'
import NosotrosPage from '@/app/nosotros/page'
import PedidosPage from '@/app/pedidos/page'
import PromocionesPage from '@/app/promociones/page'
import RecetasPage from '@/app/recetas/page'
import RegistroPage from '@/app/registro/page'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/bucaramanga" element={<BucaramangaPage />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/catalogo" element={<CatalogoPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/pedidos" element={<PedidosPage />} />
          <Route path="/promociones" element={<PromocionesPage />} />
          <Route path="/recetas" element={<RecetasPage />} />
          <Route path="/registro" element={<RegistroPage />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}
