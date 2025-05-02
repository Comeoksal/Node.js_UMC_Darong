import { StatusCodes } from 'http-status-codes'
import { bodyToStore, bodyToStore_2 } from '../dtos/store.dto.js';
import { UseStore } from '../services/store.service.js';
import { GetStore } from '../services/store.service.js';

export const handleStore = async (req, res, next) => {
    console.log("가게 추가를 요청했습니다.");
    console.log("body : ", req.body);

    const store = await UseStore(bodyToStore(req.body));
    res.status(StatusCodes.OK).json({ result: store });
}

export const getStoreInfo = async (req, res, next) => {
    console.log("가게 조회를 요청했습니다.");
    console.log("body : ", req.body);

    const store = await GetStore(bodyToStore_2(req.body));
    res.status(StatusCodes.OK).json({ result: store });
}