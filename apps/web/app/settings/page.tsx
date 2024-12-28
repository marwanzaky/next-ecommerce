"use client";

import { Button } from "@repo/ui/button";
import { InputText } from "@repo/ui/inputtext";
import { useState } from "react";

export default function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
	};

	return (
		<div className="h-screen w-full flex flex-col justify-center items-center gap-8">
			<form className="flex flex-col w-96" onSubmit={onSubmit}>
				<InputText
					id="name"
					type="text"
					label="Your name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>

				<InputText
					id="email"
					type="email"
					label="Your email"
					placeholder="name@example.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<Button type="submit">Save changes</Button>

			</form>

			<form className="flex flex-col w-96" onSubmit={onSubmit}>
				<InputText
					id="password"
					type="password"
					label="Current password"
					value={currentPassword}
					onChange={(e) => setCurrentPassword(e.target.value)}
					required
				/>

				<InputText
					id="password"
					type="password"
					label="New password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
					required
				/>

				<InputText
					id="password"
					type="password"
					label="Confirm password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>

				<Button type="submit">Save changes</Button>
			</form>
		</div>
	);
}
