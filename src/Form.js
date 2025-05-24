import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [touched, setTouched] = useState({});

  const countries = ['India', 'USA', 'UK', 'Canada', 'Australia'];
  const cities = {
    India: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
    USA: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
    UK: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds'],
    Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
    Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim() && touched.firstName) {
      newErrors.firstName = 'First Name is required';
    }
    
    if (!formData.lastName.trim() && touched.lastName) {
      newErrors.lastName = 'Last Name is required';
    }
    
    if (!formData.username.trim() && touched.username) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim() && touched.email) {
      newErrors.email = 'Email is required';
    } else if (touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password && touched.password) {
      newErrors.password = 'Password is required';
    } else if (touched.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.phoneNumber && touched.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (touched.phoneNumber && !/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Only numbers are allowed';
    } else if (touched.phoneNumber && formData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }
    
    if (!formData.country && touched.country) {
      newErrors.country = 'Country is required';
    }
    
    if (!formData.city && touched.city) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.panNo && touched.panNo) {
      newErrors.panNo = 'PAN Number is required';
    } else if (touched.panNo && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo)) {
      newErrors.panNo = 'PAN Number is invalid (format: ABCDE1234F)';
    }
    
    if (!formData.aadharNo && touched.aadharNo) {
      newErrors.aadharNo = 'Aadhar Number is required';
    } else if (touched.aadharNo && !/^\d+$/.test(formData.aadharNo)) {
      newErrors.aadharNo = 'Only numbers are allowed';
    } else if (touched.aadharNo && formData.aadharNo.length !== 12) {
      newErrors.aadharNo = 'Aadhar Number must be 12 digits';
    }
    
    setErrors(newErrors);
    
    const isValid = Object.values(formData).every(value => value !== '') && 
      Object.keys(newErrors).length === 0;
    setIsSubmitDisabled(!isValid);
    
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [formData, touched]);

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phoneNumber' || name === 'aadharNo') {
      if (!/^\d*$/.test(value)) return;
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (name === 'country') {
      setFormData(prev => ({
        ...prev,
        country: value,
        city: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mark all fields as touched when submitting
    const allFields = {
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      password: true,
      phoneNumber: true,
      country: true,
      city: true,
      panNo: true,
      aadharNo: true
    };
    setTouched(allFields);
    
    if (validateForm()) {
      localStorage.setItem('formData', JSON.stringify(formData));
      navigate('/success');
    }
  };

  return (
    <div className="form-container">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="form-group">
          <label>First Name*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={() => handleBlur('firstName')}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label>Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={() => handleBlur('lastName')}
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>

        {/* Username */}
        <div className="form-group">
          <label>Username*</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={() => handleBlur('username')}
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password*</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => handleBlur('password')}
              className={errors.password ? 'error' : ''}
            />
            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label>Phone Number*</label>
          <div className="phone-input">
            <select
              name="phoneCode"
              value={formData.phoneCode}
              onChange={handleChange}
            >
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (Australia)</option>
              <option value="+1">+1 (Canada)</option>
            </select>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={() => handleBlur('phoneNumber')}
              placeholder="1234567890"
              maxLength="10"
              className={errors.phoneNumber ? 'error' : ''}
            />
          </div>
          {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
        </div>

        {/* Country */}
        <div className="form-group">
          <label>Country*</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            onBlur={() => handleBlur('country')}
            className={errors.country ? 'error' : ''}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <span className="error-message">{errors.country}</span>}
        </div>

        {/* City */}
        <div className="form-group">
          <label>City*</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={() => handleBlur('city')}
            disabled={!formData.country}
            className={errors.city ? 'error' : ''}
          >
            <option value="">Select City</option>
            {formData.country &&
              cities[formData.country]?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>

        {/* PAN Number */}
        <div className="form-group">
          <label>PAN Number*</label>
          <input
            type="text"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
            onBlur={() => handleBlur('panNo')}
            placeholder="ABCDE1234F"
            className={errors.panNo ? 'error' : ''}
          />
          {errors.panNo && <span className="error-message">{errors.panNo}</span>}
        </div>

        {/* Aadhar Number */}
        <div className="form-group">
          <label>Aadhar Number*</label>
          <input
            type="text"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
            onBlur={() => handleBlur('aadharNo')}
            placeholder="123412341234"
            maxLength="12"
            className={errors.aadharNo ? 'error' : ''}
          />
          {errors.aadharNo && <span className="error-message">{errors.aadharNo}</span>}
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;