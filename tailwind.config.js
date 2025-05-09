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
				primary: "#00b894",
				"primary-light": "#b8fff1",
				"primary-dark": "#009679",

				secondary: "#f6f8f8",
				"secondary-foreground": "#f6f8f8",

				//
				"custom-bg-dark": "#f6f8f8", // deprecated use secondary
				"border-color": "#dfe6e9",
				"bg-dark": "#f6f8f8", // deprecated use secondary

				grey: "#868686",
				black: "#2d3436",
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
