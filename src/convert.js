const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ProgressBar = require('progress');
const moment = require('moment');

let startTime = moment(); // Start time for overall conversion process
let totalVideos = 0; // Total number of video files
let convertedVideos = 0; // Number of converted video files

const  videoToAudio = (filePath) => {
  const file = path.parse(filePath);
  const outputFilePath = path.join(file.dir, file.name + '.mp3');


  const progressBar = new ProgressBar(`Converting ${filePath} [:bar] :percent`, {
    complete: '◼︎',
    incomplete: '◻︎',
    width: 20,
    total: 100,
  });

  ffmpeg(filePath)
    .noVideo()
    .format('mp3')
    .on('end', () => {
      console.log(`Successfully converted ${filePath} to audio!`);
      convertedVideos++;

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
    .on('progress', (progress) => {
      const percent = Math.round(progress.percent);
      progressBar.update(percent / 100);
    })
    .save(outputFilePath);
}

module.exports = videoToAudio