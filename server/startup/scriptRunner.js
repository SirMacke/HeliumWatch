const checkHeliumUpdate = require('../scripts/checkHeliumUpdate');

async function main() {
  let minuteInterval = 5;
  let minersToTrack = ['112UVuusLKFsk71HwfSB347xHdDZ3f9n2Q1FbcQg5s2945V3F4Nk'];

  checkHeliumUpdate(minersToTrack);

  setInterval(() => {
    checkHeliumUpdate(minersToTrack);
  }, minuteInterval * 60 * 1000);

}

module.exports = { main }