let db = {
  users: [
    {
      signId: "",
      email: "email@email.com",
      uid: "BIBID",
      customId: "",
      auth: "",
      createdAt: "2020-11-12T09:06:49.316Z",
      imageUrl: "image/aaaaaaaaaaaaaaaaaa",
      introduce: "Hello, my name is user, nice to meet you",
    },
  ],
  screams: [
    {
      signId: "",
      title: "",
      body: "",
      createdAt: "2019-03-15T10:59:52.798Z",
      likeCount: 5,
      commentCount: 3,
    },
  ],
  comments: [
    {
      signId: "",
      scremId: "",
      body: "This is a sample scream",
      createdAt: "2019-03-15T10:59:52.798Z",
      likeCount: 0,
    },
  ],
  notifications: [
    {
      recipient: "user",
      sender: "john",
      read: "true | false",
      screamId: "kdjsfgdksuufhgkdsufky",
      type: "like | comment",
      createdAt: "2019-03-15T10:59:52.798Z",
    },
  ],
};

const userDetails = {
  // Redux data
  credentials: {
    signId: "id",
    email: "email@email.com",
    uid: "BIBID",
    customId: "id",
    auth: "",
    createdAt: "2020-11-12T09:06:49.316Z",
    imageUrl: "image/aaaaaaaaaaaaaaaaaa",
    introduce: "Hello, my name is user, nice to meet you",
  },
  likes: [
    {
      signId: "user",
      screamId: "hh7O5oWfWucVzGbHH2pa",
    },
    {
      signId: "user",
      screamId: "3IOnFoQexRcofs5OhBXO",
    },
  ],
};
