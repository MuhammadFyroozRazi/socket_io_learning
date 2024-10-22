const express = require('express')
const app = express()

app.use(express.static('public'))

// express server 
const expressServer = app.listen(3500) // http server 

const socket = require('socket.io')

const {Server} = require('socket.io') // object that specified in the doc to make the server

// socket io server 
// const io = socket(expressServer,{ // we are handing over the http server to the ws server 
const io = new Server(expressServer,{ // literally this makes the new server
// object space for the options 
    // serveClient : false // it stop serving the data to the client that in this connection
    cors : ['http://localhost:3500'] // this handle the cross origin request

})

// on is an event listener in regular js/node
io.on('connect',socket=>{
    console.log(socket.handshake); // this will log the handshake request we can see the query and auth using this object
    // {
    //     headers: {
    //       host: 'localhost:3500',
    //       connection: 'keep-alive',
    //       'sec-ch-ua-platform': '"Android"',
    //       'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36 Edg/130.0.0.0',
    //       accept: '*/*',
    //       'sec-ch-ua': '"Chromium";v="130", "Microsoft Edge";v="130", "Not?A_Brand";v="99"',
    //       'sec-ch-ua-mobile': '?1',
    //       'sec-fetch-site': 'same-origin',
    //       'sec-fetch-mode': 'cors',
    //       'sec-fetch-dest': 'empty',
    //       referer: 'http://localhost:3500/',
    //       'accept-encoding': 'gzip, deflate, br, zstd',
    //       'accept-language': 'en-US,en;q=0.9,en-IN;q=0.8'
    //     },
    //     time: 'Tue Oct 22 2024 12:55:15 GMT+0530 (India Standard Time)',
    //     address: '::ffff:127.0.0.1',
    //     xdomain: false,
    //     secure: false,
    //     issued: 1729581915610,
    //     url: '/socket.io/?age=12&EIO=4&transport=polling&t=4ez7z46w', // check this url that from the browser to the server is now appended with an extra query string
    //     query: [Object: null prototype] {
    //       age: '12',
    //       EIO: '4',
    //       transport: 'polling',
    //       t: '4ez7z46w'
    //     },
    //     auth: { secret: '<TOKEN>' }
    //   }
    console.log(socket.id,' has joined the connection');
    // emit also an event method, 1st arg is the name and 2nd is the data
    socket.emit('Welcome',[1,3,4]) // this will send an event to the connected browser
    // as this are all in the same connection we can club this to listen and send the event 
    socket.on('thankyou',data=>{
        console.log('message from the client :',data); 
    })
    io.emit('newClient',socket.id) // this will create an event to all the client that connected
    // the reason is 'io' is the server objects hence it will send to all browser this event
    // other hand 'socket' is an connection to an perticular browser hance it will only send or receive events from that
})  