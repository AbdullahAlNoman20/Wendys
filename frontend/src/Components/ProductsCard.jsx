import { NavLink } from "react-router-dom";

const ProductsCard = ({product}) => {
    const {p_id, name, description, photo , price, stock_quantity} = product;
    return (
        <div>
            <section className="p-5">
        <div className="card bg-base-100 shadow-xl border h-[400px]">
          <figure className="px-10 pt-10">
            <img src={photo} alt="photo" className="rounded-xl h-32 " />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{name}</h2>
            <p>{description}</p>
            <p>Price: {price}$</p>
            <p>Stock Quantity: {stock_quantity}</p>
            <div className="card-actions">
              <NavLink to={`/product_details/${product.p_id}`}>
                <button className="btn btn-outline btn-warning">
                <i className="fa-solid fa-circle-info"></i>View Details
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default ProductsCard;