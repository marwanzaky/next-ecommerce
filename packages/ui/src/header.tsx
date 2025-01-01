"use client";

type HeaderProps = {
	children: React.ReactNode;
};

// font-semibold tracking-tight text-2xl
export const Header = (props: HeaderProps) => {
	return (
		<h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
			{props.children}
		</h1>
	);
};
