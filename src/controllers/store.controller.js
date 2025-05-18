import { StatusCodes } from 'http-status-codes'
import { bodyToStore, bodyToStore_2 } from '../dtos/store.dto.js';
import { UseStore } from '../services/store.service.js';
import { GetStore } from '../services/store.service.js';

export const handleStore = async (req, res, next) => {
    console.log("가게 추가를 요청했습니다.");
    console.log("body : ", req.body);

    const store = await UseStore(bodyToStore(req.body));
    // #region Swagger: 가게 추가 API
    /*
      #swagger.summary = '가게 추가 API';
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                region_id: { type: "bigint" },
                name: { type: "string" },
                address: { type: "string" },
              }
            }
          }
        }
      };
      #swagger.responses[200] = {
        description: "가게 추가 성공 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "SUCCESS" },
                error: { type: "object", nullable: true, example: null },
                success: {
                  type: "string", example: "store save complete"
                }
              }
            }
          }
        }
      };
      #swagger.responses[400] = {
        description: "가게 추가 실패 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: { 
                resultType: { type: "string", example: "FAIL" },
                error: {
                  type: "object",
                  properties: {
                    errorCode: { type: "string", example: "U001" },
                    reason: { type: "string" },
                    data: { type: "object" }
                  }
                },
                success: { type: "object", nullable: true, example: null }
              }
            }
          }
        }
      };
    */
    // #endregion
    res.status(StatusCodes.OK).success(store);
}

export const getStoreInfo = async (req, res, next) => {
    console.log("가게 조회를 요청했습니다.");
    console.log("body : ", req.body);

    const store = await GetStore(bodyToStore_2(req.body));
    // #region Swagger: 가게 조회 API
    /*
      #swagger.summary = '가게 조회 API';
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id:  {type: "bigint"},
              }
            }
          }
        }
      };
      #swagger.responses[200] = {
        description: "가게 조회 성공 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "SUCCESS" },
                error: { type: "object", nullable: true, example: null },
                success: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    address: { type: "string" },
                    score: {type: "float"},
                  }
                }
              }
            }
          }
        }
      };
      #swagger.responses[400] = {
        description: "회원 가입 실패 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "FAIL" },
                error: {
                  type: "object",
                  properties: {
                    errorCode: { type: "string", example: "U001" },
                    reason: { type: "string" },
                    data: { type: "object" }
                  }
                },
                success: { type: "object", nullable: true, example: null }
              }
            }
          }
        }
      };
    */
    // #endregion
    res.status(StatusCodes.OK).success(store);
}