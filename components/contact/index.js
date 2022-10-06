import React from 'react';
import { InputText, InputTextarea } from '../../utils/components/input';

function Contact() {
    return (
        <section className="section-contact-me">
            <div className="xl:container xl:mx-auto contact-me-box">
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div className="contact-me-box-child">
                        <h2>Contact Us</h2>
                        <h3>Have a question?</h3>
                        <p>
                            Email us and we&apos;ll get back to you within 24 hours. Monday-Saturday <br /> <br />
                            Please fill the form below to contact us and we will get back to you as soon as possible! We&apos;re happy to answer questions or help.
                        </p>
                    </div>

                    <div className="contact-me-box-child contact-me-container">
                        <form>
                            <InputText type='text' id='fullname' placeholder='Name' icon='person' />
                            <InputText type='text' id='email' placeholder='Email' icon='send' />
                            <InputText type='text' id='subject' placeholder='Subject' icon='subject' />
                            <InputTextarea placeholder='Message' icon='mail' />
                            <button className="btn-base btn-full w-full">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;