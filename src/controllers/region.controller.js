import { StatusCodes } from 'http-status-codes'
import { bodyToRegion } from "../dtos/region.dto.js"
import { UseRegion } from "../services/region.service.js"

export const handleRegion = async (req, res, next) => {
    console.log("지역 추가를 요청했습니다.");
    console.log("body : ", req.body);

    const region = await UseRegion(bodyToRegion(req.body));
    // #region Swagger: 지역 추가 API
    /*
      #swagger.summary = '지역 추가 API';
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
              }
            }
          }
        }
      };
      #swagger.responses[200] = {
        description: "지역 추가 성공 응답",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                resultType: { type: "string", example: "SUCCESS" },
                error: { type: "object", nullable: true, example: null },
                success: {
                  type: "string", 
                  properties: {
                  name: { type: "string", example: "지역명" },
                }
                }
              }
            }
          }
        }
      };
      #swagger.responses[400] = {
        description: "지역 추가 실패 응답",
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
      description: "지역명 중복 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U002" },
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
    res.status(StatusCodes.OK).success(region);
}