import Head from "next/head"
import Link from "next/link"

// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Stock({ stock }) {
  //stock.log('blog 2', stock)
  if (!stock) return (
    <div>
      <p>Stock not found</p>
      <Link href="/stock">Back</Link>
      </div>
  );

  return (
    <>
      <Head>
        <title>{stock.name}</title>
      </Head>
      <h1>{stock.name}</h1>
      <p>{stock.price}</p>
      <p>{stock.code}</p>
      <Link href="/stock">Back</Link>
    </>
  )
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
  console.debug('params', params)
  const res2 = await fetch(`http://localhost:3000/api/stock/products/${params.id}`)
  const stock = await res2.json()
  console.debug('blog 1', stock)
  return { props: { stock } }
}