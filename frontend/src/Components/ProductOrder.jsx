import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const ProductOrder = () => {
  const products = useLoaderData();
  const { p_id, photo } = products;
  const { person } = useContext(AuthContext);

  //   Handle Conform Order
  const handleOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = form.email.value;
    const price = form.price.value;

    const order = {
      name,
      date,
      email,
      price,
      p_id,
      photo,
    };
    // console.log(order);

    fetch("http://localhost:5000/order_info", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((req) => req.json())
      .then((data) => {
        // console.log(data);
        if (data.insertedId) {
            toast.success("Ordered Successfully");
          } else {
            toast.error("Order Failed");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Something went wrong");
        });
  };
  return (
    <div>
      {/* Form Section */}
      <section>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">
                You are Buying {products.name}
              </h1>
              <p className="py-6">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Distinctio nam magni facere odio adipisci sapiente eius, quas
                temporibus quos culpa sed? Necessitatibus maxime atque quo
                placeat est ipsum nulla quidem.
              </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form onSubmit={handleOrder} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    name="name"
                    defaultValue={person.displayName}
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>
                  <input
                    name="date"
                    type="date"
                    placeholder="Date"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    name="email"
                    defaultValue={person.email}
                    type="email"
                    placeholder="noman@gmail.com"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Product Price</span>
                  </label>
                  <input
                    name="price"
                    defaultValue={products.price}
                    type="price"
                    placeholder="$"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-warning">
                    Conform Order <i className="fa-solid fa-bag-shopping"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductOrder;
