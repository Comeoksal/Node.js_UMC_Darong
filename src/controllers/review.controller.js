import { StatusCodes } from "http-status-codes";
import { UseReview } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

export const handleReview = async (req, res, next) => {
    console.log("리뷰 추가를 요청했습니다.");
    console.log('body : ', req.body);

    const review = await UseReview(bodyToReview(req.body));
    res.status(StatusCodes.OK).success(review);
}