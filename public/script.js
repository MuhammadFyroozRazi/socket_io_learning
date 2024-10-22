
// io() connect to the server 
const socket = io('http://localhost:3500',{
   auth : {
    secret : '<TOKEN>'
   },
   query : {
    age : 12
   }
}) // is necessary for the client to know where to connect to the Socket.IO server.
// auth wil send the authorization keys 
// and we can append our query at the end of the url which like normal api request we can access that from the server side 

// here socket has an 
//     - on method to listen to the event 
//     - emit method to emit an event 

socket.on('Welcome',data=>{
    console.log(data,' this comes from the server');
    socket.emit('thankyou',[4,5,6]) // this is will send an event to the server 
})

socket.on('newClient',data=>{
    console.log('A new client is joined :',data); // this will console to all the browser whenever an new client joins the server 
})
