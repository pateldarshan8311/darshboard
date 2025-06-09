import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    'your-name': '',
    'your-email': '',
    'your-message': '',
  });

  const [status, setStatus] = useState(null);

  // Form fields change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      // Use FormData to match what Contact Form 7 expects
      const formBody = new FormData();
      formBody.append('your-name', formData['your-name']);
      formBody.append('your-email', formData['your-email']);
      formBody.append('your-message', formData['your-message']);

      const response = await fetch(
        'https://darshboard.com/wp-json/contact-form-7/v1/contact-forms/176/feedback',
        {
          method: 'POST',
          body: formBody,
          // Important: Do NOT set Content-Type header manually
        }
      );

      const data = await response.json();

      if (data.status === 'mail_sent') {
        setStatus('✅ Message sent successfully!');
        setFormData({
          'your-name': '',
          'your-email': '',
          'your-message': '',
        });
      } else {
        setStatus('❌ Error: ' + (data.message || 'Something went wrong'));
      }
    } catch (error) {
      console.error('Submit error:', error);
      setStatus('❌ Failed to submit form.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <label>
        Your Name*<br />
        <input
          type="text"
          name="your-name"
          value={formData['your-name']}
          onChange={handleChange}
          required
          placeholder="Your full name"
        />
      </label>

      <br /><br />

      <label>
        Your Email*<br />
        <input
          type="email"
          name="your-email"
          value={formData['your-email']}
          onChange={handleChange}
          required
          placeholder="your.email@example.com"
        />
      </label>

      <br /><br />

      <label>
        Your Message<br />
        <textarea
          name="your-message"
          value={formData['your-message']}
          onChange={handleChange}
          required
          placeholder="Write your message here"
          rows={5}
        />
      </label>

      <br /><br />

      <button type="submit">Send</button>

      {status && (
        <p style={{ marginTop: '10px' }}>
          {status}
        </p>
      )}
    </form>
  );
}

export default ContactForm;
