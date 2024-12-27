"use client";

import { Button } from "@repo/ui/button";
import { InputText } from "@repo/ui/inputtext";
import { useState } from "react";

export default function Home() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const response = await fetch("http://localhost:3001/auth/login", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});
		const json = await response.json();

		console.log("email", email);
		console.log("password", password);
		console.log("json", json);
	};

	return (
		<div className="h-screen w-full flex flex-col justify-center items-center">
			<form className="flex flex-col w-96" onSubmit={onSubmit}>
				<InputText
					id="email"
					type="email"
					label="Your email"
					placeholder="name@example.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<InputText
					id="password"
					type="text"
					label="Your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				<Button type="submit">Log in</Button>
			</form>
		</div>
	);
}
