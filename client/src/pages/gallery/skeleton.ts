export interface Props {
  uid: number;
  title: string;
  body?: any;
  doner: string | number;
  created_at: string;
  like_cnt: number;
  comment_cnt: number;
}

export const head = {
  uid: "番号",
  title: "タイトル",
  created_at: "作成日",
  doner: "作成者",
  like_cnt: "いいね",
};

export const posts: Props[] = [
  {
    uid: 1,
    title: "Post Title #1",
    created_at: "20.12.01",
    doner: "writer",
    like_cnt: 3,
    comment_cnt: 3,
  },
  {
    uid: 2,
    title:
      "Post Title #2fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    created_at: "20.12.01",
    doner: "writer",
    like_cnt: 3,
    comment_cnt: 3,
  },
  {
    uid: 3,
    title: "Post Title #3",
    created_at: "20.12.01",
    doner: "writer",
    like_cnt: 3,
    comment_cnt: 3,
  },
];
