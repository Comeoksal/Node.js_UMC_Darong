import { StatusCodes } from 'http-status-codes'
import { bodyToStore } from '../dtos/store.dto.js';
import { UseStore } from '../services/store.service.js';

export const handleStore = async (req, res, next) => {
    console.log("가게 추가를 요청했습니다.");
    console.log("body : ", req.body);

    const store = await UseStore(bodyToStore(req.body));
    res.status(StatusCodes.OK).json({ result: store });
}