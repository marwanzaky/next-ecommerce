"use client";

import { Button } from "@repo/ui/button";
import { InputText } from "@repo/ui/inputtext";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { getMeAsync, updateMeAsync, updateMyPasswordAsync } from "../../redux/slices/authSlice";

export default function Settings() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch<AppDispatch>();
	const { user } = useAppSelector(
		(state) => state.authReducer,
	);

	useEffect(() => {
		dispatch(getMeAsync());
	}, []);

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
		}
	}, [user]);

	const updateMeForm: React.FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		dispatch(updateMeAsync({ name, email }));
	};

	const updateMyPasswordForm: React.FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		if (newPassword === confirmPassword) {
			dispatch(updateMyPasswordAsync({ currentPassword, newPassword }));
		} else {
			alert('The passwords you entered do not match');
		}
	};

	return (
		<div className="h-screen w-full flex flex-col justify-center items-center gap-8">
			<form className="flex flex-col w-96" onSubmit={updateMeForm}>
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

				<Button type="submit" disabled={user?.name === name && user?.email === email}>Save changes</Button>
			</form>

			<form className="flex flex-col w-96" onSubmit={updateMyPasswordForm}>
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

				<Button type="submit" disabled={!currentPassword}>Save changes</Button>
			</form>
		</div >
	);
}
