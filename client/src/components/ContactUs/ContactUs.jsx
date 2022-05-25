import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./ContactUs.css";

const Result = () => {
    return (
        <p>Your message has been successfully sent. I will contact you soon</p>
    );
};

function ContactUs() {
    const form = useRef();
    const [result, showResult] = useState(false);
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_xr06ow9",
                "template_ii74t46",
                form.current,
                "cZ1_wHzdL9S5pgh0H"
            )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
        e.target.reset();
        showResult(true);
    };

    setTimeout(() => {
        showResult(false)
    }, 5000);

    return (<div className="form">
        <form className="" controlId="formBasicEmail" ref={form} action="" onSubmit={sendEmail}>
            <div className="form-group">
                <h2 className="brand-title">Contact Us</h2><div className="inputs">
                    <span>Full name</span>
                    <br />
                    <input className="input100" type="text" name="fullName" required />
                    <br />
                    <span>Phone number</span>
                    <br />
                    <input className="input100" type="text" name="phone" required />
                    <br />
                    <span>Email</span>
                    <br />
                    <input className="input100" type="text" name="email" required />
                    <br /></div>
                <span>Message</span>
                <br />
                <textarea name="message" required></textarea>

                <div>

                    
                    <button className="sub">Submit</button>

                    <div className="row">{result ? <Result /> : null}</div>
                </div></div>
        </form></div>
    );
}

export default ContactUs;