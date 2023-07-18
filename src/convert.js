const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');



const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path.replace('app.asar', 'app.asar.unpacked');
ffmpeg.setFfmpegPath(ffmpegPath);


const moment = require('moment');
let totalTime;
let startTime = moment(); // Start time for overall conversion process
let totalVideos = 0; // Total number of video files
let convertedVideos = 0; // Number of converted video files

const videoToAudio = (filePath, sendStatusCallback) => {
  const file = path.parse(filePath);
  const outputFilePath = path.join(file.dir, file.name + '.mp3');

  ffmpeg(filePath)
    .noVideo()
    .format('mp3')
    .on('end', () => {
      console.log(`Successfully converted ${filePath} to audio!`);
      convertedVideos++;
      sendStatusCallback(`Converting: ${filePath}`, `Successfully`);
      if (convertedVideos >= totalVideos) {
        const endTime = moment();
        const duration = moment.duration(endTime.diff(startTime));
        const formattedDuration = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');

        console.log(`Successfully converted all video files to audio in ${formattedDuration}!`);
      }
    })
    .on('error', (err) => {
      console.error(`Error converting ${filePath} to audio: ${err.message}`);
    })
    .on('codecData', data => {
      // HERE YOU GET THE TOTAL TIME
      totalTime = parseInt(data.duration.replace(/:/g, '')) 
   })
    .on('progress', (progress) => {
    
      const percent = Math.round(progress.percent);
      // progressBar.update(percent / 100);
      
      // HERE IS THE CURRENT TIME
      const time = parseInt(progress.timemark.replace(/:/g, ''))
      
      // AND HERE IS THE CALCULATION
      const percents = Math.round((time / totalTime) * 100)

      sendStatusCallback(`Converting: ${filePath}`, percents);
    })
    .save(outputFilePath);
};

module.exports = videoToAudio;
