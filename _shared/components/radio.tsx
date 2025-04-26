type RadioProps = {
	id?: string | undefined;
	name?: string | undefined;
	value?: string | undefined;
	checked?: boolean | undefined;
	onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

export default function Radio({
	id,
	name,
	value,
	checked,
	onChange,
}: RadioProps) {
	return (
		<div className="grid place-items-center">
			<input
				className="peer col-start-1 row-start-1 appearance-none aspect-square h-4 w-4 rounded-full border border-black shadow"
				type="radio"
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				checked={checked}
			/>

			<div
				className={`
					pointer-events-none
					col-start-1 row-start-1
					w-2 h-2 rounded-full
					peer-checked:bg-black`}
			/>
		</div>
	);
}
