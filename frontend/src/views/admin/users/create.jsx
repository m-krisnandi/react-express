import { useState } from "react";
import SidebarMenu from "../../../components/SidebarMenu";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../../services/api";

const token = Cookies.get("token");

export default function UsersCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState([]);

  const storeUser = async (e) => {
    e.preventDefault();

    api.defaults.headers.common["Authorization"] = token;
    await api
      .post("api/v1/admin/users", {
        name: name,
        email: email,
        password: password,
      })
      .then(() => {
        navigate("/admin/users");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>

        <div className="col-md-9">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-header">ADD USER</div>
            <div className="card-body">
              {validation.errors && (
                <div className="alert alert-danger mt-2 pb-0">
                  {validation.errors.map((error) => (
                    <p key={error.path}>
                      {error.path}: {error.msg}
                    </p>
                  ))}
                </div>
              )}
              <form onSubmit={storeUser}>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="mb-1 fw-bold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Full Name"
                  />
                </div>

                <div className="form-group mb-3">
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

                <div className="form-group mb-3">
                  <label htmlFor="password" className="mb-1 fw-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Password"
                  />
                </div>

                <button type="submit" className="btn btn-sm btn-primary">
                  SAVE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
