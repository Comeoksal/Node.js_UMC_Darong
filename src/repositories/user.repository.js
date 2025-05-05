import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
    try {
        const existUser = await prisma.user.findFirst({ where: { email: data.email } });
        if (existUser) {
            return null;
        }
        const createdUser = await prisma.user.create({ data: data })
        return createdUser.id;
    } catch (err) {
        throw new Error(
            `addUser에 오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    }
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
    try {
        const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
        return user;
    } catch (err) {
        throw new Error(
            `getUser에 오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
    try {
        await prisma.userFavorCategory.create({
            data: {
                userId: userId,
                foodCategoryId: foodCategoryId,
            }
        })
    } catch (err) {
        throw new Error(
            `setPreference에 오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
    try {
        const preferences = await prisma.userFavorCategory.findMany({
            select: {
                id: true,
                userId: true,
                foodCategoryId: true,
                foodCategory: true,
            },
            where: {
                userId: userId,
            },
            orderBy: {
                foodCategoryId: "asc",
            }
        })
        return preferences;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    }
};
