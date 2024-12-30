"use client";

import { ReactNode } from "react";

type FormProps = {
	children: ReactNode;
	onSubmit?: React.FormEventHandler<HTMLFormElement>;
};

// rounded-xl border bg-card text-card-foreground shadow
export const Form = (props: FormProps) => {
	return (
		<form
			className="flex flex-col gap-6 w-96 rounded-xl border shadow p-6"
			onSubmit={props.onSubmit}
		>
			{props.children}
		</form>
	);
};
