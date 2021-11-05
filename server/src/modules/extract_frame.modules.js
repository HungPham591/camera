const child_process = require('child_process')


const ExtractFrame = class {
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
            '-r',
            '1',
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
        stream.stderr.on('data', (data) => { });
    }
    stop() {

    }
}

module.exports = ExtractFrame