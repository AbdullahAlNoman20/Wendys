import { Navigate, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const Register = () => {
  const { createPerson } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state || '/'

  // Event Handler
  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const email = form.email.value;
    const number = form.number.value;
    const password = form.password.value;

    const newUser = { username, email, number, password };
    // console.log(newUser);

    // Create Person in FireBase
    createPerson(email, password)
      .then((result) => {
        form.reset();
        toast.success("Registered Successfully");
        Navigate(from , {replace:true})
        // console.log(result.person);
        // Get Access Token
        const person = { email };
        axios
          .post('http://localhost:5000/jwt', person, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
            if (res.data.success) {
              Navigate(location?.state ? location?.state : "/");
            }
          });
      })
      .catch((error) => {
        console.error(error);
      });

      // Send Data to the Server
     await fetch("http://localhost:5000/register_user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((req) => req.json())
        .then((data) => {
      form.reset()
          console.log(data);
        });
  };

  return (
    <div>
      <ToastContainer/>
      <section className="flex justify-center p-5">
        <div className="border w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800">
          <h1 className="text-2xl font-bold text-center">Register Now</h1>
          <form
            onSubmit={handleRegister}
            noValidate=""
            action=""
            className="space-y-6"
          >
            <div className="space-y-1 text-sm">
              <label htmlFor="username" className="block dark:text-gray-600">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="border w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="noman@gmail.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="username" className="block dark:text-gray-600">
                Phone Number
              </label>
              <input
                type="text"
                name="number"
                id="phone_number"
                placeholder="Phone Number"
                className="border w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="password" className="block dark:text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="border w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
              <div className="flex justify-end text-xs dark:text-gray-600">
                <a
                  className="text-red-500 underline"
                  rel="noopener noreferrer"
                  href="#"
                >
                  ! Rules
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600"
            >
              Register Now <i className="fa-regular fa-registered"></i>
            </button>
          </form>

          <p className="text-xs text-center sm:px-6 dark:text-gray-600">
            Already have an account?
            <NavLink to="/login">
              <a
                rel="noopener noreferrer"
                href="#"
                className="ml-2 text-sky-500 underline"
              >
                Sign in
              </a>
            </NavLink>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Register;
