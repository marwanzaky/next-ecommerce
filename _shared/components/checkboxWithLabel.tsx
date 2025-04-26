import Checkbox from "./checkbox";
import Label from "./label";

type CheckboxWithLabelProps = {
	id?: string | undefined;
	name?: string | undefined;
	value?: string | undefined;
	label?: string | undefined;
};

export default function CheckboxWithLabel({
	id,
	name,
	value,
	label,
}: CheckboxWithLabelProps) {
	return (
		<div className="flex items-center gap-2">
			<Checkbox id={id} name={name} value={value} />
			<Label htmlFor={id}>{label}</Label>
		</div>
	);
}
