import Icon from "@ui/Icon";

type StarsProps = {
	className?: string;
	total?: number;
	size?: number;
	value?: number;
	displayTotal?: boolean;
};

export default function Stars({
	className,
	total,
	size = 18,
	value = 5,
	displayTotal = true,
}: StarsProps) {
	const stars = [];

	for (let i = 0; i < Math.floor(value); i++)
		stars.push(
			<Icon className="star" icon="star" key={`Star ${i}`} size={size} />,
		);

	if (value % 1 !== 0)
		stars.push(
			<Icon className="star" icon="star_half" key={"Star half"} size={size} />,
		);

	for (let i = 0; i < 5 - Math.ceil(value); i++)
		stars.push(
			<Icon
				className="star"
				icon="star_border"
				key={`Star border ${i}`}
				size={size}
			/>,
		);

	return (
		<span className={`stars ${className}`}>
			{stars}
			{displayTotal ? `\u00A0(${total})` : ""}
		</span>
	);
}
