import Layout from '@components/Layout'

import '@styles/tailwind.css'
import '@styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
