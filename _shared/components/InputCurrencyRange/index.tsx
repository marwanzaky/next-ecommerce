import clsx from "clsx";
import { InputCurrency } from "../InputCurrency";

type InputCurrencyRangeProps = {
	className?: string;
	minPlaceholder?: string;
	maxPlaceholder?: string;
	minValue?: number | undefined;
	maxValue?: number | undefined;
	onMinChange: (value: number | undefined) => void;
	onMaxChange: (value: number | undefined) => void;
	required?: boolean;
};

export function InputCurrencyRange({
	className,
	minPlaceholder = "From",
	maxPlaceholder = "To",
	minValue,
	maxValue,
	onMinChange,
	onMaxChange,
	required,
}: InputCurrencyRangeProps) {
	return (
		<div className={clsx("flex gap-4", className)}>
			<InputCurrency
				placeholder={minPlaceholder}
				onChange={onMinChange}
				onBlur={(value) => {
					if (value === undefined || maxValue === undefined) return;
					if (value > maxValue) onMinChange(maxValue);
				}}
				value={minValue}
				required={required}
			/>

			<InputCurrency
				placeholder={maxPlaceholder}
				onChange={onMaxChange}
				onBlur={(value) => {
					if (value === undefined || minValue === undefined) return;
					if (value < minValue) onMaxChange(minValue);
				}}
				value={maxValue}
				required={required}
			/>
		</div>
	);
}
