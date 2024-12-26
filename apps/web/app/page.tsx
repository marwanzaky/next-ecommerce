"use client";

import { Button } from "@repo/ui/button";
import { useState } from "react";

export default function Home() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const response = await fetch("http://localhost:3001/");
		const json = await response.json();

		console.log("email", email);
		console.log("password", password);
		console.log("json", json);
	};

	return (
		<form className="flex flex-col max-w-96 mx-auto" onSubmit={onSubmit}>
			<input
				type="text"
				placeholder="Your email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Your password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<Button type="submit">Sign up</Button>
		</form>
	);
}
