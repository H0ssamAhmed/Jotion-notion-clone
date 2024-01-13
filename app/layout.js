
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/providers/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import ConvexClientProvider from '../components/providers/ConvexClientProvider'
import { EdgeStoreProvider } from '../lib/edgestore';
import { cn } from '../lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Jotion',

  description: 'NoteHub is connected workspace where better, fasted wrok happens',
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme:light)",
        url: "/logo.svg",
        href: "/logo.svg"
      },
      {
        media: '(prefers-color-schme:dark)',
        url: "/logo-dark.svg",
        href: "/logo-dark.svg"
      }
    ]
  }
}

export default function RootLayout({ children }) {
  return (


    <html lang="en" suppressHydrationWarning>
      <ClerkProvider publishableKey='pk_test_Y3VkZGx5LW1vbmdyZWwtMjYuY2xlcmsuYWNjb3VudHMuZGV2JA'>
        <body className={cn('bg-white  dark:bg-[#1f1f1f]', inter.className)}>
          <ConvexClientProvider>
            <EdgeStoreProvider>

              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Toaster position='bottom-center' />

                {children}
              </ThemeProvider>
            </EdgeStoreProvider>

          </ConvexClientProvider>


        </body>
      </ClerkProvider>
    </html>
  )
}
