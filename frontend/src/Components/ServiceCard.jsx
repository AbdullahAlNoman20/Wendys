import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const {id, name, description, photo } = service;
  return (
    <div className="">
      <section className="p-5">
        <div className="card bg-base-100 shadow-xl border h-[400px]">
          <figure className="px-10 pt-10">
            <img src={photo} alt="photo" className="rounded-xl h-32 " />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{name}</h2>
            <p>{description}</p>
            <div className="card-actions">
              <NavLink to={`/service_details/${service.id}`}>
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

ServiceCard.propTypes = {
  children: PropTypes.object,
};

export default ServiceCard;
