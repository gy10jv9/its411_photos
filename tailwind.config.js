/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./App.{js,jsx,ts,tsx}", 
		"./app/**/*.{js,jsx,ts,tsx}", 
		"./components/**/*.{js,jsx,ts,tsx}", 
		"./context/**/*.{js,jsx,ts,tsx}"
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
		},
	},
	plugins: [],
}

