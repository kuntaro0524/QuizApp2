const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

/* normally required */
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/* JSONデータを読むために必要 */
app.use(bodyParser.json());

/* Mongoose DB を読み込む */
mongoose.connect("mongodb://localhost:27017/ibukiquiz", {
  useNewUrlParser: true,
});

app.use(express.static("public"));

// なんか職場内のアドレスへアクセスするために必要なおまじない
// よくわかっていないのでいずれ困ることになりそう
var cors = require("cors");
app.use(cors());

const quiz_schema = {
  question: String,
  answer: String,
  page: Number,
  made_date: String,
  ntrial: Number,
  ncorr: Number,
  corr_ratio: Number,
};

/* definitions of data record on the database: 'ibukiquiz'*/
const QuizInfo = mongoose.model("pppp", quiz_schema, "shakai");

app.get("/quiz", function (req, res) {
  QuizInfo.find(function (err, foundItems) {
    res.send(foundItems);
  });
});

/* json dataを登録するための手続き */
// しばらくは使わないだろう→クイズをクライアントで編集する
app.post("/quiz", function (req, res) {
  /* Expected 'req.body' contains 'quiz information' in json format. */
  const newCond = req.body;
  console.log(req.body);
  /* post されたデータを新たにDBへ登録する */
  const newData = new QuizInfo(newCond);
  newData.save(function (err) {
    if (!err) {
      res.send("Successfully added a new condition");
    } else {
      res.send(err);
    }
  });
});

/* delete を実装する */
app.delete("/quiz", function (req, res) {
  QuizInfo.deleteMany(function (err) {
    if (!err) {
      res.send("successfully deleted all conds");
    } else {
      res.send(err);
    }
  });
});

/* IDを指定してその情報に対して　get/post などする*/
// このアプリではやった回数と正答率などはクライアント側からアップデートしたいのでそのときには使う
// けど、クイズアプリの方で１問ずつ出すとかやるので、それをどう実装するのかにもよるかなぁ。

app
  .route("/quiz/:measID")
  .get(function (req, res) {
    const mid = req.params.measID;
    QuizInfo.findOne({ _id: mid }, function (err, foundCond) {
      if (foundCond) {
        res.send(foundCond);
      } else {
        res.send(err);
      }
    });
  })
  .put(function (req, res) {
    const mid = req.params.measID;
    console.log("PPPP=" + mid);
    /* JSON data */
    const newCond = req.body;
    console.log(newCond);
    QuizInfo.updateOne(
      /* conditions */
      { _id: mid },
      { $set: newCond },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send("Successfully updated article.");
        } else {
          res.send("ERRORERROR");
        }
      }
    );
  })

  /* 正直、メカニズムは理解できていないがこれにより、URLで与えられたIDの条件の一つずつを指定して
　　更新できるようになった。 */

  .patch(function (req, res) {
    const mid = req.params.measID;
    console.log("PPPP=" + mid);
    /* JSON data */
    /* 受け取るのはJSONそのもの */
    /* condの中身のパラメータを一つでも保有していればOK */
    const newCond = req.body;
    console.log(newCond);

    QuizInfo.updateOne(
      /* conditions */
      { _id: mid },
      /* この部分にrequestから受け取ったJSONを入れる */
      { $set: newCond },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send("Successfully updated article.");
        } else {
          res.send("ERRORERROR");
        }
      }
    );
  })

  /* IDを指定してそのエントリを削除するという方法　使うことはなさげ */
  .delete(function (req, res) {
    const mid = req.params.measID;
    QuizInfo.findOneAndDelete(
      /* conditions */
      { _id: mid },
      function (err) {
        if (!err) {
          res.send("Successfully updated article.");
        } else {
          res.send("ERRORERROR");
        }
      }
    );
  });

// // TODO:
app.listen(9201, function () {
  console.log("Server srated on port 9201");
});
