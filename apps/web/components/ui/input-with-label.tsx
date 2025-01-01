import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputWithLabel({
	id,
	type,
	label,
	placeholder,
	value,
	required,
	onChange,
}: {
	id: string;
	label: string;
	placeholder?: string;
	type?: "text" | "email" | "password";
	value?: string;
	required: boolean;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
	return (
		<div className="grid w-full max-w-sm items-center gap-1.5">
			<Label htmlFor={id}>{label}</Label>
			<Input
				type={type}
				id={id}
				placeholder={placeholder}
				value={value}
				required={required}
				onChange={onChange}
			/>
		</div>
	);
}
