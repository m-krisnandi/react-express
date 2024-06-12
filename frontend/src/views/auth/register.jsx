import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState([]);

  // function register
  const register = async (e) => {
    e.preventDefault();

    await api
      .post("/api/v1/register", {
        name: name,
        email: email,
        password: password,
      })
      .then(() => {
        // redirect to login page
        navigate("/login");
      })
      .catch((error) => {
        // assign error to state validation
        setValidation(error.response.data);
      });
  };

  return (
    <div className="row justify-content-center">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <h4>REGISTER</h4>
              <hr />
              {validation.errors && (
                <div className="alert alert-danger mt-2 pb-0">
                  {validation.errors.map((error) => (
                    <p key={error.path}>
                      {error.path}: {error.msg}
                    </p>
                  ))}
                </div>
              )}
              <form onSubmit={register}>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div className="form-group">
                      <label htmlFor="fullName" className="mb-1 fw-bold">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="email" className="mb-1 fw-bold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="password" className="mb-1 fw-bold">Password</label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
