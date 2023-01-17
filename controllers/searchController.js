const controller = {};
const axios = require("axios");

//search api
controller.search = async (req, res) => {
  try {
    //get query in endpoint
    const filter = req.query;
    let filterquery;
    let filterkey;

    //store key and query
    for (key in filter) {
      filterkey = filter[key];
      filterquery = key;
    }

    //store all comment data
    const promises = [];
    const comment = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    promises.push(comment);

    //return match data with the query
    if (promises[0].data) {
      //match with postId
      if (filterquery == "postId") {
        const match_comment = [];
        promises[0].data.forEach((x) => {
          if (x.postId == filterkey) {
            match_comment.push(x);
          }
        });
        res.send({ result: match_comment });
      }
      //match with Id
      if (filterquery == "id") {
        const match_comment = [];
        promises[0].data.forEach((x) => {
          if (x.id == filterkey) {
            match_comment.push(x);
          }
        });
        res.send({ result: match_comment });
      }
      //match with Name
      if (filterquery == "name") {
        const match_comment = [];
        promises[0].data.forEach((x) => {
          if (x.name.includes(filterkey)) {
            match_comment.push(x);
          }
        });
        res.send({ result: match_comment });
      }

      //match with Email
      if (filterquery == "email") {
        const match_comment = [];
        promises[0].data.forEach((x) => {
          if (x.email.includes(filterkey)) {
            match_comment.push(x);
          }
        });
        res.send({ result: match_comment });
      }

      //match with Body
      if (filterquery == "body") {
        const match_comment = [];
        promises[0].data.forEach((x) => {
          if (x.body.includes(filterkey)) {
            match_comment.push(x);
          }
        });
        res.send({ result: match_comment });
      } else {
        res.send({ result: promises[0].data });
      }
    }
  } catch (err) {}
};

module.exports = controller;
