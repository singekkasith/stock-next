import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home({ blogs }) {

    /*  This is for the Client Side Fetching
        const [blogs, setBlogs] = useState([]);

        useEffect(() => {
            //fetch data from API
            fetch("/api/blogs/articles")
                .then(res => res.json())
                .then(data => {
                    //do something with data
                    console.log(data)
                    setBlogs(data)
                })
        }, [])
    */
    function deleteBlog(id) {
        //alert("Deleting" + id)
        fetch(`http://localhost:3000/api/blogs/articles/${id}`,
        {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            //alert(" Delete " + id)
            window.location.reload(false);
        })
    }

    return (
        <>
            <Head>
                <title>Blogs</title>
            </Head>
            <h1>Blogs</h1>
            <table><tbody>
                {
                    blogs.map(blog => {
                        return(
                            <tr key={blog._id}>
                                <td>
                                    <Link href={`/blogs/${blog._id}`}>
                                        {blog.title}
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => deleteBlog(blog._id)}>Delete</button>
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


//This is for the Server Side Fetching
export async function getServerSideProps() {
    const res = await fetch(`http://localhost:3000/api/blogs/articles/`)
    const blogs = await res.json()
    // console.debug('blog 1', blogs)
    return { props: { blogs } }
}