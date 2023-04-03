const getRandomNumbersService = (req) => {
  let msg = 0;
  //This function generates N random numbers, being N the query inserted by the user. Given the case that
  //the user decides to not introduce a number, the function will use a default value of 10000, as seen below
  req.query.hasOwnProperty("cant") ? (msg = parseInt(req.query.cant)) : (msg = 10000);

  let arrayRandomNum = [];
  let arrayUsedNumber = [];
  let arrayRepeatedResult = [];
  //The first step is to generate the N numbers and to save them in an auxiliar array
  for (let i = 0; i < msg; i++) {
    arrayRandomNum.push(Math.floor(Math.random() * 1000) + 1);
  }

  //The next step is to iterate through the auxiliar array, with the purpose of counting the times a number
  //repeats itself. Once the loop starts, we check if the cycled number exist inside another auxiliar array
  //called arrayUsedNumber. If it already exists, we ignore it and we proceed with the next number,
  //otherwise, we add it to the forementioned array. We later proceed to use a third auxiliar array, called
  //arrayRepeatedResult. This array will be filled by a key:value, being the key the N number, previously generated,
  //and the value being the times it has repeated itself, using a filter in the first auxiliar with this N number
  //and checking its length
  arrayRandomNum.forEach((num) => {
    if (!arrayUsedNumber.includes(num)) {
      arrayUsedNumber.push(num);
      arrayRepeatedResult.push({
        [num]: arrayRandomNum.filter((repeatedNum) => repeatedNum == num).length,
      });
    }
  });
  return { msg, arrayRepeatedResult };
};

export { getRandomNumbersService };
