import { NavLink } from "react-router-dom";

const DevelopersCard = ({ developer }) => {
  const {
    id,
    name,
    designation,
    email,
    phonr_number,
    skills,
    experience_year,
    date_of_joining,
    salary,
    photo
  } = developer;

  return (
    <div>
      <section className="p-5">
        <div className="card bg-base-100 shadow-xl border h-[400px]">
          <figure className="px-10 pt-10">
            <img src={photo} alt="photo" className="rounded-xl h-32 " />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{name}</h2>
            <h2 className="card-title">{designation}</h2>
            <p>{email}</p>
            <p>skills: {skills}</p>
            <p>Salary: ${salary}</p>
            <div className="card-actions">
              <NavLink to={`/developers_details/${developer.id}`}>
                <button className="btn btn-outline btn-warning">
                <i className="fa-solid fa-circle-info"></i> View Details
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DevelopersCard;
