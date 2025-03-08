import Overview from "./overview";
import Reviews from "./reviews";

export default function ProductFeedback({ product }) {
	return (
		<div className="feedback">
			<h4>Rating and reviews</h4>

			<div className="overview-n-reviews">
				<Overview product={product} />
				<Reviews product={product} />
			</div>
		</div>
	);
}
