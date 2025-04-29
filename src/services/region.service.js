import { responseFromRegion } from "../dtos/region.dto";
import {
    addRegion,
    getRegion,
} from "../repositories/region.repository.js";

export const regionUse = async (data) => {
    const joinRegionId = await addRegion({
        name: data.name,
    });
    if (joinRegionId == null) {
        throw new Error("이미 존재하는 지역입니다.");
    }

    const region = await getRegion(joinRegionId);

    return responseFromRegion({ region });
}