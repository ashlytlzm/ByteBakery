/* Importamos las fuentes de Google para el diseno visual */
import { Playfair_Display, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import { AuthProvider } from '@/components/auth-context'
import { CartProvider } from '@/components/cart-context'

/* Configuracion de las tipografias principales de la marca */
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

/* Metadatos para el SEO y configuracion de iconos del navegador */
export const metadata = {
  title: 'ByteBakery - Reposteria Artesanal',
  description: 'Descubre los postres mas deliciosos hechos con amor. Tortas, cupcakes, galletas, macarons y mas. Pedidos personalizados para tus celebraciones.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/ByeBakery.png',
      },
    ],
    apple: '/ByeBakery.png',
  },
}

/* Componente base de la estructura de la aplicacion */
export default function RootLayout({ children }) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${playfair.variable} ${poppins.variable} bg-background`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Fuentes externas para titulos y elementos decorativos */}
        <link href="https://fonts.googleapis.com/css2?family=Chango&family=Molle:ital@1&family=Oi&family=Smythe&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased text-body bg-light">
        {/* Proveedores globales para la gestion de autenticacion y carrito */}
        <AuthProvider>
          <CartProvider>
            {children}
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
