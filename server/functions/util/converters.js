exports.splitTimeStamp = (timeStamp) => {
  // timeStamp: { _seconds: 1608567076, _nanoseconds: 227000000 }

  // ymdhms: 2020-12-22T13:05:52.000Z
  const japanUTC = 32400;
  const ymdhms = new Date((timeStamp._seconds + japanUTC) * 1000).toJSON();

  // console.log({
  //   1: ymdhms,
  //   2: ymdhms.toJSON(),
  //   3: typeof ymdhms,
  // });
  // if (data.match(/(T)|(Z$)/g).length !== 2) return "";
  console.log(ymdhms);

  // dayHour: [ '2020-03-13', '10:59:52' ]
  const dayHour = ymdhms.match(/(.+(?=T))|((?<=T).+(?=\.))/g);

  const splited = [...dayHour[0].split("-"), ...dayHour[1].split(":")];

  const resData = {
    days: dayHour[0],
    hours: dayHour[1],
    year: splited[0],
    month: splited[1],
    day: splited[2],
    hour: splited[3],
    min: splited[4],
    sec: splited[5],
  };

  return resData;
};
