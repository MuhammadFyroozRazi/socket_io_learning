
// io() connect to the server 
const socket = io('http://localhost:3500') // is necessary for the client to know where to connect to the Socket.IO server.

// here socket has an 
//     - on method to listen to the event 
//     - emit method to emit an event 

socket.on('Welcome',data=>{
    console.log(data,' this comes from the server');
    socket.emit('thankyou',[4,5,6]) // this is will send an event to the server 
})
