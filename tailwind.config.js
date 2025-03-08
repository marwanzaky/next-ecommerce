/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./utils/**/*.{js,ts,jsx,tsx}",
		"./_shared/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			filter: {
				"primary-dark":
					"brightness(0) saturate(100%) invert(30%) sepia(85%) saturate(1559%) hue-rotate(146deg) brightness(99%) contrast(101%)",
			},
		},
		container: {
			padding: "15rem",
		},
	},
	plugins: [require("tailwindcss-filters")],
};
