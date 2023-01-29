'use client';

import { useRouter } from 'next/navigation';
import { ButtonGhostGrey } from '@ui/Button';

function Paragraph({ title, children }) {
    return <div className='parag'>
        <h4>{title}</h4>
        <p>{children}</p>
    </div >
}

export default function About() {
    const router = useRouter();

    const contactUs = event => {
        event.preventDefault();
        router.push('/contact');
    }

    return <section className='section-about'>
        <div className='about-box'>
            <h2>What is {process.env.NEXT_PUBLIC_NAME}?</h2>

            <div className='parags'>
                <Paragraph title='A community doing good'>{process.env.NEXT_PUBLIC_NAME} is a global online marketplace, where people come together to make, sell, buy, and collect unique items. We’re also a community pushing for positive change for small businesses, people, and the planet. Here are some of the ways we’re making a positive impact, together.</Paragraph>
                <Paragraph title='Support independent creators'>There’s no {process.env.NEXT_PUBLIC_NAME} warehouse – just millions of people selling the things they love. We make the whole process easy, helping you connect directly with makers to find something extraordinary.</Paragraph>
                <Paragraph title='Peace of mind'>Your privacy is the highest priority of our dedicated team. And if you ever need assistance, we are always ready to step in for support.</Paragraph>
            </div>

            <div className='contact'>
                <h4>Have a question? contact us here.</h4>
                <ButtonGhostGrey onClick={contactUs}>Contact</ButtonGhostGrey>
            </div>
        </div>
    </section>
}