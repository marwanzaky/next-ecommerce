import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type InputWithLabelProps = {
	id: string;
	label: string;
	placeholder?: string;
	type?: "text" | "email" | "number" | "password";
	value?: string | number;
	required?: boolean;
	min?: string | number;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export function InputWithLabel({
	id,
	type,
	label,
	placeholder,
	value,
	required,
	min,
	onChange,
}: InputWithLabelProps) {
	return (
		<div className="grid w-full max-w-sm items-center gap-1.5">
			<Label htmlFor={id}>{label}</Label>
			<Input
				type={type}
				id={id}
				placeholder={placeholder}
				value={value}
				min={min}
				required={required}
				onChange={onChange}
			/>
		</div>
	);
}
