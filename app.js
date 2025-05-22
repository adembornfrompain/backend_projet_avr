var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const http = require("http");
require("dotenv").config();

const { connectToMongoDb } = require("./db/db");

var indexRouter = require("./routes/index");
var osRouter = require("./routes/osRouter");
var usersRouter = require("./routes/usersRouter");
var adminRouter = require("./routes/adminRouter");
var clientRouter = require("./routes/clientRouter");
var salesAgentRouter = require("./routes/salesAgentRouter");
var financialOfficer = require("./routes/financialOfficerRouter");
var operationalOfficerRouter = require("./routes/operationalOfficerRouter");
var documentRouter = require("./routes/documentRouter");
var shipmentRouter = require("./routes/shipmentRouter");
var invoiceRouter = require("./routes/invoiceRouter");
var quoteRouter = require("./routes/quoteRouter");
var leadRouter = require("./routes/leadRouter");

  


var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/index", indexRouter);
app.use("/os", osRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/client", clientRouter);
app.use("/salesAgent", salesAgentRouter);
app.use("/financialOfficer", financialOfficer);
app.use("/operationalOfficer", operationalOfficerRouter);
app.use("/document", documentRouter);
app.use("/shipment", shipmentRouter);
app.use("/invoice", invoiceRouter);
app.use("/quote", quoteRouter);
app.use("/lead", leadRouter);










// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({ message: "An error occurred" });
});

const server = http.createServer(app);

server.listen(process.env.Port, () => {
  connectToMongoDb();
  console.log("app is running on port 5000");
});
