import Image from "next/image";

type IconProps = {
	className?: string;
	size?: number;
	onClick?: React.MouseEventHandler<HTMLImageElement>;
	icon: string;
};

export default function Icon({
	className,
	icon,
	onClick,
	size = 24,
}: IconProps) {
	return (
		<Image
			className={`icon ${className}`}
			src={`/assets/${icon}.svg`}
			alt={icon}
			width={size}
			height={size}
			onClick={onClick}
		/>
	);
}
