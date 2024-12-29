"use client";

import { Button } from "@repo/ui/button";
import { InputText } from "@repo/ui/inputtext";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import {
	getMeAsync,
	updateMeAsync,
	updateMyPasswordAsync,
} from "../../redux/slices/authSlice";

export default function Settings() {
	const inputRef = useRef<HTMLInputElement>(null);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [photo, setPhoto] = useState<string | null>();

	const dispatch = useDispatch<AppDispatch>();
	const { user } = useAppSelector((state) => state.authReducer);

	useEffect(() => {
		dispatch(getMeAsync());
	}, []);

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setPhoto(user.photo);
		}
	}, [user]);

	const updateMeForm: React.FormEventHandler<HTMLFormElement> = async (
		event,
	) => {
		event.preventDefault();

		dispatch(updateMeAsync({ name, email, photo }));
	};

	const updateMyPasswordForm: React.FormEventHandler<HTMLFormElement> = async (
		event,
	) => {
		event.preventDefault();

		if (newPassword === confirmPassword) {
			dispatch(updateMyPasswordAsync({ currentPassword, newPassword }));
		} else {
			alert("The passwords you entered do not match");
		}
	};

	const onPhotoChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
		if (event.target.files == null || event.target.files.length === 0) {
			return;
		}

		const img = event.target.files[0];

		if (img == null || img.size > 4 * 1024 * 1024) {
			alert("Image size exceeds the 4MB limit");
			event.target.value = "";
			return;
		}

		const reader = new FileReader();

		reader.onload = () => {
			setPhoto(reader.result as string);
		};

		reader.readAsDataURL(img);
		event.target.value = "";
	};

	return (
		<div className="h-screen w-full flex flex-col justify-center items-center gap-8">
			<input
				ref={inputRef}
				className="hidden"
				type="file"
				accept=".png, .jpg, .jpeg"
				onChange={onPhotoChange}
			/>

			<div className="flex gap-2">
				<img
					role="button"
					onClick={() => inputRef.current?.click()}
					className="rounded-full w-12 h-12"
					src={photo || "img/avatar-placeholder.png"}
				/>

				{photo && <Button onClick={() => setPhoto(null)}>Remove</Button>}
			</div>

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

				<Button
					type="submit"
					disabled={
						user?.name === name &&
						user?.email === email &&
						user?.photo === photo
					}
				>
					Save changes
				</Button>
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

				<Button type="submit" disabled={!currentPassword}>
					Save changes
				</Button>
			</form>
		</div>
	);
}
