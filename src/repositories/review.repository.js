import { pool } from "../db.config.js";

//Review 데이터 삽입 (null 반환시 존재하지 않는 가게, -1 반환시 이미 리뷰를 작성한 가게)
export const addReview = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [confirm_existStore] = await pool.query(
            `select exists(select 1 from store where id = ?) as isExistStore;`,
            [
                data.store_id,
            ]
        )
        if (!confirm_existStore[0].isExistStore) {
            return null;
        }

        const [confirm_existReview] = await pool.query(
            `select exists(select 1 from review where user_id = ? AND store_id = ?) as isExistReview;`,
            [
                data.user_id,
                data.store_id,
            ]
        )
        if (confirm_existReview[0].isExistReview) {
            return -1;
        }

        const [result] = await pool.query(
            `insert into review (user_id, store_id, body, score) values (?, ?, ?, ?);`,
            [
                data.user_id,
                data.store_id,
                data.body,
                data.score,
            ]
        )

        return result.insertId;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
}

export const getReview = async (reviewId) => {
    const conn = await pool.getConnection();

    try {
        const [review] = await pool.query(`select * from review where id = ?;`, [reviewId]);

        if (review.length == 0) {
            return null;
        }

        return review[0];
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
}