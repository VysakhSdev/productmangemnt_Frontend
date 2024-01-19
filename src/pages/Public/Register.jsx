import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../services/Context";
import { useContext } from "react";
import { useEffect } from "react";
import { ApiCall } from "../../services/Api";
import { registeruserURL } from "../../services/Base_url";
import { Show_Toast } from "../../utils/toast";

function Register() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const { check_Validation, setUser, user } = useContext(ContextData);
  const [registerData, setregisterData] = useState({});

  //-------------register user---------------
  const registerUser = async () => {
    try {
      const response = await ApiCall("post", registeruserURL, registerData);
      console.log(response, "dataa");
      if (response.status === 200) {
        Show_Toast("User Register Successfull", true);
        navigate("/login");
      } else {
        Show_Toast("Username or Password Existed", false);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <div className="container-fluid p-0">
          <div className="row g-0">
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
                              Welcome back
                            </h1>
                            <div dir="ltr">
                              <div
                                className="owl-carousel owl-theme auth-review-carousel"
                                id="auth-review-carousel"
                              >
                                <div className="item">
                                  <div className="py-3">
                                    <p className="font-size-20 mb-4">
                                      To keep connected with us plase login with
                                      your personal info{" "}
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
                                        onClick={() => navigate("/login")}
                                      >
                                        Sign in
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
            <div className="col-xl-3">
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="my-auto">
                      <div>
                        <h2 className="text" style={{ color: "#edac13" }}>
                          <b>Create Account</b>
                        </h2>
                      </div>
                      <div className="mt-4">
                        <Form
                          noValidate
                          validated={validated}
                          className="form-horizontal"
                          onSubmit={(event) => {
                            event.preventDefault();
                            check_Validation(event, registerUser, setValidated);
                          }}
                        >
                          <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                              Name
                            </label>
                            <input
                              type="text"
                              required
                              className="form-control"
                              id="username"
                              placeholder="Enter name"
                              value={registerData?.name}
                              onChange={(e) =>
                                setregisterData({
                                  ...registerData,
                                  name: e.target.value,
                                })
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide name
                            </Form.Control.Feedback>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                              Email
                            </label>
                            <input
                              type="email"
                              required
                              className="form-control"
                              id="email"
                              placeholder="Enter email"
                              value={registerData?.email}
                              onChange={(e) =>
                                setregisterData({
                                  ...registerData,
                                  email: e.target.value,
                                })
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide email
                            </Form.Control.Feedback>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Password</label>
                            <div className="input-group auth-pass-inputgroup">
                              <input
                                required
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                aria-label="Password"
                                aria-describedby="password-addon"
                                value={registerData?.password}
                                onChange={(e) =>
                                  setregisterData({
                                    ...registerData,
                                    password: e.target.value,
                                  })
                                }
                              />
                              <Form.Control.Feedback type="invalid">
                                Please provide password
                              </Form.Control.Feedback>
                            </div>
                          </div>

                          <div className="mt-4 text-center">
                            <button
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
                              Sign up
                            </button>
                          </div>
                        </Form>
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

export default Register;
