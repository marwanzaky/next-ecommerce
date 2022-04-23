import React from 'react';

function Input(props) {
    return <div className="contact-me-box-feild">
        <input type="text" id={props.id} name={props.name} placeholder={props.placeholder} />
        <div className="contact-me-box-feild-icon"><i className={props.className}></i></div>
    </div>
}

function Textarea(props) {
    return <div className="contact-me-box-feild">
        <textarea id={props.id} name={props.name} placeholder={props.placeholder}></textarea>
        <div className="contact-me-box-feild-icon"><i className={props.className}></i></div>
    </div>
}

function Contact() {
    return <section className="section-contact-me">
        <div className="container contact-me-box">
            <div className="contact-me-box-child">
                <h2>Contact us</h2>
                <h3>Let’s Work Together.</h3>
                <p>
                    I’d love to meet up with you to discuss your venture, and potential collaborations. <br /> <br />
                    I’m interested in freelance opportunities – especially ambitious or large projects. however, if you have other request
                    or question, don’t hesitate to use the form.
                </p>
            </div>

            <div className="contact-me-box-child contact-me-container">
                <form>
                    <Input id='fullname' name='name' placeholder='Name' className='far fa-user' />
                    <Input id='email' name='email' placeholder='Email' className='far fa-paper-plane' />
                    <Input id='subject' name='subject' placeholder='Subject' className='fas fa-align-right' />
                    <Textarea id='body' name='body' placeholder='Message' className='far fa-envelope-open' />
                    <button className="btn-base btn-full">Send</button>
                </form>
            </div>
        </div>
    </section>
}

export default Contact;