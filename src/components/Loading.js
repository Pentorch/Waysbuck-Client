import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 fixed-top bg-white">
      <Spinner animation="border" role="status" variant="danger" />
      <span className="sr-only overide-text">
        <h3 className="ms-2">Loading...</h3>
      </span>
    </div>
  );
}

export default Loading;
