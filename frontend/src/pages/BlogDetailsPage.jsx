import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import "./BlogDetailsPage.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

function BlogDetailsPage() {

  // ==========================
  // GET BLOG ID FROM URL
  // ==========================

  const { id } = useParams();


  // ==========================
  // BLOG DATA
  // ==========================

  const [blog, setBlog] = useState(null);

  const [recentBlogs, setRecentBlogs] = useState([]);


  // ==========================
  // LOADING
  // ==========================

  const [loading, setLoading] = useState(true);

// ==========================
// IMAGE URL
// ==========================

const getImageUrl = (image) => {

  if (!image) {
    return "";
  }

  if (image.startsWith("http")) {
    return image;
  }

  return `http://localhost:5000${image}`;
};

  // ==========================
  // LOAD SELECTED BLOG
  // ==========================

  useEffect(() => {

    fetchBlog();

  }, [id]);


  const fetchBlog = async () => {

    try {

      setLoading(true);


      // Get selected article

      const response = await axios.get(
        `http://localhost:5000/api/articles/${id}`
      );


      setBlog(response.data);


      // Get all articles for New Posts

      const allResponse = await axios.get(
        "http://localhost:5000/api/articles"
      );


      const otherBlogs =
        allResponse.data.filter(
          (item) => item._id !== id
        );


      setRecentBlogs(
        otherBlogs.slice(0, 4)
      );


    } catch (error) {

      console.error(
        "Error loading blog:",
        error
      );

      setBlog(null);

    } finally {

      setLoading(false);

    }

  };


  // ==========================
  // LOADING SCREEN
  // ==========================

  if (loading) {

    return (

      <>
        
        <Header />

        <div className="blog-details-page">

          <div className="blog-details-container">

            <h2>
              Loading article...
            </h2>

          </div>

        </div>

        <Footer />

      </>

    );

  }


  // ==========================
  // ARTICLE NOT FOUND
  // ==========================

  if (!blog) {

    return (

      <>

        <Header />


        <div className="blog-details-page">

          <div className="blog-details-container">

            <div className="blog-main">

              <h2>
                Article Not Found
              </h2>

              <p>
                The article you are looking for
                does not exist.
              </p>


              <Link to="/blog">

                Back to Blog

              </Link>

            </div>

          </div>

        </div>


        <Footer />

      </>

    );

  }


  // ==========================
  // BLOG DETAILS PAGE
  // ==========================

  return (

    <>

      <Header />


      <div className="blog-details-page">


        {/* ==========================
            BREADCRUMB
        ========================== */}

        <div className="blog-breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>
            ›
          </span>

          <Link to="/blog">
            Blog
          </Link>

          <span>
            ›
          </span>

          <span>
            {blog.category}
          </span>

          <span>
            ›
          </span>

          <span>
            {blog.title}
          </span>

        </div>


        {/* ==========================
            MAIN CONTAINER
        ========================== */}

        <div className="blog-details-container">


          {/* ==========================
              MAIN BLOG
          ========================== */}

          <div className="blog-main">


            {/* BLOG IMAGE */}

            {blog.image ? (

              <img
  src={getImageUrl(blog.image)}
  alt={blog.title}
/>

            ) : (

              <div className="blog-details-no-image">

                No Image

              </div>

            )}


            {/* BLOG META */}

            <div className="blog-meta">

              <p>

                Published on

                <span>

                  {blog.createdAt
                    ? new Date(
                        blog.createdAt
                      ).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        }
                      )
                    : "N/A"
                  }

                </span>

              </p>


              <p>

                By

                <span>

                  {blog.author}

                </span>

              </p>

            </div>


            {/* BLOG TITLE */}

            <h1>

              {blog.title}

            </h1>


            {/* BLOG CONTENT */}

            <p className="blog-content">

              {blog.content}

            </p>


            {/* EXTRA INFORMATION */}

            <p className="blog-content">

              Regular vehicle maintenance helps
              improve safety, fuel efficiency,
              and the lifespan of your vehicle.
              Always use genuine spare parts and
              follow the manufacturer's
              recommended service schedule.

            </p>


            <p className="blog-content">

              At AutoParts Connect, we provide
              reliable automotive information to
              help drivers make better maintenance
              decisions and choose the right spare
              parts with confidence.

            </p>


          </div>


          {/* ==========================
              SIDEBAR
          ========================== */}

          <div className="blog-sidebar">


            <h2>
              New Posts
            </h2>


            {recentBlogs.map((item) => (

              <Link
                key={item._id}
                to={`/blog/${item._id}`}
                className="sidebar-post"
              >


                {/* IMAGE */}

                {item.image ? (

                  <img
  src={getImageUrl(item.image)}
  alt={item.title}
/>

                ) : (

                  <div className="sidebar-no-image">

                    No Image

                  </div>

                )}


                {/* TITLE */}

                <div>

                  <h4>
                    {item.title}
                  </h4>

                  <span>
                    {item.category}
                  </span>

                </div>


              </Link>

            ))}


            {recentBlogs.length === 0 && (

              <p>
                No other posts available.
              </p>

            )}


          </div>


        </div>

      </div>


      <Footer />

    </>

  );

}

export default BlogDetailsPage;