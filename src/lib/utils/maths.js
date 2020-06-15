
function getRandomNumber(maxNumber) {
  return (Math.floor((Math.random() * maxNumber)));
}


function getNextRoundRobin(total, current) {
  return ((current + 1) % total);
}

export { getNextRoundRobin, getRandomNumber };
