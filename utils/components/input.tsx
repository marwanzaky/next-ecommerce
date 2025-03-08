import Icon from "@ui/Icon";
import React from "react";

type InputTextProps = {
	id: string;
	type: React.HTMLInputTypeAttribute;
	placeholder: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	icon: string;
};

export function InputText({
	id,
	type,
	placeholder,
	onChange,
	icon,
}: InputTextProps) {
	return (
		<div className="input-field">
			<input
				type={type}
				id={id}
				placeholder={placeholder}
				onChange={onChange}
				required
			/>

			<div className="input-field-icon">
				<Icon icon={icon} />
			</div>
		</div>
	);
}

export function InputTextarea({
	id,
	placeholder,
	icon,
	onChange,
	minHeight = "150px",
}: {
	id: string;
	placeholder: string;
	icon: string;
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
	minHeight?: string;
}) {
	const style = {
		minHeight,
	};

	return (
		<div className="input-field">
			<textarea
				id={id}
				placeholder={placeholder}
				style={style}
				onChange={onChange}
			></textarea>

			<div className="input-field-icon">
				<Icon icon={icon} />
			</div>
		</div>
	);
}
