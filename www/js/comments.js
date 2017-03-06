
  var myApp = new Framework7();

     var $$ = Dom7;

     // It indicates conversation flag
     var conversationStarted = false;

     // Here initiliaze the messages
     var myMessages = myApp.messages('.messages', {
       autoLayout:true
     });

     // Initiliaze the messagebar
     var myMessagebar = myApp.messagebar('.messagebar');

     // Displays the text after clicking the button
     $$('.messagebar .link').on('click', function () {
       // specifies the message text
       var messageText = myMessagebar.value().trim();
       // If there is no message, then exit from there
       if (messageText.length === 0) return;

       // Specifies the empty messagebar
       myMessagebar.clear()

       // Defines the random message type
       var messageType = (['sent', 'received'])[Math.round(Math.random())];

       // Provides the avatar and name for the received message
       var avatar, name;
       if(messageType === 'received') {
         name = 'Smith';
       }
       // It adds the message
       myMessages.addMessage({
         // It provides the message text
         text: messageText,
         // It displays the random message type
         type: messageType,
         // Specifies the avatar and name of the sender
         avatar: avatar,
         name: name,
         // Displays the day, date and time of the message
         day: !conversationStarted ? 'Today' : false,
         time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
       })

       // Here you can update the conversation flag
       conversationStarted = true;
   });
