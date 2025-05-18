import { responseFromStore, responseFromStore_2 } from "../dtos/store.dto.js"
import { DuplicateStoreError, NoExistStoreError } from "../error.js"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import {
    addStore,
    getStore,
} from "../repositories/store.repository.js"

export const UseStore = async (data) => {
    const joinStoreId = await addStore({
        region_id: data.region_id,
        name: data.name,
        address: data.address,
    })

    if (!joinStoreId) {
        throw new DuplicateStoreError("이미 존재하는 가게입니다.", data);
    }

    return responseFromStore({ message: "store save complete" });
}

export const GetStore = async (data) => {
    try {
        const store = await getStore(data.id);
        return responseFromStore_2({ store });
    } catch (err) {
        // Prisma가 던진 특정 에러를 가로채서 상태 코드 커스터마이징
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                // P2025: Record not found
                throw new NoExistStoreError("해당 가게를 찾을 수 없습니다.", { id: data.id });
            }
        }

        // 나머지는 그대로 
        throw err;
    }
}