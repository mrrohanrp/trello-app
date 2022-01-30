import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate(-1);
    }, 5000);
  }, [navigate]);
  return (
    <div
      className="d-flex flex-column justify-content-center text-center bg-primary h-100"
      style={{ minHeight: '100vh' }}
    >
      <h1 className="text-danger fw-bold">Page Not Found</h1>
      <h5>navigating back to last page...</h5>
    </div>
  );
};

export default NotFound;
