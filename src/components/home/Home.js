import React from "react";
import "animate.css";

function Home() {
  return (
    <React.Fragment>
        <div className="landing-page">
          <div className="wrapper">
            <div className="d-flex flex-column justify-content-center text-center align-item-center h-100">
              <h5 className="display-4 animated zoomIn">
                <i className="bi-cart-fill" />
                 BigBasket
              </h5>
              <p className="lead px-2">
                Vegetables are parts of plants that are This is not an
                exhaustive list, as there are many more vegetables available in
                different regions and seasons. Additionally, there are various
                types and varieties of each vegetable, offering a wide range of
                choices to consumers. consumed by humans or other animals as
                food. The original meaning is still commonly used and is applied
                to plants collectively to refer to all edible plant matter, in…
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
  );
}

export default Home;
