// 참고:
// https://colinhacks.com/essays/building-a-spa-with-nextjs
// https://qiita.com/thesugar/items/73a169c4d23e4bd91554

// 예를들면,
// source: '/backend/:path*',
// destination: 'https://example.com/:path*',
// 일 때, /backend 이하의 모든 경로가 example.com 으로 루팅된다.

module.exports = {
  async rewrites() {
    return [
      // API 리퀘스트는 rewrite 제외
      {
        source: "/api/:any*",
        destination: "/api/:any*",
      },
      // 모든 페이지가 pages/index를 사용하도록 설정
      {
        source: "/:any*",
        destination: "/",
      },
    ];
  },
};

// npm i react-router-dom history jwt-decode
