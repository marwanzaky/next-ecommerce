import { useState } from "react";
import { useRouter } from "next/navigation";

import { ButtonFull } from "@ui/Button";

import Stars from "@utils/components/stars";

import { IProduct } from "_shared/interfaces";

import { useAppSelector } from "@redux/store";
import Dialog from "_shared/components/dialog";
import { productsService } from "@redux/services/productsService";
import { Textarea } from "_shared/components/textarea";
import { Button } from "_shared/components/button";

function OverviewRating({
	avgRatings,
	numReviews,
}: {
	avgRatings: number;
	numReviews: number;
}) {
	return (
		<div className="overview-rating">
			<div className="overview-rating-value">{avgRatings.toFixed(2)}</div>
			<div className="overview-rating-stars">
				<Stars value={avgRatings} displayTotal={false} />
			</div>
			<div className="overview-rating-total">{numReviews} reviews</div>
		</div>
	);
}

function OverviewRates() {
	return (
		<div className="overview-rates">
			<ul className="overview-rates-ul">
				<OverviewRatesLi stars={1} percent="10%" />
				<OverviewRatesLi stars={2} percent="20%" />
				<OverviewRatesLi stars={3} percent="30%" />
				<OverviewRatesLi stars={4} percent="40%" />
				<OverviewRatesLi stars={5} percent="50%" />
			</ul>
		</div>
	);

	function OverviewRatesLi({
		stars,
		percent,
	}: {
		stars: number;
		percent: string;
	}) {
		return (
			<li className="overview-rates-li">
				<div className="overview-rates-li-star">★</div>
				<div className="overview-rates-li-stars">{stars}</div>
				<div className="overview-rates-li-bar">
					<div
						className="overview-rates-li-bar-percent"
						style={{ width: percent }}
					></div>
				</div>
			</li>
		);
	}
}

export default function Overview({ product }: { product: IProduct }) {
	const router = useRouter();

	const { isAuthenticated, token } = useAppSelector(
		(state) => state.authReducer,
	);

	const [displayDialog, setDisplayDialog] = useState(false);
	const [dialogRating, setDialogRating] = useState(5);
	const [dialogDescription, setDialogDescription] = useState("");

	const openDialog = () => {
		if (!isAuthenticated) return router.push("/signin");
		setDisplayDialog(true);
	};

	const closeDialog = () => {
		setDisplayDialog(false);
	};

	const submitDialog = async () => {
		await productsService.postProductReview(
			token,
			product._id,
			dialogRating,
			dialogDescription,
		);

		alert("Your review is sent successfully!");

		closeDialog();
	};

	return (
		<div className="overview">
			<div className="grid grid-cols-2 mb-[30px]">
				<OverviewRating {...product} />
				<OverviewRates />
			</div>

			<div className="flex justify-center">
				<ButtonFull className="!m-0" onClick={openDialog}>
					Write a review
				</ButtonFull>
			</div>

			<Dialog
				title="Write a review"
				isOpen={displayDialog}
				onClose={closeDialog}
				width="24rem"
			>
				<form className="flex flex-col gap-4" onSubmit={submitDialog}>
					<Stars value={5} displayTotal={false} size={24} />

					<div>
						<h4>Description</h4>
						<Textarea
							id="description"
							placeholder="Describe your experience..."
							icon="description"
							onChange={(e) => setDialogDescription(e.target.value)}
						/>
					</div>

					<Button size="md">Submit</Button>
				</form>
			</Dialog>
		</div>
	);
}
