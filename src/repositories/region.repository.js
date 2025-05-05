import { prisma } from '../db.config.js';

// Region 데이터 삽입
export const addRegion = async (data) => {
    try {
        const existRegion = await prisma.region.findFirst({ where: { name: data.name } });
        if (existRegion) {
            return null;
        }
        const createdRegion = await prisma.region.create({
            data: {
                name: data.name,
            }
        })
        return createdRegion.id;
    } catch (err) {
        throw new Error(
            `오류 발생. 요청 파라미터 확인. (${err})`
        );
    }
}

// 지역 정보 얻기
export const getRegion = async (regionId) => {
    try {
        const region = await prisma.region.findFirstOrThrow({ where: { id: regionId } })
        if (!region) {
            return null;
        }
        return region;
    } catch (err) {
        throw new Error(
            `오류 발생. 요청 파라미터 확인. (${err})`
        );
    }
}