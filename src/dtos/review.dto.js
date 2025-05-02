export const bodyToReview = (body) => {
    return {
        user_id: body.user_id,
        store_id: body.store_id,
        body: body.body,
        score: body.score,
    }
}

export const responseFromReview = (body) => {
    const review = body.review;

    return {
        user_id: review.user_id,
        store_id: review.store_id,
        body: review.body,
        score: review.score,
    }
}