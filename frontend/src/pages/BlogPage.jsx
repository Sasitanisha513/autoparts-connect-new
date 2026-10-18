import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BlogPage.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { FaSearch } from "react-icons/fa";

function BlogPage() {

  // ==========================
  // SEARCH & CATEGORY
  // ==========================

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // ==========================
  // BLOG DATA
  // ==========================

  const [blogs, setBlogs] = useState([]);

  // ==========================
  // LOAD BLOGS FROM DATABASE
  // ==========================

  useEffect(() => {

    fetchBlogs();

  }, []);


  const fetchBlogs = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/articles"
      );

      setBlogs(response.data);

    } catch (error) {

      console.error(
        "Error fetching blogs:",
        error
      );

    }

  };


  // ==========================
  // FILTER BLOGS
  // ==========================

  const filteredBlogs = blogs.filter((blog) => {

    return (

      blog.title
        .toLowerCase()
        .includes(search.toLowerCase())

      &&

      (
        category === "" ||
        blog.category === category
      )

    );

  });


  // ==========================
  // PAGE
  // ==========================

  return (

    <>
      
      <Header />


      <section className="blog-page">

        <div className="blog-container">


          {/* ==========================
              PAGE HEADER
          ========================== */}

          <div className="blog-header">

            <h1>
              AutoParts Connect Blog
            </h1>

            <p>
              Learn about vehicle maintenance,
              spare parts and industry updates.
            </p>

          </div>


          {/* ==========================
              FILTER
          ========================== */}

          <div className="blog-filter">


            {/* CATEGORY */}

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >

              <option value="">
                All Categories
              </option>

              <option value="Maintenance">
                Maintenance
              </option>

              <option value="Battery">
                Battery
              </option>

              <option value="Engine">
                Engine
              </option>

              <option value="Lighting">
                Lighting
              </option>

              <option value="Cooling">
                Cooling
              </option>

              <option value="Other">
                Other
              </option>

            </select>


            {/* SEARCH */}

            <div className="blog-search">

              <FaSearch />

              <input
                type="text"
                placeholder="Search article..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


          </div>


          {/* ==========================
              BLOG GRID
          ========================== */}

          <div className="blog-grid">


            {filteredBlogs.map((blog) => (

              <div
                className="blog-card"
                key={blog._id}
              >


                {/* IMAGE */}

                {blog.image ? (
<img
  src={
    blog.image
      ? `http://localhost:5000${blog.image}`
      : "/default-blog-image.jpg"
  }
  alt={blog.title}
/>

                ) : (

                  <div className="blog-no-image">
                    No Image
                  </div>

                )}


                {/* CATEGORY */}

                <span className="blog-category">

                  {blog.category}

                </span>


                {/* TITLE */}

                <h3>
                  {blog.title}
                </h3>


                {/* CONTENT */}

                <p>
                  {blog.content}
                </p>


                {/* READ MORE */}

                <Link
                  to={`/blog/${blog._id}`}
                >

                  <button>
                    Read More
                  </button>

                </Link>


              </div>

            ))}


            {/* ==========================
                NO BLOGS
            ========================== */}

            {filteredBlogs.length === 0 && (

              <div className="no-blog">

                <h2>
                  No Articles Found
                </h2>

                <p>
                  Try another category
                  or search keyword.
                </p>

              </div>

            )}


          </div>


        </div>

      </section>


      <Footer />

    </>

  );

}

export default BlogPage;