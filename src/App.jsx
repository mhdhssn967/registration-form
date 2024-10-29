import React, { useState } from 'react';
import regImg from './assets/4093887.jpg';
import './App.css';
import logo from './assets/logo.png';
import { InputLabel, Select, MenuItem, TextField, FormControl, FormControlLabel, RadioGroup, FormLabel, Radio, Button } from '@mui/material';

const App = () => {
  const [validate, setValidate] = useState({
    firstName: '',
    lastName: '',
    address: '',
    mobile: '',
    email: '',
    dob: '',
    course: '',
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    mobile: false,
    email: false,
    dob: false,
    course: false,
  });

  // Validation function for each input field
  const validateField = (name, value) => {
    let error = false;

    switch (name) {
      case 'firstName':
      case 'lastName':
        // Check for double spaces
        error = /\s{2,}/.test(value);
        break;
      case 'address':
        // Check for minimum 10 characters
        error = value.length < 10;
        break;
      case 'mobile':
        // Check for a 10-digit number
        error = !/^\d{10}$/.test(value);
        break;
      case 'dob':
        // Check if the user is over 15 years old
        const birthDate = new Date(value);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        error = age < 15;
        break;
      case 'email':
        // Basic email format check
        error = !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        break;
      case 'course':
        // Course should not be empty
        error = value.trim() === '';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValidate({
      ...validate,
      [name]: value,
    });

    validateField(name, value); // Validate the field on each change
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(errors).every((error) => !error) &&
                    Object.values(validate).every((value) => value.trim() !== '');

    if (isValid) {
      alert('Form is valid and submitted!');
    } else {
      alert('Please fill in all required fields correctly.');
    }
  };

  return (
    <>
      <div className='background'>
        <div className='main'>
          <div className='container'>
            <div className='namediv'>
              <img src={logo} alt="" className='logo' />
              <h2>R.R International High School</h2>
            </div>
            <img src={regImg} alt="Registration" />
          </div>
          <div className='form'>
            <h1>Higher Secondary Registration Form</h1>
            <form onSubmit={handleSubmit}>

              {/* First Name */}
              <label htmlFor="firstName">First Name</label>
              <TextField
                id="firstName"
                name="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={validate.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
                helperText={errors.firstName && "First Name contains double spaces"}
              />

              {/* Last Name */}
              <label htmlFor="lastName">Last Name</label>
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={validate.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
                helperText={errors.lastName && "Last Name contains double spaces"}
              />

              {/* Address */}
              <label htmlFor="address">Address</label>
              <TextField
                id="address"
                name="address"
                label="Address"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                margin="normal"
                value={validate.address}
                onChange={handleInputChange}
                error={errors.address}
                helperText={errors.address && "Address must be at least 10 characters"}
              />

              {/* Mobile */}
              <label htmlFor="mobile">Mobile</label>
              <TextField
                id="mobile"
                name="mobile"
                label="Mobile"
                variant="outlined"
                fullWidth
                margin="normal"
                value={validate.mobile}
                onChange={handleInputChange}
                error={errors.mobile}
                helperText={errors.mobile && "Invalid Number! Must be a 10-digit number."}
              />

              {/* Email */}
              <label htmlFor="email">Email</label>
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={validate.email}
                onChange={handleInputChange}
                error={errors.email}
                helperText={errors.email && "Invalid email format"}
              />

              {/* Gender */}
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="gender-radio-buttons-group-label"
                name="gender"
                value={validate.gender}
                onChange={handleInputChange}
                row
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>

              {/* Date of Birth */}
              <label htmlFor="dob">Date of Birth</label>
              <TextField
                id="dob"
                name="dob"
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                value={validate.dob}
                onChange={handleInputChange}
                error={errors.dob}
                helperText={errors.dob && "You must be at least 15 years old"}
                InputLabelProps={{ shrink: true }}
              />

              {/* Course */}
              <FormControl fullWidth margin="normal" error={errors.course}>
                <InputLabel id="course-label">Course</InputLabel>
                <Select
                  labelId="course-label"
                  id="course"
                  name="course"
                  label="Course"
                  value={validate.course}
                  onChange={handleInputChange}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="Biology">Biology</MenuItem>
                  <MenuItem value="Computer Science">Computer Science</MenuItem>
                  <MenuItem value="Commerce">Commerce</MenuItem>
                  <MenuItem value="Humanities">Humanities</MenuItem>
                </Select>
                {errors.course && <span className="error">Course selection is required</span>}
              </FormControl>

              {/* Buttons */}
              <div className="button-group">
                <Button variant="contained" color="primary" type="submit" className='button'>
                  Register
                </Button>
                <Button variant="outlined" color="info" style={{ marginLeft: '10px' }} className='button' onClick={() => setValidate({ firstName: '', lastName: '', address: '', mobile: '', email: '', dob: '', course: '' })}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
