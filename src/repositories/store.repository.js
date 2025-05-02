import { pool } from '../db.config.js'

//Store 데이터 삽입
export const addStore = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [confirm] = await pool.query(
            `select exists(select 1 from store where region_id = ? AND name = ?) as isExistStore;`,
            [
                data.region_id,
                data.name,
            ]
        )
        if (confirm[0].isExistStore) {
            return null;
        }

        const [result] = await pool.query(
            `insert into store (region_id, name, address, score) values (?, ?, ?, ?);`,
            [
                data.region_id,
                data.name,
                data.address,
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

export const getStore = async (storeId) => {
    const conn = await pool.getConnection();

    try {
        const [storeRows] = await pool.query(`select * from store where id = ?;`, [storeId]);

        if (storeRows.length == 0) {
            return null;
        }

        const store = storeRows[0];

        const [avgScoreRows] = await pool.query(
            `select avg(score) as avgScore from review where store_id = ?`,
            [
                storeId,
            ]
        )

        // 평균 점수 소수점 1자리로 반올림 (예: 4.3)
        const avgScore = avgScoreRows[0].avgScore;
        store.score = avgScore ? parseFloat(avgScore.toFixed(1)) : null;

        pool.query(
            `update store set score = ? where id = ?;`,
            [
                store.score,
                store.id,
            ]
        )
        return store;

    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
}