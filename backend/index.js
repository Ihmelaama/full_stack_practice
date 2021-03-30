const express = require("express");
const cors = require("cors");
const router = require("./routes/game");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(router);
//router(app);

/*
router.get("/", (req, res) => {
  res.send("<h1>moro!</h1>");
});
*/

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
