import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'


function Home({ org, members }) {
  const { isFallback } = useRouter()

  if(isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <Head>
        <title>{org.login}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <img
          src={org.avatar_url}
          className="shadow-xl mx-auto rounded-full"
          width={200}
          height={200}
        />
        <h1 className="text-2xl text-center sm:text-6xl lg-text:7xl mt-10 md:mt-24 leading-none font-extrabold tracking-light text-gray-900">
          { org.login }
        </h1>


        <div>
          <h2 className="text-4xl text-center sm:text-4xl lg-text:7xl mt-10 md:mt-24 leading-none font-extrabold tracking-light text-gray-900">
            Membros
          </h2>

          <div className="grid grid-cols-3 gap-4 mt-8">
            { members.map( member => (
              <div className="text-center" key={member.id}>
                <img
                  src={member.avatar_url}
                  className="w-32 h-32 mx-auto rounded-full"
                />
                <span className="text-lg">{member.login}</span>
              </div>
            ))}
          </div>
        </div>

      
      </main>
    </>
  )
}


export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { org: 'ebusiness4us' } }],
    fallback: true,
  }
}


export const getStaticProps: GetStaticProps = async (context) => {
  const { org: name } = context.params
  
  const promises = await Promise.all([
    fetch(`https://api.github.com/orgs/${name}`),
    fetch(`https://api.github.com/orgs/${name}/members`)
  ])

  const org = await promises[0].json()
  const members = await promises[1].json()

  return { 
    props: {
      org,
      members,
    }
  }
}

export default Home

