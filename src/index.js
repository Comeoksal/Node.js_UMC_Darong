import dotenv from "dotenv"
import cors from "cors"
import express from 'express'
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from 'swagger-ui-express'

import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleStore, getStoreInfo } from "./controllers/store.controller.js";
import { handleRegion } from "./controllers/region.controller.js";
import { handleReview } from "./controllers/review.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

/** response setting */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**api list */
app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/store", handleStore);
app.get("/api/v1/store", getStoreInfo);
app.post("/api/v1/region", handleRegion);
app.post("/api/v1/review", handleReview);

app.get('/', (req, res) => {
  console.log("/");
  res.send('Hello UMC!');
});

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

/**swagger setting */
app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

/**logger setting*/
const myLogger = (req, res, next) => {
  console.log("LOGGED");
  next();
}

app.use(myLogger);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

/** listen */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})