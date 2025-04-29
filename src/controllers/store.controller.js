import { StatusCodes } from 'http-status-codes'

export const handleStoreReview = async (req, res, next) => {
    console.log("리뷰 추가를 요청했습니다.");
    console.log("body : " + req.body);
}