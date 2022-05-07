const contactUs = () => {
    window.location.href = "https://storio.netlify.app/contact";
}

function Paragraph(props) {
    return <div className='col-sm-4 p-4 skill'>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
    </div >
}

function About() {
    return <section className="section-about">
        <div className="container about-box">
            <h2>What is Storio?</h2>

            <div className="row">
                <Paragraph title='A community doing good' description='Storio is a global online marketplace, where people come together to make, sell, buy, and collect unique items. We’re also a community pushing for positive change for small businesses, people, and the planet. Here are some of the ways we’re making a positive impact, together.' />
                <Paragraph title='Support independent creators' description='There’s no Storio warehouse – just millions of people selling the things they love. We make the whole process easy, helping you connect directly with makers to find something extraordinary.' />
                <Paragraph title='Peace of mind' description='Your privacy is the highest priority of our dedicated team. And if you ever need assistance, we are always ready to step in for support.' />
            </div>

            <div className="contact">
                <h4>Have a question? contact us here.</h4>
                <button onClick={contactUs} className="btn-base btn-ghost-grey">Contact</button>
            </div>
        </div>
    </section>
}

export default About;