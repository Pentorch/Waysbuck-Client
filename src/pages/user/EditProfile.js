import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";
import { API } from "../../config/server";
import { attact } from "../../assets";
import Avatar from "react-avatar";

function EditProfile() {
  const history = useHistory();
  const [profile, setProfile] = useState({});

  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    fullname: "",
    email: "",
  });

  console.log("Preview", preview);
  console.log("Profil", form);

  const getUser = async () => {
    try {
      const getProfile = await API.get("/profile");
      console.log("profiles", getProfile);
      setProfile(getProfile.data.data.users);
      setForm({
        ...form,
        fullname: getProfile.data.data.users.fullname,
        email: getProfile.data.data.users.email,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("fullname", form.fullname);
      formData.set("email", form.email);
      formData.set("image", preview);

      console.log("form", form);

      const response = await API.patch("/user", formData, config);
      console.log(response);

      history.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  // const path = "http://localhost:5000/uploads/";
  return (
    <Container>
      <Row>
        <Col className="container justify-content-center md-10 content-global">
          <div className="row text-red">
            <div className="col-md-4">
              {preview && preview !== null ? (
                <img
                  src={URL.createObjectURL(preview)}
                  alt="preview"
                  className="box-image img-fluid"
                  height={"460px"}
                />
              ) : profile.image ? (
                <img
                  src={profile.image}
                  alt="preview"
                  className="box-image"
                  height={"460px"}
                />
              ) : (
                <Avatar
                  name={profile.fullname}
                  size="450"
                  alt="preview"
                  className="box-image img-fluid"
                  height={"460px"}
                />
              )}
            </div>

            <div className="col-md-8">
              <h3>Update Profile</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-5 mb-4">
                  <Form.Control
                    className="input-overide"
                    name="fullname"
                    value={form.fullname}
                    onChange={(e) => handleChange(e)}
                    placeholder="Name"
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control
                    className="input-overide"
                    name="email"
                    type="email"
                    value={form.email}
                    min={0}
                    onChange={(e) => handleChange(e)}
                    placeholder="Email"
                  ></Form.Control>
                </Form.Group>

                <Form.Group
                  className="formInputImage mb-5"
                  controlId="ImageUpload"
                >
                  <Form.Label className="d-flex justify-content-between">
                    <span style={{ color: "#8c8b8b" }}>{profile.image}</span>
                    <Form.Control
                      name="image"
                      onChange={(e) => {
                        setPreview(e.target.files[0]);
                      }}
                      type="file"
                      hidden
                    />
                    <Image src={attact} style={{ width: "14px" }} />
                  </Form.Label>
                </Form.Group>
                <center>
                  <Form.Group className="formGroup">
                    <Button
                      type="submit"
                      className="btn btn-danger "
                      style={{ width: "90%" }}
                    >
                      Update Profile
                    </Button>
                  </Form.Group>
                </center>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default EditProfile;
