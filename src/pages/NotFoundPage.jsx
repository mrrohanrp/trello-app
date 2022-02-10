import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = ({ message = 'Page' }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(-1);
    }, 5000);
  }, [navigate]);

  return (
    <div className="content not-found-page container-fluid bg-white py-4">
      <div className="row justify-content-center text-center mt-4">
        <div className="d-flex flex-column">
          <h1 className="text-danger fw-bold">{message} Not Found</h1>
          <h5>navigating back to last page...</h5>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
