import { pool } from '../db.config.js';

// Region 데이터 삽입
export const addRegion = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [confirm] = await pool.query(
            `select exists(select 1 from region where name = ?) as isExistName;`,
            data.name
        );
        if (confirm[0].isExistName) {
            return null;
        }

        const [result] = await pool.query(
            `insert into region (name) values (?)`,
            data.name
        )

        return result.insetId;
    } catch (err) {
        throw new Error(
            `오류 발생. 요청 파라미터 확인. (${err})`
        );
    } finally {
        conn.release();
    }
}

// 지역 정보 얻기
export const getRegion = async (regionId) => {
    const conn = await pool.getConnection();

    try {
        const [region] = await pool.query(
            `select * from region where id = ?`,
            regionId
        );

        console.log('getRegion 중 값 : ' + region);

        if (region.length == 0) {
            return null;
        }

        return region;
    } catch (err) {
        throw new Error(
            `오류 발생. 요청 파라미터 확인. (${err})`
        );
    } finally {
        conn.release();
    }
}