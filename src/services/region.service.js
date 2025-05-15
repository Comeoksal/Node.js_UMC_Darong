import { responseFromRegion } from "../dtos/region.dto.js";
import { DuplicateRegionError } from "../error.js";
import {
    addRegion,
    getRegion,
} from "../repositories/region.repository.js";

export const UseRegion = async (data) => {
    const joinRegionId = await addRegion({
        name: data.name
    });
    if (joinRegionId == null) {
        throw new DuplicateRegionError("이미 존재하는 지역입니다.", data);
    }

    const region = await getRegion(joinRegionId);

    return responseFromRegion({ region });
}