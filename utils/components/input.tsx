import Icon from "@ui/Icon";
import React from "react";

type InputTextProps = {
	id?: string;
	type?: React.HTMLInputTypeAttribute;
	placeholder?: string;
	step?: string;
	value?: string | number;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	icon?: string;
};

export function InputText({
	id,
	type,
	placeholder,
	step,
	value,
	onChange,
	icon,
}: InputTextProps) {
	return (
		<div className="input-field">
			<input
				step={step}
				type={type}
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required
			/>

			{icon && (
				<div className="input-field-icon">
					<Icon icon={icon} />
				</div>
			)}
		</div>
	);
}

export function InputTextarea({
	className,
	id,
	placeholder,
	icon,
	value,
	onChange,
	minHeight = "150px",
}: {
	className?: string;
	id: string;
	placeholder: string;
	icon: string;
	value?: string | number;
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
	minHeight?: string;
}) {
	const style = {
		minHeight,
	};

	return (
		<div className="input-field">
			<textarea
				className={className}
				id={id}
				placeholder={placeholder}
				style={style}
				value={value}
				onChange={onChange}
			/>

			<div className="input-field-icon">
				<Icon icon={icon} />
			</div>
		</div>
	);
}
