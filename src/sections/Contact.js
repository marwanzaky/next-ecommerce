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
        <div className="xl:container xl:mx-auto contact-me-box">
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className="contact-me-box-child">
                    <h2>Contact Us</h2>
                    <h3>Have a question?</h3>
                    <p>
                        Email us and we'll get back to you within 24 hours. Monday-Saturday <br /> <br />
                        Please fill the form below to contact us and we will get back to you as soon as possible! We're happy to answer questions or help.
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
        </div>
    </section>
}

export default Contact;