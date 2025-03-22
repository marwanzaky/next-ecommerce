"use client";

import { useRef, useState } from "react";

import Icon from "@ui/Icon";

type ImageInputProps = {
	value?: string | undefined;
	onChange?: (base64: string | undefined) => void;
};

export default function ImageInput({ value, onChange }: ImageInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const [base64, setBase64] = useState(value);

	const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
		event,
	) => {
		if (event.target.files == null || event.target.files.length === 0) {
			return;
		}

		const file = event.target.files[0];

		if (file == null || file.size > 4 * 1024 * 1024) {
			alert("Image size exceeds the 4MB limit");
			event.target.value = "";
			return;
		}

		const reader = new FileReader();

		reader.onload = () => {
			const base64 = reader.result as string;
			setBase64(base64);

			if (onChange) {
				onChange(base64);
			}
		};

		reader.readAsDataURL(file);
		event.target.value = "";
	};

	return (
		<div className="w-16 h-16 rounded-xl overflow-hidden outline-none shadow-[0_0_0_1pt_#ecf0f1] focus:shadow-[0_0_0_2pt_cornflowerblue]">
			<input
				ref={inputRef}
				className="hidden"
				type="file"
				accept=".png, .jpg, .jpeg"
				onChange={onFileChange}
			/>

			{base64 ? (
				<img
					role="button"
					className="h-full w-full"
					src={base64}
					onClick={() => inputRef.current?.click()}
				/>
			) : (
				<div
					role="button"
					className="h-full w-full bg-custom-bg-dark flex justify-center items-center"
					onClick={() => inputRef.current?.click()}
				>
					<Icon className="filter-placeholder" icon="upload_file" />
				</div>
			)}
		</div>
	);
}
