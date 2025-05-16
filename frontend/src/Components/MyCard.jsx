import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const MyCard = () => {
  const { person } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (person) {
      axios
        .get(`http://localhost:5000/order_info/${person.email}`, {
          withCredentials: true,
        })
        .then((res) => {
          setOrders(res.data);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [person]);

  // Handle delete
  const handleDelete = (id) => {
    const proceed = confirm("Are You Sure to DELETE ???");
    if (proceed) {
      fetch(`http://localhost:5000/order_info/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            toast.success("Order Deleted Successfully");
            const remaining = orders.filter((order) => order.id !== id);
            setOrders(remaining);
          } else {
            toast.error("Failed to delete the order");
          }
        });
    }
  };

  if (!person) {
    return <p>Please log in to view your orders.</p>; // Handle unauthenticated state
  }

  return (
    <div>
      <h2 className="">You have {orders.length} Orders</h2>
      {orders.length > 0 ? (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-5 card bg-base-100 shadow-xl border h-[400px]"
            >
              <p>
                <strong>Product ID:</strong> {order.p_id}
              </p>
              <p>
                <strong>Name:</strong> {order.name}
              </p>
              <p>
                <strong>Date:</strong> {order.date}
              </p>
              <p>
                <strong>Email:</strong> {order.email}
              </p>
              <p>
                <strong>Price:</strong> {order.price}
              </p>
              <img
                src={order.photo}
                alt={order.name}
                style={{ width: "100px" }}
              />
              <button
                onClick={() => handleDelete(order.id)}
                className="btn btn-warning m-5"
              >
                Delete Order
              </button>
            </div>
          ))}
        </section>
      ) : (
        <p>No orders found for {person.email}</p>
      )}
    </div>
  );
};

export default MyCard;
