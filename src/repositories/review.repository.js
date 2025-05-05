import { prisma } from "../db.config.js";

//Review 데이터 삽입 (null 반환시 존재하지 않는 가게, -1 반환시 이미 리뷰를 작성한 가게)
export const addReview = async (data) => {
    try {
        const existStore = await prisma.store.findFirst({ where: { id: data.store_id } })
        if (!existStore) {
            return null;
        }
        const existReview = await prisma.review.findFirst({ where: { userId: data.user_id, storeId: data.store_id } });
        if (existReview) {
            return -1;
        }
        const createdReview = await prisma.review.create({
            data:
            {
                userId: data.user_id,
                storeId: data.store_id,
                body: data.body,
                score: data.score
            }
        })
        return createdReview.id;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    }
}

export const getReview = async (reviewId) => {
    try {
        const review = await prisma.review.findFirstOrThrow({ where: { id: reviewId } });
        return review;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    }
}