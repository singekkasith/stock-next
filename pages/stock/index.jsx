import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home({ stocks }) {

  function deleteBlog(id) {
    fetch(`http://localhost:3000/api/stock/products/${id}`,
      {
        method: 'DELETE'
      })
      .then(res2 => res2.json())
      .then(data => {
        // alert("Deleting " + id)
        window.location.reload(false);
      })

  }

  return (
    <>
      <Head>
        <title>Stock</title>
      </Head>
      <h1>Stock</h1>
      <table><tbody>
        {
          stocks.map(stock => {
            return (
              <tr key={stock._id}>
                <td>
                  <Link href={`/stock/${stock._id}`}>
                    {stock.name}
                  </Link>
                </td>
                <td>
                  <button onClick={() => deleteBlog(stock._id)}>Delete</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
      </table>
      <p>
      </p>

    </>
  )
}

export async function getServerSideProps() {
  const res2 = await fetch(`http://localhost:3000/api/stock/products/`)
  const stocks = await res2.json()
  //console.debug('blog 1', blogs)
  return { props: { stocks } }
}