import { responseFromStore, responseFromStore_2 } from "../dtos/store.dto.js"
import {
    addStore,
    getStore,
} from "../repositories/store.repository.js"

export const UseStore = async (data) => {
    const joinStoreId = await addStore({
        region_id: data.region_id,
        name: data.name,
        address: data.address,
        score: data.score,
    })
    const message = joinStoreId ? "store save complete" : "store save fail";
    return responseFromStore({ message });
}

export const GetStore = async (data) => {
    const store = await getStore(data.id);
    return responseFromStore_2({ store });
}