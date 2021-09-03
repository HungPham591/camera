const canvas = require('canvas')
const faceapi = require("face-api.js");
const fs = require('fs');
const Rtsp = require('./rtsp')
require('@tensorflow/tfjs-node')

const url1 = 'rtsp://admin:ASIXNW@192.168.1.6:554/H.264';
const url2 = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4'
const { Canvas, Image, ImageData } = canvas;

let listDetect = [];
let loop = 0;
const rtsp = new Rtsp(url1);

module.exports = async (input, callback) => {

    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromDisk("./src/weights"),
        faceapi.nets.faceRecognitionNet.loadFromDisk("./src/weights"),
        faceapi.nets.faceLandmark68Net.loadFromDisk("./src/weights")
    ])

    // while (true) {
    //     rtsp.getFrame()
    // }
    testDetect()
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
        fs.writeFile('base64.txt', data.toString('base64'))
        // let base64 = 'data:image/png;base64,' + data.toString('base64')

        // const img = new Image()
        // img.src = base64;

        // const resultDetect = await faceapi
        //     .detectAllFaces(img)
        //     .withFaceLandmarks()
        //     .withFaceDescriptors()

        // console.log(resultDetect)
    })

    // <Buffer 47 41 00 3d 07 10 00 03 4b 2d 7e 00 00 00 01 e0 00 00 80 c0 0a 31 00 1f 47 c5 11 00 1f 18 e5 00 00 01 00 02 57 ff f8 80 00 00 01 01 fa 70 ee b4 02 03 ... 4086 more bytes>
    // <Buffer 47 40 00 1f 00 00 b0 0d 00 01 c1 00 00 00 01 f0 00 2a b1 04 b2 ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ... 1078 more bytes>
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

const testDetect = async () => {
    setInterval(() => {
        if (rtsp.getFrame() !== '') {
            let base64 = 'data:image/png;base64,' + rtsp.getFrame().toString('base64');
            detect(base64);
        }
    }, 100);
}
const detect = async (base64) => {
    try {
        const img = new Image()
        img.src = base64;

        const resultDetect = await faceapi
            .detectAllFaces(img)
            .withFaceLandmarks()
            .withFaceDescriptors()

        if (!resultDetect.length) {
            console.log('khong co nguoi nao')
            return;
        }

        const faceMatcher = new faceapi.FaceMatcher(resultDetect);

        let bestMatch = 'unknown';
        //danh sach so sanh
        listDetect.forEach(face => {
            if (faceMatcher.findBestMatch(face.descriptor).label !== "unknown")
                bestMatch = '';
        })

        if (bestMatch === 'unknown') {
            //nguoi la
            listDetect = [...listDetect, ...resultDetect]
            console.log('co nguoi la')
        }
    } catch (err) {
    }
}
//  neu co GPU
// Just disables the warning, doesn't take advantage of AVX/FMA to run faster
// require('os')
// os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'


//http://192.168.1.5:554/videostream.cgi?loginuse=admin&amp;loginpas=ASIXNW