import Image from "next/image";

type IconProps = {
	className?: string;
	size?: number;
	icon: string;
};

export default function Icon({ className, icon, size = 24 }: IconProps) {
	return (
		<Image
			className={`icon ${className}`}
			src={`/assets/${icon}.svg`}
			alt={icon}
			width={size}
			height={size}
		/>
	);
}
