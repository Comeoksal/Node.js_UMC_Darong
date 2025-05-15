import { responseFromReview } from "../dtos/review.dto.js";
import { NoExistStoreError, DuplicateReviewError } from "../error.js";
import {
    addReview,
    getReview,
} from "../repositories/review.repository.js"

export const UseReview = async (data) => {
    const joinReviewId = await addReview({
        user_id: data.user_id,
        store_id: data.store_id,
        body: data.body,
        score: data.score,
    })
    if (joinReviewId == null) {
        throw new NoExistStoreError("존재하지 않는 가게입니다.", data)
    } else if (joinReviewId == -1) {
        throw new DuplicateReviewError("이미 리뷰를 작성한 가게입니다.", data)
    }

    const review = await getReview(joinReviewId);

    return responseFromReview({ review });
}