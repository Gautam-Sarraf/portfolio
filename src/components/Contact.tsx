import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [result, setResult] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult('Sending...');
    const formDataToSend = new FormData();
    formDataToSend.append('access_key', '86f2f3a0-cdc8-438d-b6d4-634e52b87631');
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('message', formData.message);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });
      const data = await response.json();
      console.log('Web3Forms API response:', data);
      if (data.success) {
        setResult('Form Submitted Successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResult(data.message || 'Something went wrong.');
      }
    } catch (error) {
      setResult('Something went wrong.');
    }
  };

  return (
    <section id="contact" className="section">
      <div className="contact-container">
        <div className="pixel-container">
          <h2 className="contact-title">COMMUNICATION TERMINAL</h2>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Player Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="Enter your name..."
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Communication Channel:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="your.email@domain.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">Transmission Data:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                required
                placeholder="Type your message here..."
              />
            </div>
            
             <div className="form-submit">
              <button type="submit" className="pixel-button success">
                ► SEND SIGNAL ◄
              </button>
            </div>
            <div style={{ marginTop: '12px', color: '#00ff00', fontSize: '11px', minHeight: 20 }}>
              {result}
            </div>
          </form>
          
          <div className="contact-info">
            <h3 className="contact-info-title">DIRECT COMMUNICATION</h3>
            <div className="contact-details">
              <div style={{ marginBottom: '10px' }}>
                📧 gautam.sarraf_cs22@gla.ac.in
              </div>
              <div>
                📱 +91 8218341124
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;