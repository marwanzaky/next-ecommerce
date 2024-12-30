"use client";

import { Button } from "@repo/ui/button";
import { InputText } from "@repo/ui/inputtext";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { signupAsync } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { Form } from "@repo/ui/form";
import { Paragraph } from "@repo/ui/paragraph";
import { Header } from "@repo/ui/header";
import { Muted } from "@repo/ui/muted";

export default function Signup() {
	const router = useRouter();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch<AppDispatch>();

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		if (password === confirmPassword) {
			dispatch(signupAsync({ name, email, password, router }));
		} else {
			alert("The passwords you entered do not match");
		}
	};

	return (
		<div className="h-[calc(100vh-4rem)] w-full flex flex-col justify-center items-center">
			<Form onSubmit={onSubmit}>
				<div className="flex flex-col gap-2">
					<Header>Create an account</Header>
					<Muted>Enter your email below to create your account</Muted>
				</div>

				<InputText
					id="name"
					type="text"
					label="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>

				<InputText
					id="email"
					type="email"
					label="Email"
					placeholder="name@example.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<InputText
					id="password"
					type="password"
					label="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				<InputText
					id="password"
					type="password"
					label="Confirm"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>

				<Button type="submit">Create account</Button>

				<div className="flex gap-1 mx-auto">
					<Paragraph className="text-center">
						Already have an account?
					</Paragraph>

					<a
						role="button"
						className="leading-7 text-sm text-slate-900 underline underline-offset-4"
						onClick={() => router.push("/login")}
					>
						Login
					</a>
				</div>
			</Form>
		</div>
	);
}
