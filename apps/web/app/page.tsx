"use client";

import { Button } from "@repo/ui/button";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { logOut } from "../redux/slices/authSlice";

export default function Home() {
	const router = useRouter();

	const dispatch = useDispatch<AppDispatch>();

	const { isAuthenticated } = useAppSelector(
		(state) => state.authReducer,
	);

	return (
		<div className="h-screen w-full flex flex-col justify-center items-center">
			{isAuthenticated ?
				<Button onClick={() => dispatch(logOut())}>Log out</Button> :
				<Button onClick={() => router.push('/login')}>Log in</Button>}
		</div>
	);
}
