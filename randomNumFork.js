process.on("message", (msg) => {
  let arrayRandomNum = [];
  let arrayUsedNumber = [];
  let arrayRepeatedResult = [];
  for (let i = 0; i < msg; i++) {
    arrayRandomNum.push(Math.floor(Math.random() * 1000) + 1);
  }

  arrayRandomNum.forEach((num) => {
    if (!arrayUsedNumber.includes(num)) {
      arrayUsedNumber.push(num);
      arrayRepeatedResult.push({
         [num]: arrayRandomNum.filter((repeatedNum) => repeatedNum == num).length,
      });
    }
  });
  process.send({msg, arrayRepeatedResult});
});
