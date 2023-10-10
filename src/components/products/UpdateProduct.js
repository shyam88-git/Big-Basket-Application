import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate, json } from "react-router-dom";

function UpdateProduct() {
  let productId = useParams().id;
  let navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    image: "",
    price: "",
    qty: "",
    info: "",
  });

  const[submitted,setSubmitted]=useState(false);

  useEffect(() => {
    let dataURL = `http://127.0.0.1:5000/api/products/${productId}`;
    axios
      .get(dataURL)
      .then((response) => {
        setSelectedProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);

let updateInput=(event)=>{

    setSelectedProduct({

      ...sumbitProduct,
      [event.target.name]:event.target.value
    });
}
//update image
let updateImage = async (event) => {
  let imageFile = event.target.files[0];
  let base64Image = await convertBase64String(imageFile);
  setSelectedProduct({
    ...selectedProduct,
    image: base64Image,
  });
};

let convertBase64String = (imageFile) => {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.addEventListener("load", () => {
      if (fileReader.result) {
        resolve(fileReader.result);
      } else {
        reject("Error Ocurred");
      }
    });
  });
};

  //submit product

  let sumbitProduct=(event)=>{

      event.preventDefault();
      let dataURL=`http://127.0.0.1:5000/api/products/${productId}`;
      axios.put(dataURL, selectedProduct).then((response)=>{
          setSubmitted(true);

      }).catch((error)=>{


      });

  }

  
  return (
    <React.Fragment>

      {

        submitted?navigate('/products/admin'):

        <React.Fragment>

<section className="p3">
        <div className="container">
          <div className="row">
            <div className="col animated zoomIn">
              <p className="h3 text-success">Create A Product</p>
              <p className="lead">
                Vegetables are parts of plants that are This is not an
                exhaustive list, as there are many more vegetables available in
                different regions and seasons. Additionally, there are various
                types and varieties of each vegetable, offering a wide range of
                choices to consumers. consumed by humans or other animals as
                food

                {/* <pre>{JSON.stringify(selectedProduct)}</pre> */}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header bg-secondary text-white">

                  <div className="h4">Update A Product</div>
                </div>
                <div className="card-body">
                
                <form onSubmit={sumbitProduct}>
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            value={selectedProduct.name}
                            onChange={updateInput}
                            required
                            className="form-control"
                            placeholder="Product Name"
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-file">
                            <input
                              type="file"
                              onChange={updateImage}
                              
                              className="custom-file-input "
                              id="customFile"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="cumstomFile"
                            >
                              {selectedProduct.image !== "" ? (
                                <img
                                  src={selectedProduct.image}
                                  alt=""
                                  width="25"
                                  height="25"
                                />
                              ) : (
                                <span>Product Image</span>
                              )}
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <input
                            required
                            name="price"
                            value={selectedProduct.price}
                            onChange={updateInput}
                            type="number"
                            className="form-control"
                            placeholder="Price"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            required
                            name="qty"
                            value={selectedProduct.qty}
                            onChange={updateInput}
                            type="number"
                            className="form-control"
                            placeholder="Available Qty"
                          />
                        </div>
                        <div className="form-group">
                          <textarea
                            name="info"
                            value={selectedProduct.info}
                            onChange={updateInput}
                            required
                            className="form-control"
                            rows="2"
                            placeholder="Product Info"
                          />
                        </div>
                        <div>
                          <button className="btn btn-secondary btn-sm w-50">Upate</button>
                        </div>
                      </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

          </React.Fragment>

        
      }
      
    </React.Fragment>
  );
}

export default UpdateProduct;
