import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Dropdown, Nav } from "react-bootstrap";
import { addproduct, addtopping, keranjang, logout } from "../../assets";
import { AppContext } from "../../context/AppContext";
import Avatar from "react-avatar";
import { API } from "../../config/server";

const Admin = (props) => {
  const [profile, setProfile] = useState({});
  const router = useHistory();
  const [state] = useContext(AppContext);

  const getUser = async () => {
    try {
      //   setWait(true)
      const getProfile = await API.get("/profile");
      setProfile(getProfile.data.data.users);
      //  setWait(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, [state]);

  console.log("STATE", state);
  const goToTransaction = () => {
    router.push("/transaction");
  };
  const goToAddProduct = () => {
    router.push("/addproduct");
  };
  const goToAddTopping = () => {
    router.push("/addtopping");
  };

  return (
    <div>
      <Nav>
        <Nav.Link
          as={Link}
          to="/transaction"
          className="text-overide-admin fw-bold"
        >
          Transaction
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/addproduct"
          className="text-overide-admin fw-bold"
        >
          Product
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/addtopping"
          className="text-overide-admin fw-bold"
        >
          Topping
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/editproduct"
          className="text-overide-admin fw-bold"
        >
          complain
        </Nav.Link>

        <Dropdown>
          <Dropdown.Toggle
            as={Nav.Link}
            style={{ marginRight: "10px", marginLeft: "-10px" }}
          >
            <Avatar
              name={profile.fullname}
              round="50px"
              alt="profile"
              className="img-avatar-user"
              size="60"
              style={{
                // marginLeft: "-25px",
                position: "relative",
                transform: "translate(15px, -3px)",
              }}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu align="right" className="dropdown-menu">
            <Dropdown.Item onClick={goToTransaction} className="mb-3">
              <img src={keranjang} alt="profile" className="img-icon mr-3" />
              Transactions
            </Dropdown.Item>
            <Dropdown.Item onClick={goToAddProduct} className="mb-3">
              <img src={addproduct} alt="profile" className="img-icon mr-3" />
              Add Product
            </Dropdown.Item>
            <Dropdown.Item onClick={goToAddTopping} className="mb-3">
              <img src={addtopping} alt="profile" className="img-icon mr-3" />
              Add Topping
            </Dropdown.Item>
            <hr style={{ width: "100%", height: "1px" }} />
            <Dropdown.Item onClick={props.handleLogout}>
              <img src={logout} alt="profile" className="img-icon mr-3" />
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </div>
  );
};

export default Admin;
