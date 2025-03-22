"use client";

import { useEffect, useRef, useState } from "react";

import Layout from "@components/layout";

import { ButtonFull, ButtonIcon } from "@ui/Button";
import { InputText } from "@utils/components/input";

import { useDispatch } from "react-redux";

import { AppDispatch, useAppSelector } from "@redux/store";
import { Avatar } from "_shared/components/avatar";
import { updateMeAsync, updateMyPasswordAsync } from "@redux/thunks/authThunks";

export default function Page() {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useAppSelector((state) => state.authReducer);

	const inputRef = useRef<HTMLInputElement>(null);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [photo, setPhoto] = useState<string | null>();

	const saveChanges: React.MouseEventHandler<HTMLButtonElement> = async (
		event,
	) => {
		event.preventDefault();
		dispatch(updateMeAsync({ name, email, photo }));
	};

	const onAvatarChange: React.ChangeEventHandler<HTMLInputElement> = async (
		event,
	) => {
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

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setPhoto(user.photo);
		}
	}, [user]);

	return (
		<Layout title="Settings">
			{user == null ? (
				<section className="section-me">
					<div className="me-box">
						<h2>loading...</h2>
					</div>
				</section>
			) : (
				<section className="section-me">
					<div className="me-box">
						<h1>Settings</h1>

						<form>
							<input
								ref={inputRef}
								className="hidden"
								type="file"
								accept=".png, .jpg, .jpeg"
								onChange={onAvatarChange}
							/>

							<h4 className="">Personal Information</h4>
							<div className="flex items-center mb-4 gap-4">
								<Avatar size="lg" imgUrl={photo}></Avatar>

								<div className="flex items-center">
									<ButtonFull
										type="button"
										onClick={() => inputRef.current?.click()}
									>
										Change avatar
									</ButtonFull>
									<ButtonIcon
										type="button"
										icon="delete"
										onClick={() => setPhoto(null)}
									></ButtonIcon>
								</div>
							</div>

							<InputText
								type="text"
								id="name"
								placeholder={name}
								icon="person"
								onChange={(e) => setName(e.target.value)}
							/>
							<InputText
								type="text"
								id="email"
								placeholder={email}
								icon="mail"
								onChange={(e) => setEmail(e.target.value)}
							/>

							<ButtonFull onClick={saveChanges}>Save</ButtonFull>
						</form>

						<form onSubmit={updateMyPasswordForm}>
							<h4 className="">Change Password</h4>
							<InputText
								type="password"
								id="curpass"
								placeholder="Current password"
								icon="password"
								onChange={(e) => setCurrentPassword(e.target.value)}
							/>
							<InputText
								type="password"
								id="newpass"
								placeholder="New password"
								icon="password"
								onChange={(e) => setNewPassword(e.target.value)}
							/>
							<InputText
								type="password"
								id="confpass"
								placeholder="Confirm password"
								icon="password"
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>

							<ButtonFull>Save</ButtonFull>
						</form>

						{/* <form>
							<h4 className="">Delete Account</h4>

							<p className="mb-4">
								No longer want to use our service? You can delete your account
								here. This action is not reversible. All information related to
								this account will be deleted permanently.
							</p>

							<ButtonFullRed>Yes, delete my account</ButtonFullRed>
						</form> */}
					</div>
				</section>
			)}
		</Layout>
	);
}
