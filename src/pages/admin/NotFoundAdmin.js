import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <section className="h-100 w-100 bg-white text-notfound">
        <div className="empty-4-5 container mx-auto d-flex align-items-center justify-content-center flex-column">
          <img
            className="main-img img-fluid"
            src="http://api.elements.buildwithangga.com/storage/files/2/assets/Empty%20State/EmptyState4/Empty-4-1.png"
            alt=""
          />

          <div className="text-center w-100">
            <h1 className="title-text">Opss! Something Missing</h1>
            <p className="title-caption">
              The page you’re looking for isn’t found. We
              <br className="d-sm-block d-none" /> suggest you Back to Homepage.
            </p>
            <div className="d-flex justify-content-center">
              <Link
                to="/transaction"
                className="btn btn-back d-inline-flex text-white"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
