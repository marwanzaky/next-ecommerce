"use client";

import { AppDispatch, useAppSelector } from "../redux/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/slices/authSlice";
import { Button } from "@/components/ui/button";

export default function Home() {
	const router = useRouter();

	const dispatch = useDispatch<AppDispatch>();

	const { isAuthenticated } = useAppSelector((state) => state.authReducer);

	return (
		<div className="h-[calc(100vh-14rem)] w-full flex flex-col justify-center items-center">
			{isAuthenticated ? (
				<div className="flex flex-col gap-2">
					<Button onClick={() => router.push("/settings")}>
						Account settings
					</Button>
					<Button onClick={() => dispatch(logOut())}>Log out</Button>
				</div>
			) : (
				<div className="flex flex-col gap-2">
					<Button onClick={() => router.push("/login")}>Log in</Button>
					<Button onClick={() => router.push("/signup")}>Sign up</Button>
				</div>
			)}
		</div>
	);
}
