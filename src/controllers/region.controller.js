import { StatusCodes } from 'http-status-codes'
import { bodyToRegion } from "../dtos/region.dto.js"
import { regionUse } from "../services/region.service.js"

export const handleRegion = async (req, res, next) => {
    console.log("지역 추가를 요청했습니다.");
    console.log("body : ", req.body);

    const region = await regionUse(bodyToRegion(req.body));
    res.status(StatusCodes.OK).json({ result: region });
}