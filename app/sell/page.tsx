"use client";

import Layout from "@components/layout";

import { ButtonFull } from "@ui/Button";

import Dialog from "_shared/components/dialog";
import { Table } from "_shared/components/table";

import ImageInput from "./components/imageInput";
import { useSell } from "@hooks/useSell";
import { InputCurrencyRange } from "_shared/components/InputCurrencyRange";
import { InputText } from "_shared/components/inputText";
import { Button } from "_shared/components/button";
import { Textarea } from "_shared/components/textarea";
import { Section } from "_shared/components/section";
import { InputTags } from "_shared/components/inputTags";

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
	} = useSell();

	return (
		<Layout title="Sell">
			<Section>
				<h4 className="text-center">Your Products</h4>

				<div className="flex flex-col gap-4">
					<Table columns={columns} data={tableData}></Table>

					<div className="flex justify-end">
						<ButtonFull
							className="!mr-0"
							onClick={() => {
								resetForm();
								setDisplayDialog(true);
							}}
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
					<form className="flex flex-col gap-4" onSubmit={onSubmitProduct}>
						<InputText
							type="text"
							id="name"
							placeholder="Product name"
							icon="person"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<Textarea
							id="description"
							placeholder="Product description"
							icon="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
						<InputCurrencyRange
							minPlaceholder="Price"
							maxPlaceholder="Compare price"
							minValue={price}
							maxValue={priceCompare}
							onMinChange={(value) => setPrice(value)}
							onMaxChange={(value) => setPriceCompare(value)}
							required
						/>
						<InputTags
							value={tags}
							onChange={(value) => setTags(value)}
							placeholder="Enter tags"
						/>

						<div className="flex gap-4 flex-wrap">
							{Array.from(Array(10).keys()).map((index) => (
								<ImageInput
									key={index}
									value={base64s[index]}
									onChange={(base64) => imageInputOnClick(index, base64)}
								/>
							))}
						</div>

						<Button size="md">Add</Button>
					</form>
				</Dialog>

				<Dialog
					className="w-96"
					title="Edit item"
					isOpen={displayEditDialog}
					onClose={() => setDisplayEditDialog(false)}
				>
					<form className="flex flex-col gap-4" onSubmit={onUpdateProduct}>
						<InputText
							type="text"
							id="name"
							placeholder="Product name"
							icon="inventory_2"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<Textarea
							id="description"
							placeholder="Product description"
							icon="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
						<InputCurrencyRange
							minPlaceholder="Price"
							maxPlaceholder="Compare price"
							minValue={price}
							maxValue={priceCompare}
							onMinChange={(value) => setPrice(value)}
							onMaxChange={(value) => setPriceCompare(value)}
							required
						/>
						<InputTags
							value={tags}
							onChange={(value) => setTags(value)}
							placeholder="Enter tags"
						/>

						<div className="flex gap-4 flex-wrap">
							{Array.from(Array(10).keys()).map((index) => (
								<ImageInput
									key={index}
									value={base64s[index]}
									onChange={(base64) => imageInputOnClick(index, base64)}
								/>
							))}
						</div>

						<Button size="md">Update</Button>
					</form>
				</Dialog>
			</Section>
		</Layout>
	);
}
