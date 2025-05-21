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
              region_id: { type: "integer" },
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
                  errorCode: { type: "string", example: "400" },
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
    #swagger.responses[409] = {
    description: "가게 중복 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U003" },
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
  console.log("params : ", req.params);

  const store = await GetStore(bodyToStore_2(req.params));
  // #region Swagger: 가게 조회 API
  /*
    #swagger.summary = '가게 조회 API';
    #swagger.requestParams = {
      required: true,
      content: {
        "application/json": {
          
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
      description: "가게 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "400" },
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
    #swagger.responses[404] = {
    description: "존재하지 않는 가게 조회 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U004" },
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