export function initials(fullname: string) {
	return fullname
		.split(" ")
		.map((word) => word[0])
		.join("")
		.toUpperCase();
}

export function stringToDate(str: string) {
	const date = new Date(str);
	return date.toLocaleDateString("en-us", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}
