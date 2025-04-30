import { responseFromStore } from "../dtos/store.dto.js"
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

    const store = await getStore(joinStoreId);

    return responseFromStore({ store });
}