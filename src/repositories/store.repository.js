import { prisma } from '../db.config.js'

//Store 데이터 삽입
export const addStore = async (data) => {
    try {
        const existStore = await prisma.store.findFirst({ where: { regionId: data.region_id, name: data.name } })
        if (existStore) {
            return null;
        }
        const createdStore = await prisma.store.create({ data: { regionId: data.region_id, name: data.name, address: data.address } })
        return createdStore.id;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    }
}

export const getStore = async (storeId) => {
    try {
        const avgScoreResult = await prisma.review.aggregate({
            where: {
                storeId: storeId,
            },
            _avg: {
                score: true,
            }
        })

        const avgScore = avgScoreResult._avg.score !== null ? avgScoreResult._avg.score : 0.0;
        const fixedScore = avgScore !== null ? parseFloat(avgScore.toFixed(1)) : null;
        const updatedScore = await prisma.store.update({ where: { id: storeId }, data: { score: fixedScore } })

        return updatedScore;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    }
}