const items = [
    {
        "id": 0,
        "name": "Personalised Notebook",
        "reviews": [],
        "price": "9.99",
        "pictures": ["./img/products/personalised-notebook/0"],
        "description": "This soft cover journal is a great reminder to never forget how wildly capable you are."
    },
    {
        "id": 1,
        "name": "Anniversary Gift for Him",
        "reviews": [],
        "price": "4.99",
        "pictures": ["./img/products/anniversary-gift-for-him/0"],
        "description": "This soft cover journal is a great reminder to never forget how wildly capable you are."
    },
    {
        "id": 2,
        "name": "Soft Cover Journal",
        "reviews": [
            {
                "fullname": "Lane",
                "date": "Feb 16, 2022",
                "stars": "★★★★★",
                "review": "Looks just like the description! Great quality item!"
            },
            {
                "fullname": "cathieblanton1",
                "date": "Mar 25, 2022",
                "stars": "★★★★★",
                "review": "Beautiful journals! Just the right size."
            }
        ],
        "price": "12.99",
        "pictures": [
            "./img/products/soft-cover-journal/0",
            "./img/products/soft-cover-journal/1",
            "./img/products/soft-cover-journal/2",
            "./img/products/soft-cover-journal/3",
            "./img/products/soft-cover-journal/4",
            "./img/products/soft-cover-journal/5"
        ],
        "description": "No rain no flowers spiral notebook - so cute and so inspirational.\n\nDesigned, manufactured, and printed in the USA.\n\nThis handmade, one-of-a-kind journal is perfect for note taking on the go, or just to jot down thoughts throughout the day.\n\nSize:\n5.5 x 8.5 inches\n\nDetails:\n- Spiral bound, double silver wire\n- 100 sheets/50 double sided individual pages\n- college ruled\n- matte laminated soft cover\n- front cover print only"
    },
    {
        "id": 3,
        "name": "Spiral Notebooks",
        "reviews": [
            {
                "fullname": "Samantha Fowler",
                "date": "Jan 30, 2022",
                "stars": "★★★★★",
                "review": "SO cute, great quality notebook, arrived super fast"
            },
            {
                "fullname": "mariacandela",
                "date": "Apr 15, 2022",
                "stars": "★★★★★",
                "review": "Sent these notebooks to my women's network mentees and they loved them! This is a great gift for anyone who needs a little daily inspiration!"
            },
            {
                "fullname": "auren joyner",
                "date": "Dec 28, 2021",
                "stars": "★★★★★",
                "review": "This notebook is thicker than expected! I bought this for a teacher friend, and I know she is going to love it. I want one for myself!"
            }
        ],
        "price": "19.99",
        "pictures": [
            "./img/products/spiral-notebooks/0",
            "./img/products/spiral-notebooks/1",
            "./img/products/spiral-notebooks/2",
            "./img/products/spiral-notebooks/3",
            "./img/products/spiral-notebooks/4",
            "./img/products/spiral-notebooks/5"
        ],
        "description": "This soft cover journal is a great reminder to never forget how wildly capable you are.\n\nThese spiral notebooks are great for on-the-go note-taking, journaling, making lists, + more.\n\nDesigned, manufactured, and printed in the USA.\n\nSize:\n5.5 x 8.5 inches\n\nNotebook Details:\n- Spiral-bound, double silver wire\n- 200 sheets/100 double-sided individual pages\n- college ruled\n- matte laminated soft cover\n- front cover print only\n- solid color back cover"
    }
];

function Item(props) {
    return <>
        <tr className="cart-table-item">
            <th className="cart-table-item-product">
                <div className="cart-table-item-product-div" >
                    <a href={"/product?id=" + props.id} className="cart-table-item-product-img"><img src={'https://storio-server.herokuapp.com/' + props.src} alt={props.alt} /></a>
                    <a href={"/product?id=" + props.id} className="cart-table-item-product-name">{props.name}</a>
                </div>
            </th>
            <th className="cart-table-item-price">{'$' + props.price}</th>
            <th className="cart-table-item-quantity">
                <input className="cart-table-item-quantity-field" type="number" defaultValue="1" min="1" max="100" />
            </th>
            <th className="cart-table-item-price">{'$' + props.price}</th>
            <th className="cart-table-item-remove">
                <button className="btn-base btn-ghost-grey cart-table-item-remove-btn">Remove</button>
            </th>
        </tr>
    </>
}

function Cart() {
    return <section className="section-cart">
        <div className="container">
            <h2>Your cart</h2>

            <div className="cart-container">

                <table className="cart-table table table-hover">
                    <thead>
                        <tr>
                            <th>Proudct</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map(el => <Item id={el.id} src={el.pictures[0]} name={el.name} alt={el.name} price={el.price} />)}
                    </tbody>
                </table >

                <div className="cart-subtotal">
                    <div className="cart-subtotal-div">
                        <span className="cart-subtotal-div-title">Subtotal</span>
                        <span className="cart-subtotal-div-price">$9.99 USD</span>
                    </div>

                    <div className="cart-subtotal-note">Taxes and shipping calculated at checkout</div>
                </div>

                <div className="cart-item-checkout">
                    <button className='btn-base btn-full cart-item-checkout-btn'>Check out</button>
                </div>

            </div>
        </div>
    </section >
}

export default Cart;