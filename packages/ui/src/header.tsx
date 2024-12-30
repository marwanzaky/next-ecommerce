"use client";

type HeaderProps = {
	children: React.ReactNode;
};

// font-semibold tracking-tight text-2xl
export const Header = (props: HeaderProps) => {
	return (
		<h1 className="font-semibold tracking-tight text-2xl text-slate-900">
			{props.children}
		</h1>
	);
};
