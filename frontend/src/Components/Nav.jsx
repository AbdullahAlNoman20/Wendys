import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';


const Nav = () => {
  const { person, logOut } = useContext(AuthContext);

  // Sign Out
  const handleSignOut = () => {
    logOut()
      .then((result) => {
        toast.warn("Logout Successfully");
        // alert("LogOut Successfully");
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navOption = (
    <>
      <NavLink to="/">
        <li>
          <a> <i className="fa-solid fa-house"></i> Home</a>
        </li>
      </NavLink>

      {person && (
        <>
          <NavLink to="/profile">
            <li>
              <a> <i className="fa-solid fa-user"></i>Profile</a>
            </li>
          </NavLink>
        </>
      )}
      <NavLink to="/contact">
        <li>
          <a><i className="fa-solid fa-phone"></i> Contact</a>
        </li>
      </NavLink>
      <NavLink to="/developers">
        <li>
          <a><i className="fa-solid fa-people-group"></i>Developers</a>
        </li>
      </NavLink>
      {person && (
        <>
          <NavLink to="/myCard">
            <li>
              <a> <i className="fa-brands fa-opencart"></i> My Card</a>
            </li>
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div>
      <ToastContainer/>
      <section className="">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {navOption}
              </ul>
            </div>
            <a className="text-3xl font-extrabold">Wendys Khulna</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navOption}</ul>
          </div>
          <div className="p-2 navbar-end">
            {person ? (
              <div className="flex items-center">
                <h1 className="mr-3">{person.email}</h1>
                <NavLink to="/login">
                  <button
                    onClick={handleSignOut}
                    className="btn btn-outline btn-warning"
                  >
                   LogOut<i className="fa-solid fa-arrow-right-from-bracket"></i> 
                  </button>
                </NavLink>
              </div>
            ) : (
              <NavLink to="/login">
                <a className="btn btn-outline btn-warning"><i className="fa-solid fa-arrow-right-from-bracket"></i> Login</a>
              </NavLink>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nav;
