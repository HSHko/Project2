export interface Props {
  uid: number;
  category: string;
  title: string;
  body?: any;
  doner: string | number;
  created_at: string;
  view_cnt: number;
  like_cnt: number;
  comment_cnt: number;
}

export const head = {
  uid: "番号",
  category: "分類",
  title: "タイトル",
  doner: "作成者",
  created_at: "作成日",
  view_cnt: "アクセス",
  like_cnt: "いいね",
};

export const posts: Props[] = [
  {
    uid: 1,
    category: "一般",
    title: "Post Title #1",
    created_at: "20.12.01",
    doner: "writer",
    like_cnt: 3,
    view_cnt: 30,
    comment_cnt: 3,
  },
  {
    uid: 2,
    category: "一般",
    title:
      "Post Title #2ffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccfffffffffffffxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    created_at: "20.12.01",
    doner: "writer",
    like_cnt: 3,
    view_cnt: 16323420,
    comment_cnt: 3,
  },
  {
    uid: 3,
    category: "一般",
    title: "Post Title #3",
    created_at: "20.12.01",
    doner: "writer",
    like_cnt: 3,
    view_cnt: 10,
    comment_cnt: 3,
  },
];
