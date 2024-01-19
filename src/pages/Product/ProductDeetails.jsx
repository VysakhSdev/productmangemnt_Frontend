import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productDetailsURL } from "../../services/Base_url";
import { ApiCall } from "../../services/Api";
import MyModal from "../../components/Modal";
import { Button, Container, Form, Row } from "react-bootstrap";
import { ContextData } from "../../services/Context";
import { useContext } from "react";

function ProductDeetails({data}) {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [productModal, setProductModal] = useState({ show: false, id: null });
  const [validated, setValidated] = useState(false);
  const { check_Validation,wishlist } = useContext(ContextData);
  const [addproduct, setAddProduct] = useState({
    variants: [],
  });
  const [addvarient, setAddvarient] = useState({});
  const [morevarient, setMorevarient] = useState({});
  const [subcategory, setSubCategory] = useState([]);


  //---------------  get category for dropdown
  const getDetails = async () => {
    try {
      const response = await ApiCall("get", `${productDetailsURL}/${id}`);
      if (response.status === 200) {

        setDetails(response?.data);
      } else {
        console.error("Error fetching details:", response.error);
      }
    } catch (error) {
      console.error("An error occurred while fetching details:", error);
    }
  };
  //---------------  get category for dropdown
  const getSubcategory = async () => {
    try {
      const response = await ApiCall("get", subcategorylistURL);
      if (response.status === 200) {

        setSubCategory(response?.data);
      } else {
        console.error("Error fetching subcategory:", response.error);
      }
    } catch (error) {
      console.error("An error occurred while fetching subcategory", error);
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

    // You can perform additional actions if needed
  };



  useEffect(() => {
    getDetails();
    getSubcategory();
  }, []);
  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Product Details</h4>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="product-detai-imgs">
                        <div className="row">
                          <div>
                            <div className="col-md-7 offset-md-1 col-sm-9 col-8">
                              <div
                                className="tab-content"
                                id="v-pills-tabContent"
                              >
                                <div
                                  className="tab-pane fade show active"
                                  id="product-1"
                                  role="tabpanel"
                                  aria-labelledby="product-1-tab"
                                >
                                  <div>
                                    <img
                                      src="/assets/images/product/mac.jpg"
                                      alt
                                      className="img-fluid mx-auto d-block"
                                    />
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="product-2"
                                  role="tabpanel"
                                  aria-labelledby="product-2-tab"
                                >
                                  <div>
                                    <img
                                      src="/assets/images/product/mac.jpg"
                                      alt
                                      className="img-fluid mx-auto d-block"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-warning waves-effect waves-light mt-2 me-1"
                                  onClick={() => {
                                    setProductModal({ show: true, id: null });
                                    setAddProduct(details);
                                    setValidated(false);
                                    setAddvarient(null);
                                    setMorevarient(null);
                                  }}
                                >
                                  Edit Product
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-warning waves-effect  mt-2 waves-light"
                                >
                                  <i className="bx bx-shopping-bag me-2" />
                              Add to Wish list
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="mt-4 mt-xl-3">
                        <h4 className="mt-1 mb-3">{details?.title}</h4>
                        <p className="text-muted float-start me-3">
                          <span className="bx bxs-star text-warning" />
                          <span className="bx bxs-star text-warning" />
                          <span className="bx bxs-star text-warning" />
                          <span className="bx bxs-star text-warning" />
                          <span className="bx bxs-star" />
                        </p>
                        <p className="text-muted mb-4">
                          ( 152 Customers Review )
                        </p>
                        <h6 className="text-success text-uppercase">
                          20 % Off
                        </h6>
                        <h5 className="mb-4">
                          Price :{" "}
                          <span className="text-muted me-2">
                            <del>$240 USD</del>
                          </span>{" "}
                          <b>$225 USD</b>
                        </h5>
                        <p className="text-muted mb-4">
                          {details?.description}
                        </p>

                        <h5 className="font-size-15">Variants :</h5>

                        {details?.variants?.map((ram, index) => (
                          <div className="product-color " key={index}>
                            <a href={undefined}>
                              <div className="product-color-item border rounded ">
                                {ram?.ram}
                              </div>
                            </a>
                          </div>
                        ))}

                        <div className="col-md-2 col-sm-3 col-4">
                          <div
                            className="nav flex-column nav-pills "
                            id="v-pills-tab"
                            role="tablist"
                            aria-orientation="vertical"
                          >
                            <a
                              className="nav-link active"
                              id="product-1-tab"
                              data-bs-toggle="pill"
                              href="#product-1"
                              role="tab"
                              aria-controls="product-1"
                              aria-selected="true"
                            >
                              <img
                                src="/assets/images/product/mac.jpg"
                                alt
                                className="img-fluid mx-auto d-block rounded"
                              />
                            </a>
                            <a
                              className="nav-link"
                              id="product-2-tab"
                              data-bs-toggle="pill"
                              href="#product-2"
                              role="tab"
                              aria-controls="product-2"
                              aria-selected="false"
                            >
                              <img
                                src="/assets/images/product/mac.jpg"
                                alt
                                className="img-fluid mx-auto d-block rounded"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end card */}
            </div>
          </div>
        </div>
      </div>

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

export default ProductDeetails;
