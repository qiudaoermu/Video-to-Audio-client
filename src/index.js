// Select Files button click event
let filePaths = [];

document.getElementById('select-files').addEventListener('click', () => {
  window.api.send('open-dialog');
});

// Conversion status update event
window.api.receive('conversion-status', (event, statusText, percent, filePath) => {  
  const progressBar = document.getElementById(`progress-bar-${filePath}`);
  const progressBarFill = progressBar.querySelector('.progress-bar-fill');
  const progressBarText = progressBar.querySelector('.progress-bar-text');

  if (percent === "Successfully") {
    progressBarFill.style.width = `100%`;
    progressBarText.innerText = `${statusText}  Completed`;
  } else {
    progressBarFill.style.width = `${percent}%`;
    progressBarText.innerText = `${statusText}  ${percent}%`;
  }
  progressBar.classList.toggle('complete', percent === 100);
});

// Convert button click event
document.getElementById('convert-btn').addEventListener('click', () => {
  // const selectedFiles = document.getElementById('selected-files').value;
  // const filePaths = selectedFiles.split('\n').filter((filePath) => filePath.trim() !== '');
  filePaths.forEach((filePath) => {
    //  createProgressBar(filePath);
    window.api.send('convert-video', filePath);
  });
});

// Receive selected files from main process
window.api.receive('selected-files', (event,emitFilePaths) => {
  // const selectedFilesTextArea = document.getElementById('selected-files');
  // selectedFilesTextArea.value = filePaths.join('\n');
  filePaths = emitFilePaths;
  filePaths.forEach((filePath) => {
     createProgressBar(filePath);
  });
});


function getRandomClass() {
  let ramdomclass = ['bg-success','bg-info','bg-warning','bg-danger','bg-default']
  const randomIndex = Math.floor(Math.random() * ramdomclass.length);
  return ramdomclass[randomIndex];
}
// Create progress bar for a file
function createProgressBar(filePath) {
  let randomItemPrograssClass = getRandomClass()
  const progressBarContainer = document.getElementById('progress-bar-container');
  const progressBar = document.createElement('div');
  progressBar.classList.add('custom-progress-bar');
  progressBar.classList.add('progress');
  progressBar.setAttribute('role', 'progressbar');
  progressBar.setAttribute('aria-label', 'Animated striped');
  progressBar.id = `progress-bar-${filePath}`;

  const progressBarFill = document.createElement('div');
  progressBarFill.classList.add('progress-bar-fill');
  
  progressBarFill.classList.add('progress-bar');
  progressBarFill.classList.add('progress-bar-animated');
  progressBarFill.classList.add('progress-bar-striped');
  progressBarFill.classList.add(randomItemPrograssClass);
  const progressBarText = document.createElement('div');
  progressBarText.classList.add('progress-bar-text');
  progressBarText.innerText = `${filePath}`;
  progressBar.appendChild(progressBarFill);
  progressBar.appendChild(progressBarText);
  progressBarContainer.appendChild(progressBar);
}