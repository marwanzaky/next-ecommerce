export default function ShippingPolicy() {
    return <section className='section-refund-policy'>
        <div className='xl:container xl:mx-auto'>
            <h2>Shipping Policy</h2>

            <h4>Shipping policy</h4>
            <p>
                All orders are processed within 1 to 3 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
                <br />
                <br />
                International Shipping
                <br />
                <br />
                We offer international shipping to the following countries: United States, United Kingdom, Australia, Canada, Germany, France, Spain, United Arab Emirates, Indonesia, Russia.
                <br />
                <br />
                Your order may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country.
                <br />
                <br />
            </p>

            <h4>How do I check the status of my order?</h4>
            <p>
                When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
                <br />
                <br />
                If you haven&apos;t received your order within 7-14 days of receiving your shipping confirmation email, please contact us at {process.env.NEXT_PUBLIC_CONTACT} with your name and order number, and we will look into it for you.
                <br />
                <br />
            </p>

            <h4>Refunds, returns, and exchanges</h4>
            <p>
                We accept returns up to 10 days after delivery, if the item is unused and in its original condition, and we will refund the full order amount minus the shipping costs for the return.
                <br />
                <br />
                In the event that your order arrives damaged in any way, please email us as soon as possible at {process.env.NEXT_PUBLIC_CONTACT} with your order number and a photo of the item’s condition. We address these on a case-by-case basis but will try our best to work towards a satisfactory solution.
                <br />
                <br />
                If you have any further questions, please don&apos;t hesitate to contact us at {process.env.NEXT_PUBLIC_CONTACT}.
                <br />
                <br />
            </p>
        </div>
    </section>
}