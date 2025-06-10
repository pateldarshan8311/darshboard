import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ submitting: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, message: '' });

    try {
      const response = await fetch('https://darshboard.com/wp-json/custom-form/v1/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ submitting: false, message: '✅ Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ submitting: false, message: `❌ ${result.message}` });
      }
    } catch (error) {
      console.error('❌ Form submit error:', error);
      setStatus({ submitting: false, message: '❌ Something went wrong. Try again.' });
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>Contact Us</h3>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={status.submitting}>
        {status.submitting ? 'Sending...' : 'Send Message'}
      </button>
      {status.message && <p>{status.message}</p>}
    </form>
  );
};

export default ContactForm;
