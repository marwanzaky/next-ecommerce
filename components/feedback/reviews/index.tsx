import Stars from "@utils/components/stars";
import { initials, stringToDate } from "@utils/stringUtils";
import { IProduct } from "_shared/interfaces";
import { IReview } from "_shared/interfaces/review.interface";

function Review({ data }: { data: IReview }) {
	return (
		<div className="review">
			<div className="flex mb-[10px]">
				<div className="mr-[15px] shrink-0">
					<div className="review-profile">{initials(data.user.name)}</div>
				</div>

				<div className="w-auto">
					<div className="review-fullname">
						{data.user.name}&ensp;<span>{stringToDate(data.createdAt)}</span>
					</div>
					<div className="review-stars">
						<Stars size={14} value={data.rating} displayTotal={false} />
					</div>
					<p className="review-text">{data.description}</p>
				</div>
			</div>
		</div>
	);
}

export default function Reviews({ product }: { product: IProduct }) {
	return (
		<div className="reviews">
			{product.reviews?.map((review, i) => (
				<Review data={review} key={`review ${i + 1}`} />
			))}
		</div>
	);
}
