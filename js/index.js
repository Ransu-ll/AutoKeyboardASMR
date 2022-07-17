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

function sleep(ms) {
    /**
     * @param {Number} ms - The delay duration in milliseconds
     *
     * Source: https://www.sitepoint.com/delay-sleep-pause-wait/
     */

    return new Promise(resolve => setTimeout(resolve, ms));
}

function togglePlaying(button) {
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

    playTypingAudio(clickDelay);

}

async function playTypingAudio(delay) {
    /**
     * @param {Number} delay - The delay between each keyboard click in milliseconds.
     */

    while (audioPlaying) {
        await sleep(delay).then(() => {
            keyboard_audio_list[Math.floor(Math.random() * keyboard_audio_list.length)].play();
        })
    }
}