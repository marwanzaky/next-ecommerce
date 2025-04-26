import Label from "./label";
import Radio from "./radio";

type RadioWithLabelProps = {
	id?: string | undefined;
	name?: string | undefined;
	value?: string | undefined;
	checked?: boolean | undefined;
	onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
	label?: string | undefined;
	labelClassName?: string | undefined;
};

export default function RadioWithLabel({
	id,
	name,
	value,
	checked,
	onChange,
	label,
	labelClassName,
}: RadioWithLabelProps) {
	return (
		<div className="flex items-center gap-2">
			<Radio
				id={id}
				name={name}
				value={value}
				checked={checked}
				onChange={onChange}
			/>
			<Label className={labelClassName} htmlFor={id}>
				{label}
			</Label>
		</div>
	);
}
