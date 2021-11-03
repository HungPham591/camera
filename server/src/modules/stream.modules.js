const child_process = require('child_process');
const path = require("path");
const fs = require('fs');

const Stream = class {
    constructor(camera) {
        this.camera = camera;
        this.stream = null;

        this.dirPath = path.join(__dirname, '..', "public", 'stream', this.camera._id.toString());
        if (!fs.existsSync(this.dirPath)) fs.mkdirSync(this.dirPath);
        this.filePath = path.join(this.dirPath, 'index.m3u8');
    }
    startStream() {
        const spawnOptions = [
            "-i",
            this.camera.camera_link,
            '-acodec',
            'copy',
            '-vcodec',
            'copy',
            '-f',
            'hls',
            '-strftime',
            '1',
            '-hls_segment_filename',
            `${this.dirPath}/%Y-%m-%d_%H-%M-%S.ts`,
            '-hls_flags',
            'delete_segments',
            this.filePath
        ]
        this.stream = child_process.spawn('ffmpeg', spawnOptions, { detached: false });
    }
    stopStream() {
        this.stream.kill('SIGINT');
        this.removeOldFile();
    }
    removeOldFile() {
        fs.rmdirSync(this.dirPath, { recursive: true, force: true });
    }
}

module.exports = Stream;