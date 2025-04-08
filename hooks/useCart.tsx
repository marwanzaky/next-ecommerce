"use client";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@redux/store";

import {
	deleteCartItemAsync,
	getCartMeAsync,
	updateCartItemQuantityAsync,
} from "@redux/thunks/cartThunks";

import { IProduct } from "_shared/interfaces";
import { Column } from "_shared/components/table";
import { LogoCell } from "_shared/components/table/cells/logoCell";
import { productsService } from "@redux/services/productsService";
import { selectCartTotalStr } from "@redux/selectors/cartSelectors";

import { useQuery } from "@tanstack/react-query";

type CartItem = IProduct & { imgUrl: string; quantity: number; total: number };

export function useCart() {
	const dispatch = useDispatch<AppDispatch>();

	const { isAuthenticated } = useAppSelector((state) => state.authReducer);
	const { items } = useAppSelector((state) => state.cartReducer);
	const cartTotalStr = useAppSelector(selectCartTotalStr);

	const { data: similarProducts } = useQuery({
		queryKey: ["featured-products"],
		queryFn: () =>
			productsService.getAllProducts({
				query: {
					featured: true,
					limit: 4,
				},
			}),
		staleTime: 1000 * 60 * 5,
	});

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
			className: "hidden sm:w-[10%] sm:table-cell",
		},
		{
			field: "_id",
			header: "",
			type: "action",
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

	useEffect(() => {
		if (isAuthenticated === true) {
			dispatch(getCartMeAsync());
		}
	}, []);

	return {
		items,
		columns,
		tableData,
		cartTotalStr,
		similarProducts,
	};
}
