import {useLoaderData, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

const ServiceDetails = () => {

    const services = useLoaderData()
    const {id} = useParams()
    const idInt = parseInt(id);
    const service = services.find(service=>service.id===idInt)
    // console.log(service)
    
    return (
        <div>
          <section className=" p-5">
        <div className="card bg-base-100 shadow-xl border h-[400px]">
          <figure className="px-10 pt-10">
            <img src={service.photo} alt="Photo" className="rounded-xl h-32 " />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{service.name}</h2>
            <p>{service.description}</p>
          </div>
          <div className="flex justify-center">
          <NavLink to="/">
          <button className="btn btn-warning m-5"><i className="fa-solid fa-circle-left"></i> Go ot Home</button>
          </NavLink>
          </div>
          
          
        </div>
      </section>
        </div>
    );
};

export default ServiceDetails;