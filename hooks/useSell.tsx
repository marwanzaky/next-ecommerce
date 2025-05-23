import { IProduct } from "_shared/interfaces";
import { Column } from "_shared/components/table";
import { LogoCell } from "_shared/components/table/cells/logoCell";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@redux/store";
import {
	postUserProductAsync,
	removeUserProductAsync,
	updateUserProductAsync,
} from "@redux/thunks/userProductsThunks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CartItem = IProduct & { imgUrl: string };

export function useSell() {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();

	const { isAuthenticated } = useAppSelector((state) => state.authReducer);
	const { products } = useAppSelector((state) => state.userProductsReducer);

	const [productId, setProductId] = useState("");

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [priceUsd, setPriceUsd] = useState<number>();
	const [priceCompareUsd, setPriceCompareUsd] = useState<number>();
	const [tags, setTags] = useState<string[]>([]);
	const [base64s, setBase64s] = useState<string[]>([]);

	const [displayDialog, setDisplayDialog] = useState(false);
	const [displayEditDialog, setDisplayEditDialog] = useState(false);

	const columns: Column<CartItem>[] = [
		{
			header: "Product",
			field: "imgUrl",
			type: "custom",
			className: "w-[10%] md:w-[60%]",
			render: (value, row) => (
				<LogoCell href={`product/${row._id}`} label={row.name} imgUrl={value} />
			),
		},
		{ header: "Price", field: "price", type: "usd", width: "10%" },
		{
			header: "Compare",
			field: "priceCompare",
			type: "usd",
			width: "10%",
		},
		{
			header: "Stock",
			field: "stock",
			type: "text",
			width: "10%",
		},
		{
			field: "_id",
			header: "",
			type: "action",
			width: "38px",
			action: (row) => {
				if (confirm("Are you sure you want to delete this product?")) {
					dispatch(removeUserProductAsync({ id: row._id }));
				}
			},
			actionIcon: "delete",
		},
		{
			field: "_id",
			header: "",
			type: "action",
			width: "38px",
			action: (row) => {
				setName(row.name);
				setDescription(row.description);
				setPriceUsd(row.price / 100);
				setPriceCompareUsd(row.priceCompare / 100);
				setBase64s(row.imgUrls);
				setProductId(row._id);
				setTags(row.tags);

				setDisplayEditDialog(true);
			},
			actionIcon: "edit",
		},
	];

	const tableData: CartItem[] = products.map((item) => ({
		...item,
		imgUrl: item.imgUrls[0],
		stock: 1,
	}));

	useEffect(() => {
		if (isAuthenticated === false) {
			router.push("/signin");
		}
	}, []);

	const onSubmitProduct: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		if (priceUsd && priceCompareUsd) {
			dispatch(
				postUserProductAsync({
					name,
					description,
					price: priceUsd * 100,
					priceCompare: priceCompareUsd * 100,
					imgUrls: base64s,
					tags,
				}),
			);
		}

		setDisplayDialog(false);

		resetForm();
	};

	const onUpdateProduct: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		if (priceUsd && priceCompareUsd) {
			dispatch(
				updateUserProductAsync({
					id: productId,
					data: {
						name,
						description,
						price: priceUsd * 100,
						priceCompare: priceCompareUsd * 100,
						imgUrls: base64s,
						tags,
					},
				}),
			);
		}

		setDisplayEditDialog(false);

		resetForm();
	};

	const imageInputOnClick = (index: number, base64: string | undefined) => {
		if (base64) {
			setBase64s((prev) => {
				const updatedBase64s = [...prev];
				updatedBase64s[index] = base64;
				return updatedBase64s;
			});
		}
	};

	const resetForm = () => {
		setName("");
		setDescription("");
		setPriceUsd(undefined);
		setPriceCompareUsd(undefined);
		setBase64s([]);
		setTags([]);
	};

	return {
		products,

		columns,
		tableData,

		name,
		setName,
		description,
		setDescription,
		price: priceUsd,
		setPrice: setPriceUsd,
		priceCompare: priceCompareUsd,
		setPriceCompare: setPriceCompareUsd,
		tags,
		setTags,
		base64s,
		setBase64s,

		displayDialog,
		setDisplayDialog,
		displayEditDialog,
		setDisplayEditDialog,

		resetForm,
		imageInputOnClick,
		onSubmitProduct,
		onUpdateProduct,
	};
}
