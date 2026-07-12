import { useState } from "react";
import { Link } from "react-router-dom";
import "./BlogPage.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { FaSearch } from "react-icons/fa";

import battery from "../assets/images/parts/battery.png";
import brakepad from "../assets/images/parts/breakepad.jpg";
import engineoil from "../assets/images/parts/engineoil.jpg";
import airfilter from "../assets/images/parts/airfilter.jpg";
import headlight from "../assets/images/parts/headlight.jpg";
import radiator from "../assets/images/parts/radiator.jpg";

function BlogPage() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const blogs = [

    {
      id:1,
      image:brakepad,
      category:"Maintenance",
      title:"How to Choose the Right Brake Pads",
      description:"Learn how to choose quality brake pads that improve safety, braking performance and durability."
    },

    {
      id:2,
      image:battery,
      category:"Battery",
      title:"5 Signs Your Car Battery Needs Replacement",
      description:"Find out the warning signs of a weak battery before it leaves you stranded on the road."
    },

    {
      id:3,
      image:engineoil,
      category:"Engine",
      title:"Why Regular Engine Oil Changes Matter",
      description:"Changing engine oil regularly protects your engine and improves fuel efficiency."
    },

    {
      id:4,
      image:airfilter,
      category:"Maintenance",
      title:"How to Replace Your Air Filter",
      description:"A clean air filter keeps your engine healthy and increases fuel economy."
    },

    {
      id:5,
      image:headlight,
      category:"Lighting",
      title:"Choosing the Best Headlights",
      description:"Compare LED, HID and Halogen headlights for safer night driving."
    },

    {
      id:6,
      image:radiator,
      category:"Cooling",
      title:"Radiator Maintenance Tips",
      description:"Simple radiator maintenance tips to prevent engine overheating."
    }

  ];

  const filteredBlogs = blogs.filter((blog)=>{

    return(

      blog.title.toLowerCase().includes(search.toLowerCase()) &&

      (category === "" || blog.category === category)

    );

  });

  return(

    <>
      <Header />

      <section className="blog-page">

        <div className="blog-container">

          <div className="blog-header">

            <h1>AutoParts Connect Blog</h1>

            <p>
              Learn about vehicle maintenance, spare parts and industry updates.
            </p>

          </div>

          <div className="blog-filter">
                      <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >

            <option value="">All Categories</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Battery">Battery</option>
            <option value="Engine">Engine</option>
            <option value="Lighting">Lighting</option>
            <option value="Cooling">Cooling</option>

          </select>

          <div className="blog-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search article..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

        <div className="blog-grid">

          {filteredBlogs.map((blog) => (

            <div
              className="blog-card"
              key={blog.id}
            >

              <img
                src={blog.image}
                alt={blog.title}
              />

              <span className="blog-category">
                {blog.category}
              </span>

              <h3>{blog.title}</h3>

              <p>{blog.description}</p>

              <Link to={`/blog/${blog.id}`}>

                <button>
                  Read More
                </button>

              </Link>

            </div>

          ))}

          {filteredBlogs.length === 0 && (

            <div className="no-blog">

              <h2>No Articles Found</h2>

              <p>
                Try another category or search keyword.
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