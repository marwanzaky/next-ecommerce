function Cart() {
    return <section className="section-cart">
        <div className="container cart-container">
            <h2>Your cart</h2>

            <div className="cart-items">
                <div className="cart-item">
                    <div className="cart-item-image">
                        <img src="https://storio-server.herokuapp.com/img/products/spiral-notebooks/0" />
                    </div>

                    <div className="cart-item-title">Product name</div>
                    <div className="cart-item-price" >$9.99</div>
                    <input className="cart-item-quantity" type="number" defaultValue="1" min="1" max="100" />
                    <div className="cart-item-total" >$9.99</div>
                    <button className="btn-base btn-ghost-grey cart-item-remove" >Remove</button>
                </div >

                <div className="cart-item">
                    <div className="cart-item-image">
                        <img src="https://storio-server.herokuapp.com/img/products/spiral-notebooks/0" />
                    </div>

                    <div className="cart-item-title">Product name</div>
                    <div className="cart-item-price" >$9.99</div>
                    <input className="cart-item-quantity" type="number" defaultValue="1" min="1" max="100" />
                    <div className="cart-item-total" >$9.99</div>
                    <button className="btn-base btn-ghost-grey cart-item-remove" >Remove</button>
                </div >
            </div>

            <button className='btn-base btn-full cart-item-checkout'>Check out</button>
        </div >
    </section >
}

export default Cart;