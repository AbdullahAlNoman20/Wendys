
import { NavLink, useLoaderData } from 'react-router-dom';

const DeveloperDetails = () => {
    const Developers = useLoaderData()
    return (
        <div>
            Details for {Developers.name}
            <section className=" p-5">
        <div className="card bg-base-100 shadow-xl border h-[400px]">
          <figure className="px-10 pt-10">
            <img src={Developers.photo} alt="Photo" className="rounded-xl h-32 " />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{Developers.name}</h2>
            <p>{Developers.designation}</p>
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

export default DeveloperDetails;