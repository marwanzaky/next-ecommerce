"use client";

import { Button } from "@repo/ui/button";
import { InputText } from "@repo/ui/inputtext";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, } from "../../redux/store";
import { loginAsync } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Login() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch<AppDispatch>();

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		dispatch(loginAsync({ email, password, router }));
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
					type="password"
					label="Your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				<div className="flex flex-col gap-2">
					<Button type="submit">Log in</Button>
					<Button type="button" onClick={() => router.push('/signup')}>Sign up</Button>
				</div>
			</form>
		</div>
	);
}
