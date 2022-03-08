import React from "react";
import { jumbotron, slice1, slice2, slice3, slice4 } from "../assets";
import { Row, Col } from "react-bootstrap";

const Jumbotron = () => {
  return (
    <div>
      <Row>
        <Col>
          <div
            className="section mb-3"
            data-aos="flip-left"
            data-aos-duration="500"
          >
            <div className="container">
              <div className="row mt-5">
                <div className="card col-md-10 col-sm-6 px-2 bg-red">
                  <div className="row justify-content-center content-join">
                    <div className="col-md-7 mt-5">
                      <img
                        src={slice1}
                        alt=""
                        className="img-fluid img-slice-one"
                      />
                      <img
                        src={slice2}
                        alt=""
                        className="img-fluid img-slice-two"
                      />
                      <img
                        src={slice3}
                        alt=""
                        className="img-fluid img-slice-three"
                      />
                      <img
                        src={slice4}
                        alt=""
                        className="img-fluid img-slice-four"
                      />
                      <h1
                        className="text-jumbotron"
                        data-aos="zoom-in"
                        data-aos-duration="2000"
                      >
                        WAYSBUCKS
                      </h1>
                      <p data-aos="zoom-in" data-aos-duration="2000">
                        Things are changing, but we’re still here for you
                      </p>
                      <p data-aos="zoom-in" data-aos-duration="2000">
                        We have temporarily closed our in-store cafes, but
                        select
                        <br />
                        grocery and drive-thru locations remaining open.
                        <br />
                        <b>Waysbucks</b> Drivers is also available
                      </p>
                      <p data-aos="zoom-in" data-aos-duration="2000">
                        Let’s Order...
                      </p>
                    </div>
                    <div className="col-md-4 col-sm-4 justify-content-center">
                      <img
                        src={jumbotron}
                        alt=""
                        className="img-fluid content-img-jumbotron"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Jumbotron;
