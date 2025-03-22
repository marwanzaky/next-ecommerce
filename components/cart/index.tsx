"use client";

import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@redux/store";
import {
	deleteCartItemAsync,
	updateCartItemQuantityAsync,
} from "@redux/thunks/cartThunks";

import { useRouter } from "next/navigation";

import YouMayAlsoLike from "@components/youMayAlsoLike";

import { ButtonFull } from "@ui/Button";

import { IProduct } from "_shared/interfaces";
import { Column, Table } from "_shared/components/table";
import { LogoCell } from "_shared/components/table/cells/logoCell";

type CartItem = IProduct & { imgUrl: string; quantity: number; total: number };

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
	const dispatch = useDispatch<AppDispatch>();

	const { items } = useAppSelector((state) => state.cartReducer);

	const [subtotal, setSubtotal] = useState("$0 USD");

	const columns: Column<CartItem>[] = [
		{
			header: "Product",
			field: "imgUrl",
			type: "custom",
			className: "sm:w-[50%]",
			render: (value, row) => (
				<LogoCell href={`product/${row._id}`} label={row.name} imgUrl={value} />
			),
		},
		{
			header: "Price",
			field: "price",
			type: "usd",
			className: "sm:w-[10%]",
		},
		{
			header: "Quantity",
			field: "quantity",
			type: "number-input",
			className: "sm:w-[15%]",
			onChange: (value, row) => {
				dispatch(
					updateCartItemQuantityAsync({
						productId: row._id,
						quantity: value,
					}),
				);
			},
		},
		{
			header: "Total",
			field: "total",
			type: "usd",
			width: "10%",
			className: "sm:w-[10%] hidden sm:table-cell",
		},
		{
			field: "_id",
			header: "",
			type: "action",
			width: "38px",
			action: (row) => {
				dispatch(deleteCartItemAsync({ productId: row._id }));
			},
			actionIcon: "delete",
			className: "sm:w-[15%]",
		},
	];

	const tableData = items.map((item) => ({
		...item.product,
		imgUrl: item.product.imgUrls[0],
		quantity: item.quantity,
		total: item.product.price * item.quantity,
	}));

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
				<Table className="mb-8" columns={columns} data={tableData} />

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
