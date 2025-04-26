type CheckboxProps = {
	id?: string | undefined;
	name?: string | undefined;
	value?: string | undefined;
};

export default function Checkbox({ id, name, value }: CheckboxProps) {
	return (
		<div className="flex gap-2">
			<input
				className={`peer relative h-4 w-4 shadow appearance-none border border-black rounded
						checked:bg-blue-500 checked:border-blue-500
				`}
				type="checkbox"
				id={id}
				name={name}
				value={value}
			/>

			<svg
				className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block stroke-white"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="4"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<polyline points="20 6 9 17 4 12"></polyline>
			</svg>
		</div>
	);
}
