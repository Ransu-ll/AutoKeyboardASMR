const audio_keyboard00 = new Audio('./audio/keyboard00.wav');
const audio_keyboard01 = new Audio('./audio/keyboard01.wav');
const audio_keyboard02 = new Audio('./audio/keyboard02.wav');
const audio_keyboard03 = new Audio('./audio/keyboard03.wav');
const audio_keyboard04 = new Audio('./audio/keyboard04.wav');
const audio_keyboard05 = new Audio('./audio/keyboard05.wav');
const audio_keyboard06 = new Audio('./audio/keyboard06.wav');
const audio_keyboard07 = new Audio('./audio/keyboard07.wav');
const audio_keyboard08 = new Audio('./audio/keyboard08.wav');
const audio_keyboard09 = new Audio('./audio/keyboard09.wav');
const audio_keyboard10 = new Audio('./audio/keyboard10.wav');
const audio_keyboard11 = new Audio('./audio/keyboard11.wav');
const audio_keyboard12 = new Audio('./audio/keyboard12.wav');
const audio_keyboard13 = new Audio('./audio/keyboard13.wav');
const audio_keyboard14 = new Audio('./audio/keyboard14.wav');
const audio_keyboard15 = new Audio('./audio/keyboard15.wav');

const keyboard_audio_list = [audio_keyboard00, audio_keyboard01, audio_keyboard02,
    audio_keyboard03, audio_keyboard04, audio_keyboard05,
    audio_keyboard06, audio_keyboard07, audio_keyboard08,
    audio_keyboard09, audio_keyboard10, audio_keyboard11,
    audio_keyboard12, audio_keyboard13, audio_keyboard14,
    audio_keyboard15];

// The above was generated with assistance from the following python code
// in the directory where the audio files exist.
`
from pathlib import Path

filePath = Path(__file__).parent.glob('**/*')
files = [x.stem for x in filePath if x.is_file() and x.suffix == ".wav"]

output = ""
output_files = ""
for file in files:
    output += f"const audio_{file} = new Audio('./audio/{file}.wav');\n"
output_files += f"audio_{file}, "

print(output)
print(output_files)
`


let audioPlaying = false;
let clickDelay = 100;
let volume = 1;
let displayState = "dark";

let playButton = document.getElementById("btnPlayAudio");
let toggleModeButton = document.getElementById("btnToggleMode")

let volControlSlider = document.getElementById("inpVolumeControlSlider");
let volControlNumberBox = document.getElementById("inpVolumeControlNumberBox");

let playbackControlSlider = document.getElementById("inpPlaybackControlSlider");
let playbackControlNumberBox = document.getElementById("inpPlaybackControlNumberBox");

function sleep(ms) {
    /**
     * @param {Number} ms - The delay duration in milliseconds
     *
     * Source: https://www.sitepoint.com/delay-sleep-pause-wait/
     */

    return new Promise(resolve => setTimeout(resolve, ms));
}

async function togglePlaying(button) {
    /**
     * @param button - The ID of the button which to change the text of.
     * 
     * Toggles whether or not audio is playing.
     */

    if (audioPlaying) {
        audioPlaying = false;
        button.innerText = "Play";
        
    } else {
        audioPlaying = true;
        button.innerText = "Pause";
    }

    playTypingAudio();
}

async function playTypingAudio() {
    /**
     * @param {Number} delay - The delay between each keyboard click in milliseconds.
     */

    while (audioPlaying) {
        await sleep(clickDelay).then(() => {
            // The delay might have occurred and audioPlaying may have been
            // set to false in between then, hence if statement.
            if (audioPlaying) {
                keyboard_audio_list[Math.floor(Math.random() * keyboard_audio_list.length)].play();
            }
        })
    }
}

function changeVolume(newVolume) {
    for (let i = 0; i < keyboard_audio_list.length; i++) {
        keyboard_audio_list[i].volume = newVolume/100;
    }
}

volControlSlider.oninput = function() {
    changeVolume(this.value);
    volControlNumberBox.value = this.value;
}

volControlNumberBox.oninput = function() {
    changeVolume(this.value);
    volControlSlider.value = this.value;
}

playbackControlSlider.oninput = function() {
    clickDelay = this.value;
    playbackControlNumberBox.value = this.value;
}

playbackControlNumberBox.oninput = function() {
    clickDelay = this.value;
    playbackControlSlider.value = this.value;
}

function toggleMode(state) {
    /**
     * @param state - current display state of page
     * 
     * Toggles the display of the page
     */
    let darkMode = `
    background-color: black;
    color: white;
    `;

    let lightMode = `
    background-color: white;
    color: black;
    `

    if (state == "light") {
        document.body.style.cssText = darkMode;
        displayState = "dark";
        toggleModeButton.innerHTML = "Toggle to Light Mode";
    } else {
        document.body.style.cssText = lightMode;
        displayState = "light";
        toggleModeButton.innerHTML = "Toggle to Dark Mode";
    }
}