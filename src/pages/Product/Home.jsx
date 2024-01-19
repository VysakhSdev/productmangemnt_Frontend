import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import MyModal from "../../components/Modal";
import { ApiCall } from "../../services/Api";
import {
  addcategoryURL,
  addproductURL,
  addsubcategoryURL,
  categorylistURL,
  productlistURL,
  subcategorylistURL,
} from "../../services/Base_url";
import { Show_Toast } from "../../utils/toast";
import { ContextData } from "../../services/Context";
import { useContext } from "react";
import { Productdetailspath } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const { check_Validation } = useContext(ContextData);
  const [categoryModal, setCategoryModal] = useState({ show: false, id: null });
  const [addsubCategoryModal, setaddsubCategoryModal] = useState({
    show: false,
    id: null,
  });
  const [productModal, setProductModal] = useState({ show: false, id: null });

  const [validated, setValidated] = useState(false);
  const [addcategory, setAddCategory] = useState({});
  const [addsubcategory, setSubAddCategory] = useState({});
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [product, setProduct] = useState([]);

  const [addproduct, setAddProduct] = useState({
    variants: [],
  });
  const [addvarient, setAddvarient] = useState({});
  const [morevarient, setMorevarient] = useState({});
  const [loading, setLoading] = useState(false);


  //--------------------------------Sub Catgory part---------------------
  //---------------  get category for dropdown
  const getCategory = async () => {
    try {
      const response = await ApiCall("get", categorylistURL);
      if (response.status === 200) {

        setCategory(response?.data);
      } else {
        console.error("Error fetching category:", response.error);
      }
    } catch (error) {
      console.error("An error occurred while fetching category:", error);
    }
  };
  //------------------- add sub category
  const addsubCategory = async () => {
    try {
      const response = await ApiCall("post", addsubcategoryURL, addsubcategory);
      if (response.status === 200) {
        Show_Toast("Sub Category Added Successfull", true);
        setaddsubCategoryModal(false);
        setValidated(false);
        getCategory();
      } else {
        Show_Toast("Sub Category Added Failed", false);
      }
    } catch (error) {
      console.error("Error during creating:", error);
    }
  };

  //-------------------------------- Catgory part---------------------
  const createCategory = async () => {
    try {
      const response = await ApiCall("post", addcategoryURL, addcategory);
      if (response.status === 200) {
        Show_Toast("Category Added Successfull", true);
        setCategoryModal(false);
        setValidated(false);
        getCategory();
      } else {
        Show_Toast(" Category Added Failed", false);
      }
    } catch (error) {
      console.error("Error during creating:", error);
    }
  };
  //-------------------------------- Catgory part---------------------
  const createProduct = async () => {
    try {
      const response = await ApiCall("post", addproductURL, addproduct);
      if (response.status === 200) {
        Show_Toast("Category Added Successfull", true);
        setProductModal(false);
        setValidated(false);
        getProduct();
      } else {
        Show_Toast(" Category Added Failed", false);
      }
    } catch (error) {
      console.error("Error during creating:", error);
    }
  };

  const handleButtonClick = () => {
  
    const combinedArray = [];

    if (morevarient && Object.keys(morevarient).length !== 0) {
      combinedArray.push(morevarient);
    }

    if (addvarient && Object.keys(addvarient).length !== 0) {
      combinedArray.push(addvarient);
    }


    setAddProduct((prevProduct) => ({
      ...prevProduct,
      variants: Array.isArray(prevProduct.variants)
        ? [...prevProduct.variants, ...combinedArray]
        : combinedArray,
    }));

  };
  //---------------  get category for dropdown
  const getSubcategory = async () => {
    try {
      const response = await ApiCall("get", subcategorylistURL);
      console.log(response,"response")
      if (response.status === 200) {

        setSubCategory(response?.data);
      } else {
        console.error("Error fetching subcategory:", response.error);
      }
    } catch (error) {
      console.error("An error occurred while fetching subcategory", error);
    }
  };
  //---------------  get product ---------
  const getProduct = async () => {
    setLoading(true);

    try {
      const response = await ApiCall("get", productlistURL);
      if (response.status === 200) {

        setProduct(response?.data);
        setLoading(false);
      } else {
        console.error("Error fetching product:", response.error);
      }
    } catch (error) {
      console.error("An error occurred while fetching product:", error);
    }
  };

  useEffect(() => {
    getCategory();
    getSubcategory();
    getProduct();
  }, []);

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Products</h4>
                <div className="page-title-right">
                  <div className="row">
                    <div className="col-4">
                      <Button
                        className="mb-3 btn btn-warning btn-rounded waves-effect waves-light"
                        style={{ width: "100%", marginRight: "8px" }}
                        onClick={() => {
                          setCategoryModal({ show: true, id: null });
                          setAddCategory(null);
                          setValidated(false);
                        }}
                      >
                        Add Category
                      </Button>
                    </div>
                    <div className="col-4">
                      <Button
                        className="mb-3 btn btn-warning btn-rounded waves-effect waves-light"
                        style={{ width: "150px", marginRight: "8px" }}
                        onClick={() => {
                          setaddsubCategoryModal({ show: true, id: null });
                          setSubAddCategory(null);
                          setValidated(false);
                        }}
                      >
                        Add Sub Category
                      </Button>
                    </div>
                    <div className="col-4">
                      <Button
                        className="mb-3 btn btn-warning btn-rounded waves-effect waves-light"
                        style={{ width: "100%" }}
                        onClick={() => {
                          setProductModal({ show: true, id: null });
                          setAddProduct(null);
                          setValidated(false);
                          setAddvarient(null);
                          setMorevarient(null);
                        }}
                      >
                        Add Product
                      </Button>
                    </div>

                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div
            className=""
            colSpan={5}
            style={{
              textAlign: "center",
              padding: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="spinner-border text-primary m-1" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="row">
              {product?.map((productItem, index) => {

                return (
                  <div className="col-xl-4 col-sm-6" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <div className="product-img position-relative">
                          <div className="avatar-sm product-ribbon">
                            <span className="avatar-title rounded-circle bg-primary">
                              - 25 %
                            </span>
                          </div>
                          <img
                            src="assets/images/product/mac.jpg"
                            alt=""
                            onClick={() =>
                              navigate(`${"/details"}/${productItem?._id}`)
                            }
                            className="img-fluid mx-auto d-block"
                          />
                        </div>
                        <div className="mt-4 text-center">
                          <h5 className="mb-3 text-truncate">
                            <a
                              to={`${"/details"}/${productItem?._id}`}
                              className="text-dark"
                            >
                              {productItem?.title}
                            </a>
                          </h5>
                          <p className="text-muted">
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star text-warning" />
                          </p>
                          <h5 className="my-0">
                            <span className="text-muted me-2">
                              <del>$500</del>
                            </span>{" "}
                            <b>$450</b>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="row">
              <div className="col-lg-12">
                <ul className="pagination pagination-rounded justify-content-center mt-3 mb-4 pb-1">
                  <li className="page-item disabled">
                    <a href="javascript: void(0);" className="page-link">
                      <i className="mdi mdi-chevron-left" />
                    </a>
                  </li>
                  <li className="page-item">
                    <a href="javascript: void(0);" className="page-link">
                      1
                    </a>
                  </li>
                  <li className="page-item active">
                    <a href="javascript: void(0);" className="page-link">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a href="javascript: void(0);" className="page-link">
                      3
                    </a>
                  </li>
                  {/* ... */}
                  <li className="page-item">
                    <a href="javascript: void(0);" className="page-link">
                      <i className="mdi mdi-chevron-right" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>

      {/*------------------------------ Category modal--------------------------------- */}
      <MyModal
        show={categoryModal.show}
        onHide={() => {
          setCategoryModal({ show: false, id: null });
          setValidated(false);
        }}
        title={<h5> Add Category</h5>}
        centered
        width={"500px"}
      >
        <div className="row ">
          <div className="col-12">
            <Form
              noValidate
              validated={validated}
              onSubmit={(e) =>
                check_Validation(e, createCategory, setValidated)
              }
            >
              <div className="mb-4">
                <input
                  required
                  title=""
                  className="form-control form-control-lg "
                  rows="4"
                  placeholder="Enter Category Name"
                  type="text"
                  value={addcategory?.category_name}
                  onChange={(e) =>
                    setAddCategory({
                      ...addcategory,
                      category_name: e.target.value,
                    })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Provide a category Name.
                </Form.Control.Feedback>
              </div>

              <div className="col-12 mt-4">
                <button type="submit" className="btn btn-warning float-end">
                  Add
                </button>
              </div>
            </Form>
          </div>
        </div>
      </MyModal>

      {/*------------------------------- Sub Category modal-------------------------------- */}
      <MyModal
        show={addsubCategoryModal.show}
        onHide={() => {
          setaddsubCategoryModal({ show: false, id: null });
          setValidated(false);
        }}
        title={<h5> Add Sub Category</h5>}
        centered
        width={"500px"}
      >
        <div className="row ">
          <div className="col-12">
            <Form
              noValidate
              validated={validated}
              onSubmit={(e) =>
                check_Validation(e, addsubCategory, setValidated)
              }
            >
              <div className="mb-4">
                <select
                  required
                  className="form-control form-control-lg"
                  value={addsubcategory?.category_name}
                  onChange={(e) =>
                    setSubAddCategory({
                      ...addsubcategory,
                      category_name: e.target.value,
                    })
                  }
                >
                  <option value="" selected disabled>
                    Select Category
                  </option>
                  {category?.map((data) => (
                    <option key={data._id} value={data._id}>
                      {data.category_name}
                    </option>
                  ))}
                </select>
                <Form.Control.Feedback type="invalid">
                  Provide a category Name.
                </Form.Control.Feedback>
              </div>
              <div className="mb-4">
                <input
                  required
                  title=""
                  className="form-control form-control-lg "
                  rows="4"
                  placeholder="Enter Category Name"
                  type="text"
                  value={addsubcategory?.sub_category}
                  onChange={(e) =>
                    setSubAddCategory({
                      ...addsubcategory,
                      sub_category: e.target.value,
                    })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Provide a category Name.
                </Form.Control.Feedback>
              </div>

              <div className="col-12 mt-4">
                <button type="submit" className="btn btn-warning float-end">
                  Add
                </button>
              </div>
            </Form>
          </div>
        </div>
      </MyModal>

      {/*------------------------------- product  modal-------------------------------- */}
      <MyModal
        show={productModal.show}
        onHide={() => {
          setProductModal({ show: false, id: null });
          setValidated(false);
        }}
        title={<h5> Add Product</h5>}
        centered
        size={"xl"}
        width={"900px"}
      >
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => check_Validation(e, createProduct, setValidated)}
        >
          <Container>
            <div className="row custom-spacing">
              <div className="col-md-12">
                <Row className="mb-4">
                  <div className="col-md-3">
                    <label htmlFor="">Title :</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      required
                      title=""
                      className="form-control form-control-lg"
                      placeholder="Enter Title"
                      type="text"
                      value={addproduct?.title}
                      onChange={(e) =>
                        setAddProduct({
                          ...addcategory,
                          title: e.target.value,
                        })
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Provide a Title
                    </Form.Control.Feedback>
                  </div>
                </Row>
              </div>
            </div>
            <div className="col-md-12">
              <Row className="mb-4">
                <div className="col-md-3">
                  <label htmlFor="">Variant :</label>
                </div>
                <div className="col-md-3 mb-2">
                  <input
                    required
                    title=""
                    className="form-control form-control-lg"
                    placeholder="RAM"
                    type="text"
                    value={addvarient?.ram}
                    onChange={(e) =>
                      setAddvarient({
                        ...addvarient,
                        ram: e.target.value,
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Provide a ram.
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-3  mb-2">
                  <input
                    required
                    title=""
                    className="form-control form-control-lg"
                    placeholder="Price"
                    type="text"
                    value={addvarient?.price}
                    onChange={(e) =>
                      setAddvarient({
                        ...addvarient,
                        price: e.target.value,
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Provide a price.
                  </Form.Control.Feedback>
                </div>
                <div className="col-md-3  mb-2">
                  <input
                    required
                    title=""
                    className="form-control form-control-lg"
                    placeholder="QTY"
                    type="number"
                    value={addvarient?.quantity}
                    onChange={(e) =>
                      setAddvarient({
                        ...addvarient,
                        quantity: e.target.value,
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Provide a quantity.
                  </Form.Control.Feedback>
                </div>
              </Row>
            </div>

            <div className="col-md-12">
              <Row className="mb-4">
                <div className="col-md-3">
                  <label htmlFor=""></label>
                </div>
                <div className="col-md-3  mb-2">
                  <input
                    title=""
                    className="form-control form-control-lg"
                    placeholder="RAM"
                    type="text"
                    value={morevarient?.ram}
                    onChange={(e) =>
                      setMorevarient({
                        ...morevarient,
                        ram: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3  mb-2">
                  <input
                    title=""
                    className="form-control form-control-lg"
                    placeholder="Price"
                    type="text"
                    value={morevarient?.price}
                    onChange={(e) =>
                      setMorevarient({
                        ...morevarient,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3  mb-2">
                  <input
                    title=""
                    className="form-control form-control-lg"
                    placeholder="QTY"
                    type="number"
                    value={morevarient?.quantity}
                    onChange={(e) =>
                      setMorevarient({
                        ...morevarient,
                        quantity: e.target.value,
                      })
                    }
                  />
                </div>
              </Row>
            </div>
            <div className="col-md-12">
              <Row className="mb-2">
                <div className="col-md-12 d-flex justify-content-end">
                  <Button
                    className="col-md-2 col-sm-4 col-6 btn-warning"
                    onClick={handleButtonClick}
                  >
                    Add Varient
                  </Button>
                </div>
              </Row>
            </div>

            <div className="row custom-spacing">
              <div className="col-md-12">
                <Row className="mb-4">
                  <div className="col-md-3">
                    <label htmlFor="">Sub Category :</label>
                  </div>
                  <div className="col-md-9">
                    <select
                      required
                      className="form-control form-control-lg"
                      value={addproduct?.sub_category}
                      onChange={(e) =>
                        setAddProduct({
                          ...addproduct,
                          sub_category: e.target.value,
                        })
                      }
                    >
                      <option value="" selected disabled>
                        Select Sub Category
                      </option>
                      {subcategory?.map(
                        (data) => (
                          console.log(data,"dat"),
                          (
                            <option key={data?._id} value={data?._id}>
                              {data?.sub_category}
                            </option>
                          )
                        )
                      )}
                    </select>
                    <Form.Control.Feedback type="invalid">
                      Provide a category Name.
                    </Form.Control.Feedback>
                  </div>
                </Row>
              </div>
            </div>
            <div className="row custom-spacing">
              <div className="col-md-12">
                <Row className="mb-4">
                  <div className="col-md-3">
                    <label htmlFor="">Description :</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      required
                      title=""
                      className="form-control form-control-lg"
                      placeholder="Enter Description"
                      type="text"
                      value={addproduct?.description}
                      onChange={(e) =>
                        setAddProduct({
                          ...addproduct,
                          description: e.target.value,
                        })
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Provide a Description.
                    </Form.Control.Feedback>
                  </div>
                </Row>
              </div>
            </div>
          </Container>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-warning float-end">
              Add
            </button>
          </div>
        </Form>
      </MyModal>
    </>
  );
}

export default Home;
