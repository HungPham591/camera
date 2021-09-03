const child_process = require('child_process')
const probe = require('ffmpeg-probe')

exports.getVideoInfo = async (videoPath) => {
    const info = await probe(videoPath);
    return info
}
exports.getFrameAt = async (nth, videoPath) => {
    let base64 = 'data:image/png;base64,';
    const args = `ffmpeg -i ${videoPath} -vf "select=eq(n\\,${nth - 1})" -vframes 1 -c:v jpg -f image2pipe -`;
    const stream = child_process.spawn(args, [], {
        detached: false,
        shell: true
    })
    for await (let data of stream.stdout) {
        console.log(data)
        base64 += data.toString('base64')
    }
    return 'data:image/png;base64,' + base64;
}