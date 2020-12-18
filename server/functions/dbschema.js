let db = {
  users: [
    {
      sign_id: "gkapa",
      email: "user@email.com",
      uid: "E3ewYiKD1ebVXggoHitxG5YJeqm1",
      custom_id: "りんご",
      authoriy: "user",
      created_at: "2020-11-12T09:06:49.316Z",
      img_url: "1be160537d8b",
      introduce: "Hello, World!",
    },
  ],
  posts: [
    {
      idx: 1,
      status: "",
      category: "",
      title: "",
      body: "",
      created_at: TimeStamp,
      donor: "",
      like_cnt: 0,
      view_cnt: 0,
      comment_cnt: 0,
    },
  ],
  comments: [
    {
      recipient: "",
      donor: "",
      body: "",
      created_at: "2019-03-15T10:59:52.798Z",
      like_cnt: 0,
    },
  ],
  screams: [
    {
      uid: "",
      title: "",
      body: "",
      created_at: "2019-03-15T10:59:52.798Z",
      like_cnt: 5,
      comment_cnt: 3,
    },
  ],

  notifications: [
    {
      recipient: "user",
      donor: "john",
      screamId: "E3ewYiKD1ebVXggoHitxG5YJeqm1",
      read: "true | false",
      type: "like | comment",
      createdAt: "2019-03-15T10:59:52.798Z",
    },
  ],
};

const userDetails = {
  // Redux data
  credentials: {
    sign_id: "gkapa",
    email: "user@email.com",
    uid: "E3ewYiKD1ebVXggoHitxG5YJeqm1",
    custom_id: "りんご",
    authoriy: "user",
    created_at: "2020-11-12T09:06:49.316Z",
    img_url: "1be160537d8b",
    introduce: "Hello, World!",
  },
  likes: [
    {
      sign_id: "user",
      scream_id: "hh7O5oWfWucVzGbHH2pa",
    },
    {
      sign_id: "user",
      scream_id: "3IOnFoQexRcofs5OhBXO",
    },
  ],
};
