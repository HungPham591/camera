const { data } = require('@tensorflow/tfjs-node');
const child_process = require('child_process')


const Rtsp = class {
    constructor(rtsp) {
        this.rtsp = rtsp;
        this.frame = '';
        this.capture()
    }
    getFrame() {
        return this.frame;
    }
    capture() {
        const spawnOptions = [
            "-i",
            this.rtsp,
            '-vf',
            'hue=s=0',
            '-r',
            '5',
            '-q:v',
            '31',
            '-c:v',
            'mjpeg',
            '-f',
            'image2pipe',
            '-'
        ];
        const stream = child_process.spawn("ffmpeg", spawnOptions, {
            detached: false,
        })
        stream.stdout.on('data', (data) => {
            this.frame = data
        })
    }
}

module.exports = Rtsp