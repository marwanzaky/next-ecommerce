import React from 'react';
import Settings from '../js/settings';
import CartItems from '../js/cartItems';
import { removeCartItem, checkout, updateCartSubtotal } from '../js/cart';

function Item(props) {
    return <>
        <tr className="cart-table-item">
            <th className="cart-table-item-product">
                <div className="cart-table-item-product-div" >
                    <a href={"/product?id=" + props.id} className="cart-table-item-product-img"><img src={`${Settings.server}/${props.src}`} alt={props.alt} /></a>
                    <a href={"/product?id=" + props.id} className="cart-table-item-product-name">{props.name}</a>
                </div>
            </th>
            <th className="cart-table-item-price">{'$' + props.price / 100}</th>
            <th className="cart-table-item-quantity">
                <input className="cart-table-item-quantity-field" type="number" defaultValue="1" min="1" max="100" />
            </th>
            <th className="cart-table-item-total">{'$' + props.price / 100}</th>
            <th className="cart-table-item-remove">
                <button className="btn-base btn-ghost-grey cart-table-item-remove-btn" onClick={removeCartItem}>Remove</button>
            </th>
        </tr>
    </>
}

class Cart extends React.Component {
    componentDidMount() {
        updateCartSubtotal();
    }

    render() {
        return (
            <section className="section-cart">
                <div className="xl:container xl:mx-auto">
                    <h2>Your cart</h2>

                    <div className="cart-container">
                        <table className="cart-table">
                            <thead className='cart-table-thead'>
                                <tr>
                                    <th className='cart-table-thead-th-product'>Product</th>
                                    <th className='cart-table-thead-th-price'>Price</th>
                                    <th className='cart-table-thead-th-quantity'>Quantity</th>
                                    <th className='cart-table-thead-th-total'>Total</th>
                                    <th className='cart-table-thead-th-remove'></th>
                                </tr>
                            </thead>

                            <tbody>
                                {CartItems.items.map(el => <Item id={el.id} src={el.pictures[0]} name={el.name} alt={el.name} price={el.price} />)}
                            </tbody>
                        </table >

                        <div className="cart-subtotal">
                            <div className="cart-subtotal-div">
                                <span className="cart-subtotal-div-title">Subtotal</span>
                                <span className="cart-subtotal-div-price">$0 USD</span>
                            </div>

                            <div className="cart-subtotal-note">Taxes and shipping calculated at checkout</div>
                        </div>

                        <div className="cart-item-checkout">
                            <button className='btn-base btn-full cart-item-checkout-btn' onClick={() => checkout()}>Check out</button>
                        </div>

                    </div>
                </div>
            </section >
        )
    }
}

export default Cart;