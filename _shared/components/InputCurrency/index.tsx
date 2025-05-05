import { useEffect, useState } from "react";
import { InputText } from "../inputText";

type InputCurrencyProps = {
	value?: number | undefined;
	onChange: (val: number | undefined) => void;
	onBlur?: (val: number | undefined) => void;
	placeholder?: string;
	size?: "sm" | "md";
};

export function InputCurrency({
	value,
	onChange,
	onBlur,
	placeholder,
	size = "sm",
}: InputCurrencyProps) {
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		setInputValue(value !== undefined ? value.toFixed(2) : "");
	}, [value]);

	const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
		const value = parseFloat(e.target.value);

		if (!isNaN(value)) {
			const newValue = Math.round(value * 100) / 100;
			onChange(newValue);
			onBlur?.(newValue);
		} else if (e.target.value === "") {
			onChange(undefined);
			onBlur?.(undefined);
		}
	};

	return (
		<InputText
			styleClass="remove-arrow"
			type="number"
			icon="attach_money"
			step="0.01"
			min={0}
			size={size}
			placeholder={placeholder}
			value={inputValue}
			onChange={(e) => setInputValue(e.target.value)}
			onBlur={handleBlur}
		/>
	);
}
