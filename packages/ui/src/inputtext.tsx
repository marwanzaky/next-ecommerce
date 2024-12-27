"use client";

type InputTextProps = {
	id: string;
	label?: string;
	placeholder?: string;
	type?: "text" | "email" | 'password';
	value?: string;
	required: boolean;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const InputText = (props: InputTextProps) => {
	return (
		<div className="mb-5">
			<label
				htmlFor={props.id}
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>
				{props.label}
			</label>

			<input
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				id={props.id}
				type={props.type}
				placeholder={props.placeholder}
				value={props.value}
				required={props.required}
				onChange={props.onChange}
			/>
		</div>
	);
};
