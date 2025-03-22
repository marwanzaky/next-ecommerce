"use client";

import Layout from "@components/layout";

import ProductItem from "@ui/ProductItem";
import { ButtonFull } from "@ui/Button";

import { InputText, InputTextarea } from "@utils/components/input";
import { InputText as InputText2 } from "_shared/components/inputText";

import Dialog from "_shared/components/dialog";
import { Table } from "_shared/components/table";

import ImageInput from "./components/imageInput";
import { useSell } from "@hooks/useSell";

export default function Page() {
	const {
		products,

		columns,
		tableData,

		name,
		setName,
		description,
		setDescription,
		price,
		setPrice,
		priceCompare,
		setPriceCompare,
		base64s,
		setBase64s,

		displayDialog,
		setDisplayDialog,
		displayEditDialog,
		setDisplayEditDialog,

		imageInputOnClick,
		onSubmitProduct,
		onUpdateProduct,
	} = useSell();

	return (
		<Layout title="Sell">
			<section className="section-container">
				<h4 className="text-center">Your Products</h4>

				<div className="flex flex-col gap-4">
					<Table columns={columns} data={tableData}></Table>

					<div className="flex justify-end">
						<ButtonFull
							className="!mr-0"
							onClick={() => setDisplayDialog(true)}
						>
							Add item
						</ButtonFull>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{products.map((item) => (
							<ProductItem key={item._id} data={item} />
						))}
					</div>
				</div>

				<Dialog
					title="Add item"
					isOpen={displayDialog}
					onClose={() => setDisplayDialog(false)}
				>
					<form onSubmit={onSubmitProduct}>
						<InputText
							type="text"
							id="name"
							placeholder="Product name"
							icon="person"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<InputTextarea
							id="description"
							placeholder="Product description"
							icon="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<div className="flex gap-[15px]">
							<InputText2
								styleClass="remove-arrow"
								type="number"
								id="price"
								placeholder="Price"
								icon="person"
								value={price ? price / 100 : undefined}
								min={0}
								onChange={(e) => setPrice(parseFloat(e.target.value) * 100)}
							/>
							<InputText2
								styleClass="remove-arrow"
								type="number"
								id="priceCompare"
								placeholder="Compare price"
								icon="person"
								value={priceCompare ? priceCompare / 100 : undefined}
								min={0}
								onChange={(e) =>
									setPriceCompare(parseFloat(e.target.value) * 100)
								}
							/>
						</div>

						<div className="flex gap-2 my-4">
							{Array.from(Array(5).keys()).map((index) => (
								<ImageInput
									key={index}
									value={base64s[index]}
									onChange={(base64) => imageInputOnClick(index, base64)}
								/>
							))}
						</div>

						<ButtonFull className="mt-4">Add</ButtonFull>
					</form>
				</Dialog>

				<Dialog
					title="Edit item"
					isOpen={displayEditDialog}
					onClose={() => setDisplayEditDialog(false)}
				>
					<form onSubmit={onUpdateProduct}>
						<InputText
							type="text"
							id="name"
							placeholder="Product name"
							icon="inventory_2"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<InputTextarea
							className="flex"
							id="description"
							placeholder="Product description"
							icon="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>

						<div className="flex gap-[15px] mb-[15px]">
							<InputText2
								styleClass="remove-arrow"
								type="number"
								id="price"
								placeholder="Price"
								icon="attach_money"
								value={price ? price / 100 : undefined}
								min={0}
								step="0.01"
								onChange={(e) => setPrice(parseFloat(e.target.value) * 100)}
							/>
							<InputText2
								styleClass="remove-arrow"
								type="number"
								id="priceCompare"
								placeholder="Compare price"
								icon="attach_money"
								value={priceCompare ? priceCompare / 100 : undefined}
								min={0}
								step="0.01"
								onChange={(e) =>
									setPriceCompare(parseFloat(e.target.value) * 100)
								}
							/>
						</div>

						<div className="flex gap-[15px] mb-[15px]">
							{Array.from(Array(6).keys()).map((index) => (
								<ImageInput
									key={index}
									value={base64s[index]}
									onChange={(base64) => imageInputOnClick(index, base64)}
								/>
							))}
						</div>

						<ButtonFull className="mt-4">Update</ButtonFull>
					</form>
				</Dialog>
			</section>
		</Layout>
	);
}
