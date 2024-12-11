import React from "react";
import { Spinner } from "react-bootstrap";
import "./loading.css";

export default function Loading({ text }) {
  return (
    <div className="loadingContainer mt-4">
      <Spinner
        animation="border"
        role="status"
        variant="primary"
        className="spinner"
      >
        <span className="sr-only"></span>
      </Spinner>
      <p className="loadingText">{text}</p>
    </div>
  );
}
