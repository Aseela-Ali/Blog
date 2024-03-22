import React, { useState } from 'react';
import './contact.css';
import Header from '../Header';

const Contact = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const scriptURL = 'https://script.google.com/macros/s/AKfycbybBOGhjs9bblx8VxPe02d6Oa9cfsdZrGov_oT5PmyR-n3skqht_tSfKfmB2s6fvucYog/exec';
        const form = e.target;
        const formData = new FormData(form);

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                if (response.ok) {
                    setMessage('Message sent successfully!');
                    setTimeout(() => {
                        setMessage('');
                    }, 5000);
                    form.reset();
                } else {
                    setMessage('Failed to send message. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                setMessage('Failed to send message. Please try again later.');
            });
    };

    return (
        <>
            <Header />
            <div id="contact">
                <h1 className='contactTitle'>Contact Me</h1>
                <span className='contactDesc'>Complete the form below to discuss a new recipe idea. Share your name, contact details, and message, and we'll be in touch. Let's create something tasty together!</span>
                <form className='contactForm' id="submit-to-google-sheet" onSubmit={handleSubmit}>
                    <input type='text' className='name' id='name' name='name' placeholder='Your Name' />
                    <input type='email' className='email' id='email' name='email' placeholder='Your Email' />
                    <textarea className='msg' id='message' name='message' rows='5' placeholder='Your Message'></textarea>
                    <button type='submit' value='Send' className='submitbtn'>Submit</button>
                </form>
                {message && <div className="message">{message}</div>}
            </div>
        </>
    );
}

export default Contact;
