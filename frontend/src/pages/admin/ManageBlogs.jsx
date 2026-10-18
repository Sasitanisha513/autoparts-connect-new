import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/admin/AdminSidebar";
import "./ManageBlogs.css";

const API_URL = "http://localhost:5000";

function ManageBlogs() {

  // =====================================================
  // BLOG DATA
  // =====================================================

  const [blogs, setBlogs] = useState([]);

  // =====================================================
  // SEARCH
  // =====================================================

  const [search, setSearch] = useState("");

  // =====================================================
  // ADD BLOG MODAL
  // =====================================================

  const [showAddModal, setShowAddModal] = useState(false);

  // =====================================================
  // VIEW BLOG MODAL
  // =====================================================

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteBlogId, setDeleteBlogId] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);

  // =====================================================
  // EDIT BLOG MODAL
  // =====================================================

  const [showEditModal, setShowEditModal] = useState(false);

  const [editBlog, setEditBlog] = useState({
    id: null,
    title: "",
    category: "",
    description: "",
    image: null,
    currentImage: ""
  });

  // =====================================================
  // NEW BLOG
  // =====================================================

  const [newBlog, setNewBlog] = useState({
    title: "",
    category: "",
    description: "",
    image: null
  });

  // =====================================================
  // LOAD BLOGS
  // =====================================================

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/articles`
      );

      setBlogs(response.data);

    } catch (error) {
      console.error(
        "Error loading blogs:",
        error
      );
    }
  };

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (image) => {

    if (!image) {
      return "";
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `${API_URL}${image}`;
  };

  // =====================================================
  // ADD BLOG
  // =====================================================

  const handleAddBlog = async (event) => {

    event.preventDefault();

    if (
      !newBlog.title.trim() ||
      !newBlog.category ||
      !newBlog.description.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {

      const formData = new FormData();

      formData.append(
        "title",
        newBlog.title.trim()
      );

      formData.append(
        "content",
        newBlog.description.trim()
      );

      formData.append(
        "author",
        "AutoParts Connect"
      );

      formData.append(
        "category",
        newBlog.category
      );

      if (newBlog.image) {
        formData.append(
          "image",
          newBlog.image
        );
      }

      await axios.post(
        `${API_URL}/api/articles/add`,
        formData
      );

      // Reset form
      setNewBlog({
        title: "",
        category: "",
        description: "",
        image: null
      });

      // Close modal
     setShowAddModal(false);

await fetchBlogs();

setSuccessMessage("Blog added successfully.");

setTimeout(() => {
  setSuccessMessage("");
}, 2500);

    } catch (error) {

      console.error(
        "Error adding blog:",
        error
      );

      alert(
        error.response?.data?.error ||
        "Failed to add blog."
      );
    }
  };

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const handleEdit = (blog) => {

    setEditBlog({
      id: blog._id,
      title: blog.title || "",
      category: blog.category || "",
      description: blog.content || "",
      image: null,
      currentImage: blog.image || ""
    });

    setShowEditModal(true);
  };

  // =====================================================
  // UPDATE BLOG
  // =====================================================

  const handleUpdateBlog = async (event) => {

    event.preventDefault();

    if (
      !editBlog.title.trim() ||
      !editBlog.category ||
      !editBlog.description.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {

      const formData = new FormData();

      formData.append(
        "title",
        editBlog.title.trim()
      );

      formData.append(
        "content",
        editBlog.description.trim()
      );

      formData.append(
        "category",
        editBlog.category
      );

      if (editBlog.image) {
        formData.append(
          "image",
          editBlog.image
        );
      }

      await axios.put(
        `${API_URL}/api/articles/${editBlog.id}`,
        formData
      );

      // Close modal
      setShowEditModal(false);

      // Reset edit form
      setEditBlog({
        id: null,
        title: "",
        category: "",
        description: "",
        image: null,
        currentImage: ""
      });

      // Reload blogs
      await fetchBlogs();

setSuccessMessage("Blog updated successfully.");

setTimeout(() => {
  setSuccessMessage("");
}, 2500);
    } catch (error) {

      console.error(
        "Error updating blog:",
        error
      );

      alert(
        error.response?.data?.error ||
        "Failed to update blog."
      );
    }
  };

  // =====================================================
  // VIEW BLOG
  // =====================================================

  const handleView = (blog) => {

    setSelectedBlog(blog);

    setShowViewModal(true);
  };

 // =====================================================
// OPEN DELETE CONFIRMATION
// =====================================================

const handleDelete = (id) => {

  setDeleteBlogId(id);

  setShowDeleteModal(true);

};


// =====================================================
// CONFIRM DELETE
// =====================================================

const confirmDeleteBlog = async () => {

  try {

    await axios.delete(
      `${API_URL}/api/articles/${deleteBlogId}`
    );

    setShowDeleteModal(false);

    setDeleteBlogId(null);

    await fetchBlogs();

    setSuccessMessage(
      "Blog deleted successfully."
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);

  } catch (error) {

    console.error(
      "Error deleting blog:",
      error
    );

    setShowDeleteModal(false);

    setDeleteBlogId(null);

    alert(
      error.response?.data?.error ||
      "Failed to delete blog."
    );

  }

};
  // =====================================================
  // SEARCH FILTER
  // =====================================================

  const filteredBlogs = blogs.filter((blog) => {

    const searchText =
      search.toLowerCase().trim();

    return (
      (blog.title || "")
        .toLowerCase()
        .includes(searchText) ||

      (blog.category || "")
        .toLowerCase()
        .includes(searchText) ||

      (blog.content || "")
        .toLowerCase()
        .includes(searchText)
    );
  });

  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div className="manage-blogs">
{successMessage && (
  <div className="success-popup-overlay">

    <div className="success-popup">

      <div className="success-icon">
        ✓
      </div>

      <h3>
        {successMessage}
      </h3>

    </div>

  </div>
)}
      <AdminSidebar />

      <div className="blogs-content">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="blogs-header">

          <div>

            <h1>
              Manage Blogs
            </h1>

            <p>
              Create, update and manage
              website blog articles.
            </p>

          </div>

          <button
            type="button"
            className="add-blog-btn"
            onClick={() =>
              setShowAddModal(true)
            }
          >
            + Add Blog
          </button>

        </div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="blogs-toolbar">

          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

        {/* =================================================
            BLOG TABLE
        ================================================= */}

        <div className="blogs-table-wrapper">

          <table className="blogs-table">

            <thead>

              <tr>

                <th>
                  Image
                </th>

                <th>
                  Blog Title
                </th>

                <th>
                  Category
                </th>

                <th>
                  Description
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredBlogs.map((blog) => (

                <tr
                  key={blog._id}
                >

                  {/* IMAGE */}

                  <td>

                    {blog.image ? (

                      <img
                        src={getImageUrl(blog.image)}
                        alt={blog.title}
                        className="blog-admin-image"
                      />

                    ) : (

                      <div className="blog-no-image">
                        No Image
                      </div>

                    )}

                  </td>

                  {/* TITLE */}

                  <td>

                    <strong>
                      {blog.title}
                    </strong>

                  </td>

                  {/* CATEGORY */}

                  <td>

                    <span
                      className="blog-admin-category"
                    >
                      {blog.category}
                    </span>

                  </td>

                  {/* DESCRIPTION */}

                  <td>

                    <p
                      className="blog-admin-description"
                    >
                      {blog.content}
                    </p>

                  </td>

                  {/* ACTIONS */}

                  <td>

                    <div
                      className="blog-actions"
                    >

                      <button
                        type="button"
                        className="blog-view-btn"
                        onClick={() =>
                          handleView(blog)
                        }
                      >
                        View
                      </button>

                      <button
                        type="button"
                        className="blog-edit-btn"
                        onClick={() =>
                          handleEdit(blog)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="blog-delete-btn"
                        onClick={() =>
                          handleDelete(blog._id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {/* =================================================
              NO RESULTS
          ================================================= */}

          {filteredBlogs.length === 0 && (

            <div className="no-blogs">

              <h3>
                No Blogs Found
              </h3>

              <p>
                Try another search keyword.
              </p>

            </div>

          )}

        </div>

        {/* =================================================
            ADD BLOG MODAL
        ================================================= */}

        {showAddModal && (

          <div
            className="blog-modal-overlay"
            onClick={() =>
              setShowAddModal(false)
            }
          >

            <div
              className="blog-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* HEADER */}

              <div className="blog-modal-header">

                <div>

                  <h2>
                    Add New Blog
                  </h2>

                  <p>
                    Create a new article
                    for the website.
                  </p>

                </div>

                <button
                  type="button"
                  className="blog-modal-close"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                >
                  ×
                </button>

              </div>

              {/* FORM */}

              <form
                onSubmit={handleAddBlog}
              >

                {/* TITLE */}

                <div className="blog-form-group">

                  <label>
                    Blog Title
                  </label>

                  <input
                    type="text"
                    placeholder="Enter blog title"
                    value={newBlog.title}
                    onChange={(event) =>
                      setNewBlog({
                        ...newBlog,
                        title:
                          event.target.value
                      })
                    }
                  />

                </div>

                {/* CATEGORY */}

                <div className="blog-form-group">

                  <label>
                    Category
                  </label>

                  <select
                    value={newBlog.category}
                    onChange={(event) =>
                      setNewBlog({
                        ...newBlog,
                        category:
                          event.target.value
                      })
                    }
                  >

                    <option value="">
                      Select Category
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

                </div>

                {/* DESCRIPTION */}

                <div className="blog-form-group">

                  <label>
                    Description
                  </label>

                  <textarea
                    rows="5"
                    placeholder="Enter blog description"
                    value={newBlog.description}
                    onChange={(event) =>
                      setNewBlog({
                        ...newBlog,
                        description:
                          event.target.value
                      })
                    }
                  />

                </div>

                {/* IMAGE */}

                <div className="blog-form-group">

                  <label>
                    Blog Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      setNewBlog({
                        ...newBlog,
                        image:
                          event.target.files[0] ||
                          null
                      })
                    }
                  />

                </div>

                {/* BUTTONS */}

                <div className="blog-modal-actions">

                  <button
                    type="button"
                    className="blog-cancel-btn"
                    onClick={() =>
                      setShowAddModal(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="blog-save-btn"
                  >
                    Save Blog
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

        {/* =================================================
            EDIT BLOG MODAL
        ================================================= */}

        {showEditModal && (

          <div
            className="blog-modal-overlay"
            onClick={() =>
              setShowEditModal(false)
            }
          >

            <div
              className="blog-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* HEADER */}

              <div className="blog-modal-header">

                <div>

                  <h2>
                    Edit Blog
                  </h2>

                  <p>
                    Update the blog article details.
                  </p>

                </div>

                <button
                  type="button"
                  className="blog-modal-close"
                  onClick={() =>
                    setShowEditModal(false)
                  }
                >
                  ×
                </button>

              </div>

              {/* FORM */}

              <form
                onSubmit={handleUpdateBlog}
              >

                {/* TITLE */}

                <div className="blog-form-group">

                  <label>
                    Blog Title
                  </label>

                  <input
                    type="text"
                    value={editBlog.title}
                    onChange={(event) =>
                      setEditBlog({
                        ...editBlog,
                        title:
                          event.target.value
                      })
                    }
                  />

                </div>

                {/* CATEGORY */}

                <div className="blog-form-group">

                  <label>
                    Category
                  </label>

                  <select
                    value={editBlog.category}
                    onChange={(event) =>
                      setEditBlog({
                        ...editBlog,
                        category:
                          event.target.value
                      })
                    }
                  >

                    <option value="">
                      Select Category
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

                </div>

                {/* DESCRIPTION */}

                <div className="blog-form-group">

                  <label>
                    Description
                  </label>

                  <textarea
                    rows="5"
                    value={editBlog.description}
                    onChange={(event) =>
                      setEditBlog({
                        ...editBlog,
                        description:
                          event.target.value
                      })
                    }
                  />

                </div>

                {/* CURRENT IMAGE */}

                {editBlog.currentImage && (

                  <div className="blog-current-image">

                    <label>
                      Current Image
                    </label>

                    <img
                      src={getImageUrl(
                        editBlog.currentImage
                      )}
                      alt="Current blog"
                    />

                  </div>

                )}

                {/* NEW IMAGE */}

                <div className="blog-form-group">

                  <label>
                    Replace Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      setEditBlog({
                        ...editBlog,
                        image:
                          event.target.files[0] ||
                          null
                      })
                    }
                  />

                </div>

                {/* BUTTONS */}

                <div className="blog-modal-actions">

                  <button
                    type="button"
                    className="blog-cancel-btn"
                    onClick={() =>
                      setShowEditModal(false)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="blog-save-btn"
                  >
                    Save Changes
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

        {/* =================================================
            VIEW BLOG MODAL
        ================================================= */}

        {showViewModal && selectedBlog && (

          <div
            className="blog-modal-overlay"
            onClick={() =>
              setShowViewModal(false)
            }
          >

            <div
              className="blog-view-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* HEADER */}

              <div className="blog-view-header">

                <div>

                  <span className="blog-view-label">
                    BLOG ARTICLE
                  </span>

                  <h2>
                    {selectedBlog.title}
                  </h2>

                </div>

                <button
                  type="button"
                  className="blog-modal-close"
                  onClick={() =>
                    setShowViewModal(false)
                  }
                >
                  ×
                </button>

              </div>

              {/* IMAGE */}

              {selectedBlog.image ? (

                <img
                  src={getImageUrl(
                    selectedBlog.image
                  )}
                  alt={selectedBlog.title}
                  className="blog-view-image"
                />

              ) : (

                <div className="blog-no-image">
                  No Image
                </div>

              )}

              {/* CATEGORY */}

              <div className="blog-view-category">

                {selectedBlog.category}

              </div>

              {/* DESCRIPTION */}

              <div className="blog-view-description">

                <h3>
                  Description
                </h3>

                <p>
                  {selectedBlog.content}
                </p>

              </div>

              {/* AUTHOR */}

              <div className="blog-view-description">

                <h3>
                  Author
                </h3>

                <p>
                  {selectedBlog.author ||
                    "AutoParts Connect"}
                </p>

              </div>

              {/* DATE */}

              <div className="blog-view-description">

                <h3>
                  Published
                </h3>

                <p>
                  {selectedBlog.createdAt
                    ? new Date(
                        selectedBlog.createdAt
                      ).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        }
                      )
                    : "N/A"}
                </p>

              </div>

              {/* CLOSE */}

              <div className="blog-view-footer">

                <button
                  type="button"
                  className="blog-view-close-btn"
                  onClick={() =>
                    setShowViewModal(false)
                  }
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        )}
{/* =====================================================
    DELETE CONFIRMATION MODAL
===================================================== */}

{showDeleteModal && (

  <div
    className="delete-popup-overlay"
    onClick={() => {
      setShowDeleteModal(false);
      setDeleteBlogId(null);
    }}
  >

    <div
      className="delete-popup"
      onClick={(event) =>
        event.stopPropagation()
      }
    >

      <div className="delete-icon">
        !
      </div>

      <h3>
        Delete Blog?
      </h3>

      <p>
        Are you sure you want to delete this blog?
        This action cannot be undone.
      </p>

      <div className="delete-popup-actions">

        <button
          type="button"
          className="delete-cancel-btn"
          onClick={() => {
            setShowDeleteModal(false);
            setDeleteBlogId(null);
          }}
        >
          Cancel
        </button>

        <button
          type="button"
          className="delete-confirm-btn"
          onClick={confirmDeleteBlog}
        >
          Delete
        </button>

      </div>

    </div>

  </div>

)}
      </div>

    </div>
  );
}

export default ManageBlogs;