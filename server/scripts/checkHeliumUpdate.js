const axios = require('axios')
const { Activity, validateActivity } = require('../models/activity');
const mailSender = require('../mail/mailSender');

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

module.exports = async (minersToTrack) => {
  console.log('Checking for changes', new Date().addHours(2));

  for (let miner of minersToTrack) {
    let activityKey = await axios.get(`https://api.helium.io/v1/hotspots/${miner}/activity`);
    let activityRawData = await axios.get(`https://api.helium.io/v1/hotspots/${miner}/activity?cursor=${activityKey.data.cursor}`);
    let sentMail = false;

    for (let activityData of activityRawData.data.data) {
      let type = activityData.type;
      
      if (type === 'rewards_v2') {
        let time = new Date(parseInt(activityData.time.toString() + '000')).addHours(2);
        let block = activityData.height;

        Activity.findOne({miner: miner, type: type, time: time, block: block}, async (err, result) => {
          if (!result) {
            console.log('No result found!', 'block: ' + block, 'time: ' + time);

            if (!sentMail) {
              let data = {
                url: `https://explorer.helium.com/hotspots/${miner}/activity`
              }
              mailSender(data);
              sentMail = true;
            }

            let activity = new Activity({
              miner,
              type,
              time,
              block
            });

            await activity.save();
          }
        });
      }
    }
  }

}