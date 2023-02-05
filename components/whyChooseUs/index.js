import Icon from "@ui/Icon"

function Reason({ title, des, icon }) {
    return <div className='reason'>
        <div className='reason-icon'>
            {/* <span className='material-symbols-outlined'>{icon}</span> */}
            <Icon icon={icon} size={32} />
        </div>

        <h4 className='reason-h4'>{title}</h4>
        <p className='reason-p'>{des}</p>
    </div>
}

export default function WhyChooseUs() {
    return <section className='section-why_choose_us'>
        <div className='section-container'>
            <h2>Why should you choose us?</h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-[50px] mb-[50px]">
                <Reason icon='local_shipping' title='Free Shipping' des='All purchases over $199 are eligible for free shipping via USPS First Class Mail.' />
                <Reason icon='payments' title='Easy Payments' des='All payments are processed instantly over a secure payment protocol.' />
                <Reason icon='attach_money' title='Money-Back Guarantee' des='If an item arrived damaged or you&apos;ve changed your mind, you can send it back for a full refund.' />
                <Reason icon='inventory_2' title='Finest Quality' des='Designed to last, each of our products has been crafted with the finest materials.' />
            </div>
        </div>
    </section>
}