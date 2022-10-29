import { useRouter } from 'next/router';

function Paragraph(props) {
    return <div className='about-parag'>
        <h4>{props.title}</h4>
        <p>{props.description}</p>
    </div >
}

function About() {
    const router = useRouter();

    const contactUs = event => {
        event.preventDefault();
        router.push('/contact');
    }

    return <section className='section-about'>
        <div className='xl:container xl:mx-auto about-box'>
            <h2>What is {process.env.NEXT_PUBLIC_NAME}?</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-[50px]">
                <Paragraph title='A community doing good' description={`${process.env.NEXT_PUBLIC_NAME} is a global online marketplace, where people come together to make, sell, buy, and collect unique items. We’re also a community pushing for positive change for small businesses, people, and the planet. Here are some of the ways we’re making a positive impact, together.`} />
                <Paragraph title='Support independent creators' description={`There’s no ${process.env.NEXT_PUBLIC_NAME} warehouse – just millions of people selling the things they love. We make the whole process easy, helping you connect directly with makers to find something extraordinary.`} />
                <Paragraph title='Peace of mind' description='Your privacy is the highest priority of our dedicated team. And if you ever need assistance, we are always ready to step in for support.' />
            </div>

            <div className='about-contact'>
                <h4 className='text-center'>Have a question? contact us here.</h4>
                <button onClick={contactUs} className="btn-base btn-ghost-grey">Contact</button>
            </div>
        </div>
    </section>
}

export default About;