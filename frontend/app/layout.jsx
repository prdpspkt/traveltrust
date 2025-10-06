import { Inter } from 'next/font/google'
import './globals.css'
import ApolloProvider from '@/components/ApolloProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'TravelTrust - Best Priced Air Tickets to Global Destinations',
  description: 'Your trusted partner for affordable air tickets to Japan, USA, UK, Australia, and all tourist destinations worldwide.',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ApolloProvider>
          {children}
        </ApolloProvider>
      </body>
    </html>
  )
}
