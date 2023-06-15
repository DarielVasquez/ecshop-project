import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <main className="pt-5">
      <Container className="pt-5">
        <div className="text-center mt-5">
          <h1 className="display-4 pt-5">404 Page Not Found</h1>
          <p className="lead">The page you are looking for does not exist.</p>
          <Link to="/" className="btn btn-primary" style={{ color: "#053C5E" }}>
            Go to Homepage
          </Link>
        </div>
      </Container>
    </main>
  );
};

export default Error;
