const controller = {};
const axios = require("axios");

//get post api
controller.getPost = async (req, res) => {
  //comment data api

  let comment = "https://jsonplaceholder.typicode.com/comments";

  //post data api
  let post = "https://jsonplaceholder.typicode.com/posts";

  const requestComment = axios.get(comment);
  const requestPost = axios.get(post);

  //start request
  try {
    //for store return data from post data and comment data api
    let combined;

    //get return data from post data and comment data api

    await axios.all([requestComment, requestPost]).then(
      axios.spread((...responses) => {
        const responseComment = responses[0].data;
        const responsePost = responses[1].data;
        combined = { responseComment, responsePost };
      })
    );

    //cal for total of post
    const postlength = combined.responsePost.length;

    const post_id_length = [];

    //cal for total comment of each post
    for (let index = 1; index < postlength + 1; index++) {
      var post_match_length = combined.responseComment.filter(function (item) {
        return item.postId == index;
      }).length;

      post_id_length.push({
        post_id: index,
        total_number_of_comments: post_match_length,
      });
    }

    const promises = [];
    if (postlength && post_id_length) {
      //get each post data detail
      for (let index = 1; index < postlength + 1; index++) {
        const result = axios.get(
          `https://jsonplaceholder.typicode.com/posts?id=${index}`
        );
        promises.push(result);
      }

      const results = await Promise.all(promises);

      //store post data detail
      const post_detail = [];
      for (let i = 0; i < postlength; i++) {
        if (results[i]) {
          post_detail.push({
            post_id: results[i].data[0].id,
            post_title: results[i].data[0].title,
            post_body: results[i].data[0].body,
          });
        }
      }

      //merge total comment of each post with post detail data
      const merge = (post_id_length, post_detail) => {
        const merge_post = [];

        post_id_length.forEach((x) => {
          post_detail.forEach((y) => {
            if (x.post_id === y.post_id) {
              merge_post.push({ ...y, ...x });
            }
          });
        });

        return merge_post;
      };

      const postdetail_with_length = merge(post_id_length, post_detail);

      //sort desc based on total of number comment
      const sort_from_top_post = postdetail_with_length
        .slice()
        .sort((a, b) => b.total_number_of_comments - a.total_number_of_comments);

      //api response final data
      res.send({
        data: sort_from_top_post,
      });
    }
  } catch (err) {}
};

module.exports = controller;
