import React, { useState } from 'react';
import axios from 'axios';

import HCaptcha from '@hcaptcha/react-hcaptcha';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [token, setToken] = useState(null);  // hCaptcha token
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onHCaptchaVerify = (token) => {
    setToken(token); // hCaptcha solved token mil gaya
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setStatus('Please complete the captcha.');
      return;
    }

    setStatus('Submitting...');

    try {
      // Yahan apni WordPress API endpoint daalo jo form data accept kare
      await axios.post('https://darshboard.com/wp-json/custom/v1/submit-form', {
        ...formData,
        'h-captcha-response': token
      });

      setStatus('Form submitted successfully!');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setToken(null);
    } catch (error) {
      setStatus('Submission failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <label>
        First Name*:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Last Name*:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email*:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Message:
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </label>

      {/* hCaptcha widget */}
      <HCaptcha
        sitekey="114c4610-d62c-4994-ab0a-a39a2256b3c2"
        onVerify={onHCaptchaVerify}
      />

      <button type="submit">Submit</button>

      <p>{status}</p>
    </form>
  );
};

export default ContactForm;
