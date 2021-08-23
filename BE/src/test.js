const canvas = require('canvas')
// const faceapi = require("face-api.js");
const cv = require('opencv4nodejs');
// require('@tensorflow/tfjs-node')

const url = 'rtsp://admin:ASIXNW@192.168.1.5:554/H.264';
const { Canvas, Image, ImageData } = canvas;

let listDetect = [];
let loop = 0;

module.exports = async (input, callback) => {
    // console.log(process.env.controlCamera);

    // faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

    // await Promise.all([
    //     faceapi.nets.ssdMobilenetv1.loadFromDisk("./src/weights"),
    //     faceapi.nets.faceRecognitionNet.loadFromDisk("./src/weights"),
    //     faceapi.nets.faceLandmark68Net.loadFromDisk("./src/weights")
    // ])

    // detect();
    // test()
    // test1();
    // test3()
    // test4();
    // test5()
    // liveStreaming()
}
const liveStreaming = () => {
    console.log('start')
    const child_process = require('child_process')
    const spawnOptions = [
        "-i",
        url,
        '-f',
        'mpegts',
        '-codec:v',
        'mpeg1video',
        '-loglevel',
        'quiet',
        "-stats",
        "-r",
        '30',
        '-'
    ];
    const stream = child_process.spawn("ffmpeg", spawnOptions, {
        detached: false
    })
    stream.stdout.on('data', async (data) => {
        let base64 = 'data:image/png;base64,' + cv.imencode('.jpg', data).toString('base64');
        console.log(base64)
    })
}
const test5 = () => {
    isun
    try {
        new cv.VideoCapture(url)
        new cv.VideoCapture(url)
        new cv.VideoCapture(url)
    } catch (err) {
        test5()
    }
}

const test = () => {
    video = new cv.VideoCapture(url);
    console.log('fps: ' + video.get(cv.CAP_PROP_FPS))
    console.log('frame count: ' + video.get(cv.CAP_PROP_FRAME_COUNT))
    console.log('time: ' + video.get(cv.CAP_PROP_FRAME_COUNT) / video.get(cv.CAP_PROP_FPS))
}

const test1 = async () => {
    console.log('start')
    const child_process = require('child_process')
    const spawnOptions = [
        "-i",
        url,
        '-f',
        'mpegts',
        '-codec:v',
        'mpeg1video',
        "-stats",
        "-r",
        '30',
        '-'
    ];
    const stream = child_process.spawn("ffmpeg", spawnOptions, {
        detached: false
    })
    stream.stdout.on('data', (data) => {
        console.log(data.toString('base64'))
        return
    })
    // return
    // <Buffer 47 41 00 3d 07 10 00 03 4b 2d 7e 00 00 00 01 e0 00 00 80 c0 0a 31 00 1f 47 c5 11 00 1f 18 e5 00 00 01 00 02 57 ff f8 80 00 00 01 01 fa 70 ee b4 02 03 ... 4086 more bytes>
    // <Buffer 47 40 00 1f 00 00 b0 0d 00 01 c1 00 00 00 01 f0 00 2a b1 04 b2 ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ... 1078 more bytes>
}

const test2 = () => {
    cap = new cv.VideoCapture(url)
    while (true) {
        const frame = cap.read()
        cv.imshow('frame', frame)
    }
}
const test3 = () => {
    cap = new cv.VideoCapture(url)
    console.log(cap)
}
const test4 = () => {
    const array = [1, 2];
    console.log([...array])
}
const detect = async () => {
    cap = new cv.VideoCapture(url)

    while (true) {
        try {
            const frame = cap.read()
            let base64 = 'data:image/png;base64,' + cv.imencode('.jpg', frame).toString('base64');

            const img = new Image()
            img.src = base64;

            const resultDetect = await faceapi
                .detectAllFaces(img)
                .withFaceLandmarks()
                .withFaceDescriptors()

            if (!resultDetect.length) {
                console.log('khong co nguoi nao')
                continue;
            }
            let descriptions = [];

            // danh sach so sanh
            descriptions = [...descriptions, ...listDetect];

            const faceMatcher = new faceapi.FaceMatcher(resultDetect);

            let bestMatch = 'unknown';
            descriptions.forEach(face => {
                if (faceMatcher.findBestMatch(face.descriptor).label !== "unknown")
                    bestMatch = '';
            })

            if (bestMatch === 'unknown') {
                console.error('co nguoi la');
                listDetect = [...listDetect, ...resultDetect]
            } else {
                console.warn('co nguoi quen');
            }

            loop++;
            console.log(loop)
            if (loop === 150) {
                console.log('reset');
                loop = 0
                listDetect = []
            }
        } catch (err) {
            detect();
            console.log(err);
            return;
        }
    }
}
//  neu co GPU
// Just disables the warning, doesn't take advantage of AVX/FMA to run faster
// require('os')
// os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'


//http://192.168.1.5:554/videostream.cgi?loginuse=admin&amp;loginpas=ASIXNW