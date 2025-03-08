"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import CartTable from "./table";

import YouMayAlsoLike from "@components/youMayAlsoLike";

import { ButtonFull } from "@ui/Button";
import { IProduct } from "_shared/interfaces";

import { useAppSelector } from "@redux/store";

function YourCartIsEmpty() {
	const router = useRouter();

	const continueShopping: React.MouseEventHandler<HTMLButtonElement> = (
		event,
	) => {
		event.preventDefault();
		router.push("/products");
	};

	return (
		<div className="yourCartIsEmpty">
			<h1 className="text-center">Your cart is empty</h1>

			<div className="flex justify-center">
				<ButtonFull className="!mr-0" onClick={continueShopping}>
					Continue shopping
				</ButtonFull>
			</div>
		</div>
	);
}

function YourCart() {
	const { items } = useAppSelector((state) => state.cartReducer);

	const [subtotal, setSubtotal] = useState("$0 USD");

	const updateSubtotal = () => {
		if (items.length <= 0) return;

		const total = items
			.map((item) => (item.product.price * item.quantity) / 100)
			.reduce((a, b) => a + b);
		const totalStr = (Math.round(total * 100) / 100)
			.toFixed(2)
			.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		setSubtotal("$" + totalStr + " USD");
	};

	const checkoutBtn: React.MouseEventHandler<HTMLButtonElement> = async (
		event,
	) => {
		event.preventDefault();

		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ items }),
		};

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER}/payment/create-checkout-session`,
			options,
		);
		const json = await res.json();

		window.location = json.url;
		window.localStorage.clear();

		// TODO:
		// setItems(UtilsCart.items);
	};

	useEffect(() => {
		updateSubtotal();
	});

	return (
		<div className="yourCart">
			<h4 className="text-center">Your Cart</h4>

			<div className="cart-container">
				<CartTable />

				<div className="cart-subtotal">
					<div className="cart-subtotal-div">
						<span className="cart-subtotal-div-title">Subtotal&emsp;</span>
						<span className="cart-subtotal-div-price">{subtotal}</span>
					</div>

					<div className="cart-subtotal-note">
						Taxes and shipping calculated at checkout
					</div>
				</div>

				<div className="flex justify-end items-end">
					<ButtonFull className="!mr-0" onClick={checkoutBtn}>
						Check out
					</ButtonFull>
				</div>
			</div>
		</div>
	);
}

export default function Cart({ products }: { products: IProduct[] }) {
	const { items } = useAppSelector((state) => state.cartReducer);

	return (
		<section className="section-cart">
			<div className="cart-box">
				{items.length > 0 ? <YourCart /> : <YourCartIsEmpty />}
			</div>

			{items.length === 0 && <YouMayAlsoLike products={products} />}
		</section>
	);
}
