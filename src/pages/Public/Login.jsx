import React from "react";
import { Form } from "react-bootstrap";
import { Show_Toast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../services/Context";
import { useContext } from "react";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { ApiCall } from "../../services/Api";
import { loginURL } from "../../services/Base_url";

function Login() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [log_data, setlog_data] = useState({});
  const { check_Validation, setUser, user } = useContext(ContextData);

  //--------Login-----
  const Login = async () => {
    try {
      let res = await ApiCall("post", loginURL, log_data);
      if (res.status) {
        setUser(jwtDecode(res?.data?.token));
        localStorage.setItem("User", res?.data?.token);
        Show_Toast("Login Successfull", true);
        return navigate("/");
      } else {
        console.log("invalid user");
      }
    } catch (error) {
      Show_Toast(error.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-xl-3">
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">Welcome Back !</h5>
                        <h2 className="text" style={{ color: "#edac13" }}>
                          <b>Sign in to continue your account</b>
                        </h2>
                      </div>
                      <div className="mt-4">
                        <Form
                          noValidate
                          validated={validated}
                          className="form-horizontal"
                          onSubmit={(event) => {
                            event.preventDefault();
                            check_Validation(event, Login, setValidated);
                          }}
                        >
                          <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                              Email
                            </label>
                            <input
                              required
                              type="text"
                              className="form-control"
                              id="email"
                              placeholder="Enter email"
                              value={log_data?.email}
                              onChange={(e) =>
                                setlog_data({
                                  ...log_data,
                                  email: e.target.value,
                                })
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide email
                            </Form.Control.Feedback>
                          </div>
                          <div className="mb-3">
                            <div className="float-end">
                              <a href={undefined} className="text-muted">
                                Forgot password?
                              </a>
                            </div>
                            <label className="form-label">Password</label>
                            <div className="input-group auth-pass-inputgroup">
                              <input
                                required
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                aria-label="Password"
                                aria-describedby="password-addon"
                                value={log_data?.password}
                                onChange={(e) =>
                                  setlog_data({
                                    ...log_data,
                                    password: e.target.value,
                                  })
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                Please provide email
                              </Form.Control.Feedback>
                            </div>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="remember-check"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="remember-check"
                            >
                              Remember me
                            </label>
                          </div>
                          <div className="mt-4 text-center">
                            <button
                              type="submit"
                              style={{
                                width: "250px",
                                height: "50px",
                                padding: "10px 15px",
                                borderRadius: "43.68px",
                                border: "2px solid #fff",
                                backgroundColor: "#edac13",
                                color: "#fff",
                                fontSize: "16px",
                                cursor: "pointer",
                              }}
                            >
                              Sign in
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9" style={{ backgroundColor: "#003F62" }}>
              <div className="pt-lg-5 p-4">
                <div className="w-100">
                  <div className="" style={{ backgroundColor: "#003F62" }} />
                  <div className="d-flex h-100 flex-column">
                    <div className="p-4 mt-auto">
                      <div className="row justify-content-center">
                        <div className="col-lg-7">
                          <div className="text-center text-white">
                            <h1 className="mb-3">
                              <i className="bx bxs-quote-alt-left text-primary h1 align-middle me-3" />
                              Hello Friends
                            </h1>
                            <div dir="ltr">
                              <div
                                className="owl-carousel owl-theme auth-review-carousel"
                                id="auth-review-carousel"
                              >
                                <div className="item">
                                  <div className="py-3">
                                    <p className="font-size-20 mb-4">
                                      Enter your personal details and start your
                                      journey with us
                                    </p>
                                    <div className="d-flex justify-content-center align-items-center">
                                      <button
                                        style={{
                                          width: "300.05px",
                                          height: "55.17px",
                                          padding: "15px",
                                          borderRadius: "43.68px",
                                          border: "2px solid #fff",
                                          backgroundColor: "#003F62",
                                          color: "#fff",
                                          fontSize: "16px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => navigate("/register")}
                                      >
                                        Sign up
                                      </button>
                                    </div>
                                    <div></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
