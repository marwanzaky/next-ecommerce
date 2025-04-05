/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./utils/**/*.{js,ts,jsx,tsx}",
		"./hooks/**/*.{js,ts,jsx,tsx}",
		"./_shared/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontSize: {
				base: "15px",
			},
			colors: {
				"custom-bg-dark": "#f6f8f8",
				"border-color": "#ecf0f1",
				"bg-dark": "#f6f8f8",
				grey: "#868686",
			},
			filter: {
				"primary-dark":
					"brightness(0) saturate(100%) invert(30%) sepia(85%) saturate(1559%) hue-rotate(146deg) brightness(99%) contrast(101%)",
				placeholder:
					"brightness(0) saturate(100%) invert(68%) sepia(4%) saturate(720%) hue-rotate(146deg) brightness(95%) contrast(89%)",
			},
		},
		container: {
			padding: "15rem",
		},
	},
	plugins: [require("tailwindcss-filters")],
};
