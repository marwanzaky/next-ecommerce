import Image from "next/image";
import Icon from "@ui/Icon";

type ButtonFullProps = {
	className?: string;
	type?: "submit" | "reset" | "button";
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
};

type ButtonGhostGreyProps = {
	className?: string;
	type?: "submit" | "reset" | "button";
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
};

type ButtonIconProps = {
	className?: string;
	type?: "submit" | "reset" | "button";
	icon: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	children?: React.ReactNode;
};

export function ButtonFull({
	className,
	type,
	onClick,
	children,
}: ButtonFullProps) {
	return (
		<button
			className={`btn-base btn-full ${className}`}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export function ButtonFullRed({
	className,
	type,
	onClick,
	children,
}: ButtonFullProps) {
	return (
		<button
			className={`btn-base btn-full !bg-red-500 !border-red-500 hover:!bg-red-700 hover:!border-red-700 ${className}`}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export function ButtonGhostGrey({
	className,
	type,
	onClick,
	children,
}: ButtonGhostGreyProps) {
	return (
		<button
			className={`btn-base btn-ghost-grey ${className}`}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export function ButtonIcon({
	className,
	type,
	icon,
	onClick,
	children,
}: ButtonIconProps) {
	return (
		<button
			className={`btn-icon-base ${className}`}
			type={type}
			onClick={onClick}
		>
			<Icon icon={icon} />
			{children}
		</button>
	);
}

export function ButtonIconRed({
	className,
	type,
	icon,
	onClick,
	children,
}: {
	className?: string;
	type?: "button" | "reset" | "submit";
	icon: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
}) {
	return (
		<button
			className={`btn-icon-base btn-icon-red ${className}`}
			type={type}
			onClick={onClick}
		>
			<Icon icon={icon} />
			{children}
		</button>
	);
}

export function ButtonIconImage({ className, type, src, onClick }: any) {
	return (
		<button
			className={`btn-icon-base ${className}`}
			type={type}
			onClick={onClick}
		>
			<Image
				className="rounded-full !filter-none"
				src={src}
				width={24}
				height={24}
				alt="Icon"
			/>
		</button>
	);
}
