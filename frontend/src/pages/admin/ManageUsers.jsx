import "./ManageUsers.css";
import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaPlus } from "react-icons/fa";

const userData = [
  {
    id: 1,
    userId: "U-2026",
    name: "John Doe",
    email: "john@gmail.com",
    joined: "2026-01-10",
    status: "Active",
  },
  {
    id: 2,
    userId: "U-2027",
    name: "Emma Watson",
    email: "emma@gmail.com",
    joined: "2026-02-15",
    status: "Active",
  },
  {
    id: 3,
    userId: "U-2028",
    name: "Michael Lee",
    email: "michael@gmail.com",
    joined: "2026-03-01",
    status: "Suspend",
  },
  {
    id: 4,
    userId: "U-2029",
    name: "Sarah Smith",
    email: "sarah@gmail.com",
    joined: "2026-03-12",
    status: "Active",
  },
  {
    id: 5,
    userId: "U-2030",
    name: "David Brown",
    email: "david@gmail.com",
    joined: "2026-04-02",
    status: "Suspend",
  },
];

function ManageUsers() {

  const [users, setUsers] = useState(userData);
  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const [newUser, setNewUser] = useState({
    userId: "",
    name: "",
    email: "",
    joined: "",
    status: "Active",
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.userId.toLowerCase().includes(search.toLowerCase())
  );

  const viewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditUser({ ...user });
    setShowEditModal(true);
  };

  const saveUser = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editUser.id ? editUser : u
      )
    );

    setShowEditModal(false);
  };

  const openDeleteModal = (id) => {
    setDeleteUserId(id);
    setShowDeleteModal(true);
  };

  const deleteUser = () => {
    setUsers((prev) =>
      prev.filter((u) => u.id !== deleteUserId)
    );

    setShowDeleteModal(false);
  };

  const addUser = () => {

    const user = {
      id: Date.now(),
      ...newUser,
    };

    setUsers((prev) => [...prev, user]);

    setNewUser({
      userId: "",
      name: "",
      email: "",
      joined: "",
      status: "Active",
    });

    setShowAddModal(false);
  };
    return (

    <div className="manage-users">

      <AdminSidebar />

      <div className="users-content">

        <div className="users-header">

          <div>

            <h1>User Account Management</h1>

            <p>
              View and manage customer and vendor accounts registered on the platform.
            </p>

          </div>

        </div>

        <div className="users-toolbar">

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="add-user-btn"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus />
            Add User
          </button>

        </div>

        <table className="users-table">

          <thead>

            <tr>

              <th>User ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Joined Date</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr key={user.id}>

                <td>{user.userId}</td>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.joined}</td>

                <td>{user.status}</td>

                <td className="action-buttons">

                  <button
                    className="view-btn"
                    onClick={() => viewUser(user)}
                  >
                    View
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() => openEditModal(user)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => openDeleteModal(user.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
        {/* ================= VIEW USER MODAL ================= */}

{showModal && selectedUser && (

  <div
    className="vehicle-modal-overlay"
    onClick={() => setShowModal(false)}
  >

    <div
      className="vehicle-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <h2>User Details</h2>

      <p>
        <strong>User ID :</strong> {selectedUser.userId}
      </p>

      <p>
        <strong>Name :</strong> {selectedUser.name}
      </p>

      <p>
        <strong>Email :</strong> {selectedUser.email}
      </p>

      <p>
        <strong>Joined Date :</strong> {selectedUser.joined}
      </p>

      <p>
        <strong>Status :</strong> {selectedUser.status}
      </p>

      <button
        className="close-modal-btn"
        onClick={() => setShowModal(false)}
      >
        Close
      </button>

    </div>

  </div>

)}

{/* ================= EDIT USER MODAL ================= */}

{showEditModal && editUser && (

  <div
    className="vehicle-modal-overlay"
    onClick={() => setShowEditModal(false)}
  >

    <div
      className="vehicle-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <h2>Edit User</h2>

      <input
        type="text"
        value={editUser.userId}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            userId: e.target.value,
          })
        }
      />

      <input
        type="text"
        value={editUser.name}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            name: e.target.value,
          })
        }
      />

      <input
        type="email"
        value={editUser.email}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            email: e.target.value,
          })
        }
      />

      <input
        type="date"
        value={editUser.joined}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            joined: e.target.value,
          })
        }
      />

      <select
        value={editUser.status}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            status: e.target.value,
          })
        }
      >
        <option value="Active">Active</option>
        <option value="Suspend">Suspend</option>
      </select>

      <div className="edit-buttons">

        <button
          className="save-btn"
          onClick={saveUser}
        >
          Save
        </button>

        <button
          className="cancel-btn"
          onClick={() => setShowEditModal(false)}
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}
{/* ================= DELETE USER MODAL ================= */}

{showDeleteModal && (

  <div
    className="vehicle-modal-overlay"
    onClick={() => setShowDeleteModal(false)}
  >

    <div
      className="vehicle-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <h2>Delete User</h2>

      <p>Are you sure you want to delete this user?</p>

      <div className="edit-buttons">

        <button
          className="delete-confirm-btn"
          onClick={deleteUser}
        >
          Yes, Delete
        </button>

        <button
          className="cancel-btn"
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}
{/* ================= ADD USER MODAL ================= */}

{showAddModal && (

  <div
    className="vehicle-modal-overlay"
    onClick={() => setShowAddModal(false)}
  >

    <div
      className="vehicle-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <h2>Add User</h2>

      <input
        type="text"
        placeholder="User ID"
        value={newUser.userId}
        onChange={(e) =>
          setNewUser({
            ...newUser,
            userId: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) =>
          setNewUser({
            ...newUser,
            name: e.target.value,
          })
        }
      />

      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) =>
          setNewUser({
            ...newUser,
            email: e.target.value,
          })
        }
      />

      <input
        type="date"
        value={newUser.joined}
        onChange={(e) =>
          setNewUser({
            ...newUser,
            joined: e.target.value,
          })
        }
      />

      <select
        value={newUser.status}
        onChange={(e) =>
          setNewUser({
            ...newUser,
            status: e.target.value,
          })
        }
      >
        <option value="Active">Active</option>
        <option value="Suspend">Suspend</option>
      </select>

      <div className="edit-buttons">

        <button
          className="save-btn"
          onClick={addUser}
        >
          Add User
        </button>

        <button
          className="cancel-btn"
          onClick={() => setShowAddModal(false)}
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}
      </div>

    </div>

  );

}

export default ManageUsers;