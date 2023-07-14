document.getElementById('convert-btn').addEventListener('click', () => {
  window.api.send('open-dialog');
});

window.api.receive('selected-files', (event,filePaths) => {
  console.log(event,"event")
  convertVideos(filePaths);
});

function convertVideos(filePaths) {
  console.log(filePaths,"filePaths")
  console.log(Array.from(filePaths))
  filePaths.forEach((filePath) => {
    convertVideoToAudio(filePath);
  });
}

function convertVideoToAudio(filePath) {
  // Use the video to audio conversion logic from the earlier code
  // Update the videoToAudio function to handle a single file conversion
}
function handleSetTitle (event, title) {
 console.log(event)
}