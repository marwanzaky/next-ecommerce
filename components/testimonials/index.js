import React from 'react';

function Testimonial(props) {
    return (
        <div className='testimonial'>
            <div className='m-auto lg:m-0 testimonial-icon'>
                <span class='material-symbols-outlined'>format_quote</span>
            </div>

            <blockquote className='text-center lg:text-left'>
                {props.blockquote}
                <cite>{props.cite}</cite>
            </blockquote>
        </div>
    )
}

function Testimonials() {
    return (
        <section className="section-testimonials">
            <div className="xl:container xl:mx-auto testimonials-box">
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4' >
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
    )
}

export default Testimonials;