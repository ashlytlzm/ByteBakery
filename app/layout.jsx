// fuentes de google para el estilo
import { Playfair_Display, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import { AuthProvider } from '@/components/auth-context'
import { CartProvider } from '@/components/cart-context'

// configuracion de las tipografias principales
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

export const metadata = {
  title: 'ByteBakery - Reposteria Artesanal',
  description: 'Descubre los postres mas deliciosos hechos con amor. Tortas, cupcakes, galletas, macarons y mas. Pedidos personalizados para tus celebraciones.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${playfair.variable} ${poppins.variable} bg-background`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* fuentes locas para los titulos y logos */}
        <link href="https://fonts.googleapis.com/css2?family=Chango&family=Molle:ital@1&family=Oi&family=Smythe&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased text-body bg-light">
        {/* envolviendo todo en los proveedores de auth y carrito */}
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
