// import React from "react";
// import {
//   Tab,
//   ListGroup,
//   Col,
//   Row,
//   Container,
//   Button,
//   Navbar,
//   Offcanvas,
//   Nav,
//   NavDropdown,
//   Form,
//   FormControl,
// } from "react-bootstrap";

// import Transaction from "../../pages/admin/Transactions";
// import AddProduct from "../../pages/admin/AddProduct";
// // import Sonnet from "react-sonnet";

// const Dashboard = () => {
//   return (
//     <Container>
//       {/* <div className="grid" style={{ marginTop: "180px" }}>
//         <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
//           <Row>
//             <Col sm={2} style={{ marginLeft: "10px" }}>
//               <ListGroup>
//                 <ListGroup.Item action href="#link1" variant="danger">
//                   Transactions
//                 </ListGroup.Item>
//                 <ListGroup.Item action href="#link2" variant="danger">
//                   Product
//                 </ListGroup.Item>
//               </ListGroup>
//             </Col>
//             <Col sm={11}>
//               <Tab.Content>
//                 <Tab.Pane eventKey="#link1" style={{ fontSize: "14px" }}>
//                   <Transaction />
//                 </Tab.Pane>

//                 <Tab.Pane eventKey="#link2" style={{ fontSize: "14px" }}>
//                   <AddProduct />
//                 </Tab.Pane>
//               </Tab.Content>
//             </Col>
//           </Row>
//         </Tab.Container>
//       </div> */}
//       <Navbar bg="light" expand={false}>
//         <Container fluid>
//           <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
//           <Navbar.Toggle aria-controls="offcanvasNavbar" />
//           <Navbar.Offcanvas
//             id="offcanvasNavbar"
//             aria-labelledby="offcanvasNavbarLabel"
//             placement="end"
//           >
//             <Offcanvas.Header closeButton>
//               <Offcanvas.Title id="offcanvasNavbarLabel">
//                 Offcanvas
//               </Offcanvas.Title>
//             </Offcanvas.Header>
//             <Offcanvas.Body>
//               <Nav className="justify-content-end flex-grow-1 pe-3">
//                 <Nav.Link href="#action1">Home</Nav.Link>
//                 <Nav.Link href="#action2">Link</Nav.Link>
//                 <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
//                   <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//                   <NavDropdown.Item href="#action4">
//                     Another action
//                   </NavDropdown.Item>
//                   <NavDropdown.Divider />
//                   <NavDropdown.Item href="#action5">
//                     Something else here
//                   </NavDropdown.Item>
//                 </NavDropdown>
//               </Nav>
//               <Form className="d-flex">
//                 <FormControl
//                   type="search"
//                   placeholder="Search"
//                   className="me-2"
//                   aria-label="Search"
//                 />
//                 <Button variant="outline-success">Search</Button>
//               </Form>
//             </Offcanvas.Body>
//           </Navbar.Offcanvas>
//         </Container>
//       </Navbar>
//     </Container>
//   );
// };

// export default Dashboard;
