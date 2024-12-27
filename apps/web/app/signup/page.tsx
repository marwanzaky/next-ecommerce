"use client";

import { Button } from "@repo/ui/button";
import { InputText } from "@repo/ui/inputtext";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, } from "../../redux/store";
import { loginAsync } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Signup() {
	const router = useRouter();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch<AppDispatch>();

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		dispatch(loginAsync({ email, password, router }));
	};

	return (
		<div className="h-screen w-full flex flex-col justify-center items-center">
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

				<InputText
					id="password"
					type="password"
					label="Your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
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

				<div className="flex flex-col gap-2">
					<Button type="submit">Sign up</Button>
					<Button type="button" onClick={() => router.push('/login')}>Log in</Button>
				</div>
			</form>
		</div>
	);
}
