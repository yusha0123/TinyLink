if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config.env" });
}
const express = require("express");
const connectDb = require("./config/dbconnect");
const errorHandler = require("./middleware/error");
const path = require("path");
const URLs = require("./models/Url");

const app = express();
connectDb();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tinylink", require("./routes/tinyLink"));
app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`Server running on port : ${port}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err}`);
  server.close(() => process.exit(1));
});

app.use(express.static(path.join(__dirname, "../client", "dist")));

const handleRoutes = function (_, res) {
  res.sendFile(
    path.join(__dirname, "../client/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
};

app.get(["/login", "/register", "/home", "/"], handleRoutes);

app.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    const url = await URLs.findOne({ shortId: id });
    if (!url) {
      return res.sendFile(
        path.join(__dirname, "../client/dist/error.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );
    }
    url.clicks++;
    url.save();
    res.redirect(url.redirectUrl);
  } catch (error) {
    next(error);
  }
});
