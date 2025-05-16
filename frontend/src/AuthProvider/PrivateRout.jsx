import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRout = ({ children }) => {
  const { person, loading } = useContext(AuthContext);
  const location = useLocation();
// console.log(location.pathname)

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }
  if (person) {
    return children;
  }
  return <Navigate state={location.pathname} replace={true} to="/login"></Navigate>;
};

// Props Validation
// first install this: npm install prop-types
PrivateRout.propTypes = {
  children: PropTypes.object,
};

export default PrivateRout;
