import React from 'react';

function Testimonial(props) {
    return <div className='testimonial'>
        <i className="fa fa-quote-left"></i>

        <blockquote>
            {props.blockquote}
            <cite>{props.cite}</cite>
        </blockquote>
    </div>
}

function Testimonials() {
    return <section className="section-testimonials">
        {/* <div className="container">
            <h2>What users think?</h2>
        </div> */}

        <div className="xl:container xl:mx-auto testimonials-box">
            <div className='grid grid-cols-3 gap-4' >
                <Testimonial
                    blockquote='One of the bust purchases. Great, easy and safely in use.'
                    cite='Nihat Y.' />

                <Testimonial
                    blockquote='Simply a very elegant peace of hardware, with a gorgeous UI in the app.'
                    cite='Kevin L.' />

                <Testimonial
                    blockquote='Delivery was awesome! 1 day. Payment was simple. Product is perfect and save!'
                    cite='Dimitrios G.' />
            </div>
        </div>
    </section>
}

export default Testimonials;