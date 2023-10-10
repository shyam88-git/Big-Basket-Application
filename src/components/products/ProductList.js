import React, { useEffect, useState } from "react";
import axios from "axios";
function ProductList() {
  let [products, setProducts] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
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
  }, []);
  return (
    <React.Fragment>
      <section className="p3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-success">Product List</p>
              <p className="lead">
                Vegetables are parts of plants that are This is not an
                exhaustive list, as there are many more vegetables available in
                different regions and seasons. Additionally, there are various
                types and varieties of each vegetable, offering a wide range of
                choices to consumers. consumed by humans or other animals as
                food
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="p-3">
        <div className="container">
          <div className="row">
            {products.length > 0 ? (
              <React.Fragment>
                {products.map((product) => {
                  return (
                    <div key={product.id} className="col-md-3">
                      <div className="card">
                        <div className="card-header bg-white text-center">
                            
                          <img src={product.image} width="150" height="150" />
                        </div>
                        <div className="card-body text-center">
                          <ul className="list-group">
                            <li className="list-group-item">
                              <strong> Name</strong>:{product.name}
                            </li>
                            <li className="list-group-item">
                             <strong>Price:</strong>  Rs.{product.price.toFixed(2)}
                            </li>
                            <li className="list-group-item">
                            <strong>Qty</strong>:{product.qty}kgs
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ) : null}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default ProductList;
