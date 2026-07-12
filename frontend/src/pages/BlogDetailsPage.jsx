import { Link, useParams } from "react-router-dom";
import "./BlogDetailsPage.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import battery from "../assets/images/parts/battery.png";
import brakepad from "../assets/images/parts/breakepad.jpg";
import engineoil from "../assets/images/parts/engineoil.jpg";
import airfilter from "../assets/images/parts/airfilter.jpg";
import headlight from "../assets/images/parts/headlight.jpg";
import radiator from "../assets/images/parts/radiator.jpg";

function BlogDetailsPage() {

  const { id } = useParams();

  const blogs = [

    {
      id:1,
      image:brakepad,
      category:"Maintenance",
      title:"How to Choose the Right Brake Pads",
      date:"January 10, 2026",
      author:"AutoParts Connect Team",
      content:
      "Choosing the right brake pads is essential for safe driving and reliable braking performance. Premium brake pads provide better stopping power, reduce brake dust, and last longer than low-quality alternatives. Always select brake pads that match your vehicle model and driving conditions. Regular inspection and timely replacement will improve safety and extend the life of your braking system."
    },

    {
      id:2,
      image:battery,
      category:"Battery",
      title:"5 Signs Your Car Battery Needs Replacement",
      date:"January 18, 2026",
      author:"AutoParts Connect Team",
      content:
      "A weak battery can leave you stranded without warning. Slow engine cranking, dim headlights, dashboard battery warnings, and electrical problems are common signs of battery failure. Replacing the battery before it completely fails helps prevent unexpected breakdowns."
    },

    {
      id:3,
      image:engineoil,
      category:"Engine",
      title:"Why Regular Engine Oil Changes Matter",
      date:"February 02, 2026",
      author:"AutoParts Connect Team",
      content:
      "Engine oil lubricates moving parts, reduces wear, and keeps the engine cool. Changing oil at recommended intervals improves fuel efficiency, protects engine components, and increases engine lifespan."
    },

    {
      id:4,
      image:airfilter,
      category:"Maintenance",
      title:"How to Replace Your Air Filter",
      date:"February 14, 2026",
      author:"AutoParts Connect Team",
      content:
      "Replacing an air filter is one of the easiest maintenance tasks. A clean air filter improves airflow, engine performance, and fuel economy while protecting the engine from dirt and debris."
    },

    {
      id:5,
      image:headlight,
      category:"Lighting",
      title:"Choosing the Best Headlights",
      date:"March 05, 2026",
      author:"AutoParts Connect Team",
      content:
      "LED headlights offer excellent brightness and energy efficiency, while halogen lights are affordable and easy to replace. Choosing the right headlight improves visibility and driving safety."
    },

    {
      id:6,
      image:radiator,
      category:"Cooling",
      title:"Radiator Maintenance Tips",
      date:"March 20, 2026",
      author:"AutoParts Connect Team",
      content:
      "Regular radiator maintenance prevents overheating and costly engine damage. Always check coolant levels, inspect hoses, and clean the radiator to maintain proper cooling performance."
    }

  ];

  const blog = blogs.find((item)=>item.id===Number(id));

  if(!blog){

    return(

      <>
        <Header />

        <div className="blog-details-page">

          <h2>Article Not Found</h2>

          <Link to="/blog">
            Back to Blog
          </Link>

        </div>

        <Footer />

      </>

    );

  }

  return(

    <>

      <Header />

      <div className="blog-details-page">
                <div className="blog-breadcrumb">

          <Link to="/">Home</Link>

          <span>›</span>

          <Link to="/blog">Blog</Link>

          <span>›</span>

          <span>{blog.category}</span>

          <span>›</span>

          <span>{blog.title}</span>

        </div>

        <div className="blog-details-container">

          <div className="blog-main">

            <img
              src={blog.image}
              alt={blog.title}
            />

            <div className="blog-meta">

              <p>
                Published on
                <span> {blog.date}</span>
              </p>

              <p>
                By
                <span> {blog.author}</span>
              </p>

            </div>

            <h1>{blog.title}</h1>

            <p className="blog-content">
              {blog.content}
            </p>

            <p className="blog-content">
              Regular vehicle maintenance helps improve safety,
              fuel efficiency, and the lifespan of your vehicle.
              Always use genuine spare parts and follow the
              manufacturer's recommended service schedule.
            </p>

            <p className="blog-content">
              At AutoParts Connect, we provide reliable
              automotive information to help drivers make
              better maintenance decisions and choose the
              right spare parts with confidence.
            </p>

          </div>

          <div className="blog-sidebar">

            <h2>New Posts</h2>

            {blogs
              .filter((item) => item.id !== blog.id)
              .slice(0, 4)
              .map((item) => (

                <Link
                  key={item.id}
                  to={`/blog/${item.id}`}
                  className="sidebar-post"
                >

                  <img
                    src={item.image}
                    alt={item.title}
                  />

                  <div>

                    <h4>{item.title}</h4>

                    <span>{item.category}</span>

                  </div>

                </Link>

            ))}

          </div>

        </div>

      </div>

      <Footer />

    </>

  );

}

export default BlogDetailsPage;