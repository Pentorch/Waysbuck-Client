import { useEffect, useState } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
// import QRCode from "qrcode.react";
import Avatar from "react-avatar";
import { API } from "../../config/server";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { logo, qr } from "../../assets";
import convertRupiah from "rupiah-format";

function Profile() {
  const router = useHistory();
  const [profile, setProfile] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [wait, setWait] = useState(false);
  console.log("transaction", transactions);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const getProfile = await API.get("/profile");
        const getTransaction = await API.get("/cart");
        //   console.log(getProfile);
        //   console.log("Transaction",getTransaction);
        setProfile(getProfile.data.data.users);
        // console.log("profile",profile)
        setTransactions(getTransaction.data.data.transactions);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [wait]);

  const editProfile = () => {
    router.push("/editprofile");
  };

  const handleFinish = async (id) => {
    setWait(true);

    const body = JSON.stringify({
      status: "Success",
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    try {
      await API.patch("/transaction/" + id, body, config);

      await Swal.fire(
        "Approved",
        "The transaction status successfully",
        "success"
      );
    } catch (err) {
      console.log(err.response.data.message);
      setWait(false);
    }
  };
  const path = "https://res.cloudinary.com/daxedhulb/image/upload/";
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <Container>
      <Row>
        <Col md={4} className="justify-content-center mt-3">
          <h5 className="header3">
            <strong>My Profile</strong>
          </h5>
          <Row className="mt-4">
            <Col md={5}>
              {profile.image ? (
                <img
                  src={path + profile.image}
                  alt="profile"
                  className="box-image img-fluid"
                  height={"160px"}
                />
              ) : (
                <Avatar
                  name={profile.fullname}
                  alt="profile"
                  className="box-image img-fluid"
                  height={"160px"}
                />
              )}
            </Col>
            <Col md={7}>
              <strong className="text-red">Full Name</strong>
              <p>{profile.fullname}</p>
              <strong className="text-red">Email</strong>
              <p>{profile.email}</p>
              <Button
                variant="red"
                className="btn btn-danger"
                onClick={editProfile}
              >
                Edit Profile
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md={7}>
          <h5 className="header3">
            <strong>My Transaction</strong>
          </h5>
          <div>
            {transactions.length < 1 ? (
              <p className="text-secondary">There's no transaction yet</p>
            ) : (
              <ul className="list-group rounded scroll-item2">
                {transactions.map((datatransaction) => (
                  <li
                    className="list-group-item list-group-item-danger mb-3"
                    key={datatransaction.id}
                  >
                    <div className="row">
                      <div className="col-md-8">
                        <ul className="list-group scroll-item">
                          {datatransaction.orders.map((order, i) => {
                            const date = new Date(datatransaction.createdAt);

                            return (
                              <li className="mb-3" key={i}>
                                <div className="d-flex align-items-center ">
                                  <img
                                    src={path + order.products.image}
                                    alt="product"
                                    className="box-image img-fluid"
                                    style={{
                                      width: "70px",
                                      marginRight: "10px",
                                    }}
                                  />
                                  <div className="text-red">
                                    <strong>{order.products.tittle}</strong>
                                    <br />
                                    <span className="textsmall mb-12">
                                      <strong>{days[date.getDay()]}</strong>,{" "}
                                      {date.getDate()} {months[date.getMonth()]}{" "}
                                      {date.getFullYear()}{" "}
                                    </span>
                                    <br />
                                    <span className="text-brown ">
                                      <strong>Topping :</strong>{" "}
                                    </span>
                                    <span className="textsmall">
                                      {" "}
                                      {order.toppingorders
                                        .map((topping) => topping.toppings.name)
                                        .join(", ")}
                                    </span>
                                    <br />
                                    <span className="text-brown ">
                                      SubTotal :
                                    </span>
                                    <span className="text-brown ">
                                      Rp.{" "}
                                      {(
                                        order.toppingorders
                                          .map(
                                            (topping) => topping.toppings.price
                                          )
                                          .reduce((a, b) => a + b, 0) +
                                        order.products.price
                                      ).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="col-md-4 text-center">
                        <br />
                        <img src={logo} alt="logo" width="60px"></img>
                        <br /> <br />
                        <img src={qr} alt="qr" width="60px"></img>
                        <br /> <br />
                        {datatransaction.status === "Waiting Approve" ? (
                          <label
                            className="text-status"
                            style={{ color: "#FF9900" }}
                          >
                            {datatransaction.status}
                          </label>
                        ) : datatransaction.status === "Success" ? (
                          <label
                            className="text-status"
                            style={{ color: "#78A85A" }}
                          >
                            {datatransaction.status}
                          </label>
                        ) : datatransaction.status === "On The Way" ? (
                          <label
                            className="text-status"
                            style={{ color: "#00D1FF" }}
                          >
                            {datatransaction.status}
                          </label>
                        ) : (
                          <label
                            className="text-status"
                            style={{ color: "#E83939" }}
                          >
                            {datatransaction.status}
                          </label>
                        )}
                        <br /> <br />
                        <p>
                          {" "}
                          <strong>
                            Sub Total :
                            {convertRupiah.convert(datatransaction.income)}
                          </strong>
                        </p>
                        <div className="my-3">
                          {datatransaction.status === "On The Way" ? (
                            <>
                              <Button
                                variant="danger"
                                size="sm"
                                style={{ margin: "2px" }}
                                onClick={() => handleFinish(datatransaction.id)}
                              >
                                Finish
                              </Button>
                            </>
                          ) : (
                            " "
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
