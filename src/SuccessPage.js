import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const formData = JSON.parse(localStorage.getItem('formData'));

  const handleBack = () => {
    navigate('/');
  };

  if (!formData) {
    return (
      <div className="success-container">
        <h2>No submission data found</h2>
        <button onClick={handleBack}>Back to Form</button>
      </div>
    );
  }

  return (
    <div className="success-container">
      <h2>Form Submitted Successfully!</h2>
      <div className="submitted-data">
        <h3>Submitted Information:</h3>
        <p><strong>First Name:</strong> {formData.firstName}</p>
        <p><strong>Last Name:</strong> {formData.lastName}</p>
        <p><strong>Username:</strong> {formData.username}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone Number:</strong> {formData.phoneCode} {formData.phoneNumber}</p>
        <p><strong>Country:</strong> {formData.country}</p>
        <p><strong>City:</strong> {formData.city}</p>
        <p><strong>PAN Number:</strong> {formData.panNo}</p>
        <p><strong>Aadhar Number:</strong> {formData.aadharNo}</p>
      </div>
      <button onClick={handleBack}>Back to Form</button>
    </div>
  );
};

export default SuccessPage;