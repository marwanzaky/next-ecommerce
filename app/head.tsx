export default function Head() {
	return (
		<>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link
				rel="icon"
				href={`${process.env.NEXT_PUBLIC_SERVER?.replace(
					"/api/v1",
					"",
				)}/favicon.png`}
			/>
		</>
	);
}
