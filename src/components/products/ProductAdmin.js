import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductAdmin() {
  let [products, setProducts] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllProducts();
  },[]);

  let getAllProducts = () => {
    let dataURL = "http://127.0.0.1:5000/api/products";
    axios
      .get(dataURL)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(errorMessage);
      });
  };

  let deleteProduct = (productID) => {
    let dataURL = `http://127.0.0.1:5000/api/products/${productID}`;
    axios
      .delete(dataURL)
      .then((response) => {
        getAllProducts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <React.Fragment>
      <section className="p3">
        <div className="container">
          <div className="row">
            <div className="col animated zoomIn">
              <p className="h3 text-success">Product Admin</p>
              <p className="lead">
                Vegetables are parts of plants that are This is not an
                exhaustive list, as there are many more vegetables available in
                different regions and seasons. Additionally, there are various
                types and varieties of each vegetable, offering a wide range of
                choices to consumers. consumed by humans or other animals as
                food
              </p>
              <Link to="/products/create" className="btn btn-success btn-sm">
                Create New
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col animated zoomInLeft delay-1s ">
              <table className="table table-hover text-center table-striped table-success">
                <thead className="bg-dark text-white">
                  <tr>
                    <th>SNO</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {products.length > 0 ? (
                    <React.Fragment>
                      {products.map((product) => {
                        return (
                          <tr key={product._id}>
                            <td>
                              {product._id.substr(product._id.length - 5)}
                            </td>
                            <td>
                              <img
                                src={product.image}
                                alt=""
                                width="100"
                                height="100"
                              />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.qty}</td>
                            <td> &#8377;{product.price.toFixed(2)}</td>
                            <td>
                              <Link
                                to={`/products/${product._id}`}
                                className="btn btn-secondary btn-sm m-2"
                              >
                                Update
                              </Link>
                              <button
                                onClick={deleteProduct.bind(this, product._id)}
                                className="btn btn-danger btn-sm  m-2"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default ProductAdmin;
