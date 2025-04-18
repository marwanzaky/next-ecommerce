"use client";

import Layout from "@components/layout";

import { ButtonFull } from "@ui/Button";

import { InputText, InputTextarea } from "@utils/components/input";

import Dialog from "_shared/components/dialog";
import { Table } from "_shared/components/table";

import ImageInput from "./components/imageInput";
import { useSell } from "@hooks/useSell";
import { InputCurrencyRange } from "_shared/components/InputCurrencyRange";

export default function Page() {
	const {
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
				</div>

				<Dialog
					className="w-96"
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

						<InputCurrencyRange
							className="gap-[15px] mb-[15px]"
							minPlaceholder="Price"
							maxPlaceholder="Compare price"
							minValue={price}
							maxValue={priceCompare}
							onMinChange={(value) => setPrice(value)}
							onMaxChange={(value) => setPriceCompare(value)}
						/>

						<div className="flex gap-[15px] my-[15px] flex-wrap">
							{Array.from(Array(10).keys()).map((index) => (
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
					className="w-96"
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
						<InputCurrencyRange
							className="gap-[15px] mb-[15px]"
							minPlaceholder="Price"
							maxPlaceholder="Compare price"
							minValue={price}
							maxValue={priceCompare}
							onMinChange={(value) => setPrice(value)}
							onMaxChange={(value) => setPriceCompare(value)}
						/>

						<div className="flex gap-[15px] mb-[15px] flex-wrap">
							{Array.from(Array(10).keys()).map((index) => (
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
