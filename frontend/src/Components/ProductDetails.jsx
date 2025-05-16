import { NavLink, useLoaderData } from "react-router-dom";

const ProductDetails = () => {
    const products = useLoaderData()
    return (
        <div>
            Details for {products.name}
            <section className=" p-5">
        <div className="card bg-base-100 shadow-xl border h-[400px]">
          <figure className="px-10 pt-10">
            <img src={products.photo} alt="Photo" className="rounded-xl h-32 " />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{products.name}</h2>
            <p>{products.description}</p>
            <p>Price: {products.price} $</p>
            <p>Stock Quantity: {products.stock_quantity}</p>
          </div>
          <div className="flex justify-center">
          <NavLink to="/">
          <button className="btn btn-warning m-5"><i className="fa-solid fa-circle-left"></i> Go ot Home</button>
          </NavLink>
          <NavLink to={`/buyNow/${products.p_id}`}>
          <button className="btn btn-warning m-5"><i className="fa-solid fa-bag-shopping"></i> Buy Now</button>
          </NavLink>
          </div>
          
          
        </div>
      </section>
        </div>
    );
};

export default ProductDetails;