"use client";

import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import {
	getMeAsync,
	updateMeAsync,
	updateMyPasswordAsync,
} from "../../redux/slices/authSlice";
import { Header } from "@repo/ui/header";
import { Muted } from "@repo/ui/muted";
import { selectUserInitials } from "../../redux/selectors/authSelectors";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "@/components/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { InputWithLabel } from "@/components/ui/input-with-label";

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
	const userInitials = useAppSelector(selectUserInitials);

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
			toast({
				title: "The passwords you entered do not match",
			});
		}
	};

	const onPhotoChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
		if (event.target.files == null || event.target.files.length === 0) {
			return;
		}

		const img = event.target.files[0];

		if (img == null || img.size > 4 * 1024 * 1024) {
			toast({
				title: "Image size exceeds the 4MB limit",
			});

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
		<div>
			<form
				className="px-4 py-8 flex flex-col gap-8 border-b sm:flex-row"
				onSubmit={updateMeForm}
			>
				<div className="flex flex-col gap-1 sm:w-1/3">
					<Header>Personal information</Header>
					<Muted>Use a permanent address where you can receive mail.</Muted>
				</div>

				<div className="flex flex-col gap-6 sm:w-2/3">
					<input
						ref={inputRef}
						className="hidden"
						type="file"
						accept=".png, .jpg, .jpeg"
						onChange={onPhotoChange}
					/>

					<div className="flex items-center gap-4">
						<Avatar className="h-16 w-16 rounded-lg">
							<AvatarImage src={photo || undefined} alt={user?.name} />
							<AvatarFallback className="rounded-lg text-3xl">
								{userInitials}
							</AvatarFallback>
						</Avatar>

						<div className="flex flex-col gap-2">
							<div className="flex gap-2">
								<Button onClick={() => inputRef.current?.click()}>
									Change avatar
								</Button>

								<Button
									variant="outline"
									size="icon"
									onClick={() => setPhoto(null)}
									disabled={!photo}
								>
									<Trash2 />
								</Button>
							</div>

							<div className="text-xs text-gray-500">
								JPG, GIF or PNG. 1MB max.
							</div>
						</div>
					</div>

					<InputWithLabel
						id="name"
						type="text"
						label="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>

					<InputWithLabel
						id="email"
						type="email"
						label="Email"
						placeholder="name@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<div className="flex gap-4">
						<Button
							type="submit"
							disabled={
								user?.name === name &&
								user?.email === email &&
								user?.photo === photo
							}
						>
							Save
						</Button>
					</div>
				</div>
			</form>

			<form
				className="px-4 py-8 flex flex-col gap-8 border-b sm:flex-row"
				onSubmit={updateMyPasswordForm}
			>
				<div className="flex flex-col gap-1 sm:w-1/3">
					<Header>Change password</Header>
					<Muted>Update your password associated with your account.</Muted>
				</div>

				<div className="flex flex-col gap-6 sm:w-2/3">
					<InputWithLabel
						id="password"
						type="password"
						label="Current password"
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
						required
					/>

					<InputWithLabel
						id="password"
						type="password"
						label="New password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						required
					/>

					<InputWithLabel
						id="password"
						type="password"
						label="Confirm password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

					<div>
						<Button type="submit" disabled={!currentPassword}>
							Save
						</Button>
					</div>
				</div>
			</form>

			<form className="px-4 py-8 flex flex-col gap-8 sm:flex-row">
				<div className="flex flex-col gap-1 sm:w-1/3">
					<Header>Delete account</Header>

					<Muted>
						No longer want to use our service? You can delete your account here.
						This action is not reversible. All information related to this
						account will be deleted permanently.
					</Muted>
				</div>

				<div className="flex flex-col gap-6 sm:w-2/3">
					<div>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button type="button" variant="destructive">
									Yes, delete my account
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete
										your account and remove your data from our servers.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction>Continue</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</div>
			</form>
		</div>
	);
}
