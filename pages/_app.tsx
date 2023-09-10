import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../layout/Layout'
import DeFiProvider from '../context/useContext'
import NextNProgress from "nextjs-progressbar"
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
 

  return  <>
            <NextNProgress color="#6C0E15" />
            <QueryClientProvider client={queryClient}>
              <DeFiProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </DeFiProvider>
            </QueryClientProvider>
          </>
}

export default MyApp
