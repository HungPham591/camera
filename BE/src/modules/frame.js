const child_process = require('child_process')
const probe = require('ffmpeg-probe')


exports.getBase64 = async (rtsp) => {
    let base64 = "";
    const spawnOptions = [
        "-i",
        rtsp,
        '-vframes',
        '1',
        '-c:v',
        'png',
        '-f',
        'image2pipe',
        '-'
    ];
    const stream = child_process.spawn("ffmpeg", spawnOptions, {
        detached: false
    })
    for await (let data of stream.stdout) {
        base64 += data.toString('base64')
    }
    return base64;
}

exports.getVideoInfo = async (videoPath) => {
    const info = await probe(videoPath);
    return info
}

exports.getFrameAt = async (nth, videoPath) => {
    let base64 = '';
    const args = `ffmpeg -i ${videoPath} -vf "select=eq(n\\,${nth})" -vframes 1 -c:v png -f image2pipe -`;
    const stream = child_process.spawn(args, [], {
        detached: false,
        shell: true
    })
    for await (let data of stream.stdout) {
        console.log(data)
        base64 += data.toString('base64')
    }
    return base64;
}