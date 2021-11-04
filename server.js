const express = require('express');
const app = express();
const cors = require('cors');
const port = 4004;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const testController = (req, res) => {
  const { originalUrl, headers, query, params, body } = req;
  res.send({ originalUrl, headers, query, params, body });
}

const router = express.Router();

router
  .route("/")
  .get(testController)
  .post(testController)
  .put(testController)
  .patch(testController)
  .delete(testController);

router
  .route("/check/:serial")
  .get(testController)
  .post(testController)
  .put(testController)
  .patch(testController)
  .delete(testController);

router
  .route("/release/:serial")
  .get(testController)
  .post(testController)
  .put(testController)
  .patch(testController)
  .delete(testController);

app.use("/test", router);

app.listen(port, () => {
  console.log("Server listening on port " + port);
});