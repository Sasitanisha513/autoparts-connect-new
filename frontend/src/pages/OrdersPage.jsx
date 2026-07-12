import {
  useState,
  useEffect,
  useRef,
} from "react";

import SupplierSidebar from "../components/SupplierSidebar";
import "./OrdersPage.css";

import {
  FaSearch,
  FaBoxOpen,
  FaCalendarAlt,
  FaEllipsisV,
} from "react-icons/fa";

function OrdersPage() {

  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);

  const menuRef = useRef(null);

  useEffect(() => {

    function handleClickOutside(event) {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setActiveMenu(null);
      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  const orders = [

    {
      id: 1,
      orderNo: "PO-2026-001",
      customer: "John Doe",
      part: "Brake Pad",
      qty: 5,
      pickup: "2026-01-10",
      status: "Delivered",
    },

    {
      id: 2,
      orderNo: "PO-2026-002",
      customer: "Jane Smith",
      part: "Engine Oil",
      qty: 2,
      pickup: "2026-01-12",
      status: "Pending",
    },

    {
      id: 3,
      orderNo: "PO-2026-003",
      customer: "Michael Brown",
      part: "Car Battery",
      qty: 1,
      pickup: "2026-01-15",
      status: "Pickup",
    },

    {
      id: 4,
      orderNo: "PO-2026-004",
      customer: "David Wilson",
      part: "Spark Plug",
      qty: 8,
      pickup: "2026-01-18",
      status: "Pending",
    },

    {
      id: 5,
      orderNo: "PO-2026-005",
      customer: "Emily Johnson",
      part: "Radiator",
      qty: 1,
      pickup: "2026-01-20",
      status: "Delivered",
    },

    {
      id: 6,
      orderNo: "PO-2026-006",
      customer: "Chris Martin",
      part: "Oil Filter",
      qty: 3,
      pickup: "2026-01-22",
      status: "Pickup",
    },

    {
      id: 7,
      orderNo: "PO-2026-007",
      customer: "Sarah Lee",
      part: "Air Filter",
      qty: 4,
      pickup: "2026-01-25",
      status: "Pending",
    },

  ];

  const filteredOrders = orders.filter(
    (item) =>
      item.orderNo
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.customer
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.part
        .toLowerCase()
        .includes(search.toLowerCase())
  );
    return (

    <div className="inventory-page">

      <SupplierSidebar />

      <div className="inventory-content">

        <div className="inventory-header">

          <h1>

            <FaBoxOpen className="header-icon" />

            Orders Management

          </h1>

          <p>

            Track and manage customer orders.

          </p>

        </div>

        <div className="inventory-toolbar">

          <div className="inventory-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search Order ID, Customer or Part..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <button className="add-product-btn">

            <FaCalendarAlt />

            From - To

          </button>

        </div>

        <div className="inventory-table">

          <table>

            <thead>

              <tr>

                <th>Order #</th>

                <th>Customer</th>

                <th>Part</th>

                <th>Quantity</th>

                <th>Pickup Date</th>

                <th>Status</th>

                <th></th>

              </tr>

            </thead>

            <tbody>

              {filteredOrders.map((item) => (

                <tr key={item.id}>

                  <td>{item.orderNo}</td>

                  <td>{item.customer}</td>

                  <td>{item.part}</td>

                  <td>{item.qty}</td>

                  <td>{item.pickup}</td>

                  <td>

                    <span
                      className={`status ${item.status
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                    >

                      {item.status}

                    </span>

                  </td>

                  <td>

                    <div
                      className="action-menu"
                      ref={menuRef}
                    >

                      <button
                        className="menu-btn"
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === item.id
                              ? null
                              : item.id
                          )
                        }
                      >

                        <FaEllipsisV />

                      </button>

                      {activeMenu === item.id && (

                        <div className="dropdown-menu">

                          <button
  onClick={() => alert("View Order")}
>
  View Order
</button>

<button
  onClick={() => alert("Marked as Pickup")}
>
  Mark as Pickup
</button>

<button
  onClick={() => alert("Order Delivered")}
>
  Mark as Delivered
</button>
                        </div>

                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default OrdersPage;