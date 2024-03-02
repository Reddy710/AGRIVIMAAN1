import React from 'react';
import image from '../agrivimaan1.png'
import { FaPhone, FaEnvelope, FaMapMarker, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-container max-w-4xl mx-auto px-4 py-8">
      <div className='brand-container'>
        <img src={image} alt="Brand Logo" className="brand-logo w-24 h-24 rounded-full" />
      </div>
      <div className="contact-header text-center">
        <h2 className="text-2xl font-semibold">Contact Us</h2>
      </div>
      <div className="contact-details flex justify-between mt-8">
        <div className="contact-info w-2/3">
          <div className="contact-item flex items-center mb-4">
            <FaPhone className="contact-icon text-xl" />
            <p className="text-lg">Phone: <a href="tel:+1234567890">+91 7092867100</a></p>
          </div>
          <div className="contact-item flex items-center mb-4">
            <FaEnvelope className="contact-icon text-xl" />
            <p className="text-lg">Email: <a href="mailto:info@example.com">bharathkumarreddy142@gmail.com</a></p>
          </div>
          <div className="contact-item flex items-center mb-4">
            <FaMapMarker className="contact-icon text-xl" />
            <p className="text-lg">Address: 123, Marathahalli, Bangalore, India</p>
          </div>
        </div>
        <div className="brand-about w-1/3">
          <h3 className="text-xl font-semibold mb-4">About Our Brand</h3>
          <p className="text-lg">
          Agrivimaan pioneers precision agriculture through innovative drone technology. 
          Our comprehensive services encompass precision spraying, crop monitoring, and repair solutions tailored to agricultural needs.
          Committed to sustainability and efficiency, Agrivimaan empowers farmers to optimize yields while minimizing environmental impact. 
          With cutting-edge drone technology and expert support, we revolutionize crop management for a greener tomorrow. 
          Agrivimaan: Where technology meets agriculture to cultivate a more sustainable future.</p>
        </div>
      </div>
      <div className="social-links flex justify-center mt-8">
        <a href="https://www.linkedin.com/in/bharathkumar-reddy-301683196/" target="_blank" rel="noopener noreferrer"><FaLinkedin className="social-icon text-3xl mx-2" /></a>
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram className="social-icon text-3xl mx-2" /></a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook className="social-icon text-3xl mx-2" /></a>
      </div>
    </div>
  );
};

export default Contact;
