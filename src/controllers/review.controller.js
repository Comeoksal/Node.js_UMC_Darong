import { StatusCodes } from "http-status-codes";
import { UseReview } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

export const handleReview = async (req, res, next) => {
  console.log("리뷰 추가를 요청했습니다.");
  console.log('body : ', req.body);

  const review = await UseReview(bodyToReview(req.body));
  // #region Swagger: 리뷰 추가 API
  /*
    #swagger.summary = '리뷰 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              body: { type: "string", example: "맛있습니다.!!" },
              score: { type: "float", example: "4.3"},
            }
          }
        }
      }
    };
      #swagger.responses[200] = {
        description: "리뷰 추가 성공 응답",
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
                  body: { type: "string", example: "리뷰 내용~~" },
                  score: {type : "float", example: "4.3" },
                }
                }
              }
            }
          }
        }
      };
      #swagger.responses[400] = {
        description: "리뷰 추가 실패 응답",
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
      description: "동일 리뷰 작성 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",

            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U005" },
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
  res.status(StatusCodes.OK).success(review);
}