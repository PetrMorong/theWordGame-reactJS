const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express().use(bodyParser.json());

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "<WordFootballVerifyToken73>";
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// Creates the endpoint for our webhook
app.post("/", (req, res) => {
  let body = req.body;
  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(entry => {
      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      let event = entry.messaging[0];
      console.log(event);
      // Get the sender PSID
      let sender_psid = event.sender.id;
      console.log("Sender PSID: " + sender_psid);
      if (event.message) {
        receivedMessage(event);
      } else if (event.game_play) {
        receivedGameplay(event);
      } else {
        console.log("Webhook received unknown event: ", event);
      }
    });
    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

//
// Handle messages sent by player directly to the game bot here
//
function receivedMessage(event) {}

//
// Handle game_play (when player closes game) events here.
//
function receivedGameplay(event) {
  // Page-scoped ID of the bot user
  var senderId = event.sender.id;
  // FBInstant player ID
  var playerId = event.game_play.player_id;
  // FBInstant context ID
  var contextId = event.game_play.context_id;
  // Check for payload
  if (event.game_play.payload) {
    // Get data from payload
    var payload = JSON.parse(event.game_play.payload);
    var playAgain = payload["playAgain"];
    var durationInHours = payload["durationInSec"];

    // Schedule sending message to player when scout returns.
    if (playAgain) {
      Scheduler.after(durationInSec)
        .seconds()
        .then(() => {
          sendMessage(
            senderId,
            contextId,
            "Testing play again message",
            "Play again",
            { gameRoomId: 123 }
          );
          return "Success (to make eslint happy)";
        })
        .catch(err => console.log(err));
    }
  }
}

//
// Send bot message
//
// player (string) : Page-scoped ID of the message recipient
// context (string): FBInstant context ID. Opens the bot message in a specific context
// message (string): Message text
// cta (string): Button text
// payload (object): Custom data that will be sent to game session
//
function sendMessage(player, context, message, cta, payload) {
  var button = {
    type: "game_play",
    title: cta
  };
  if (context) {
    button.context = context;
  }
  if (payload) {
    button.payload = JSON.stringify(payload);
  }
  var messageData = {
    recipient: {
      id: player
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: message,
              buttons: [button]
            }
          ]
        }
      }
    }
  };

  callSendAPI(messageData);
}

const WORD_FOOTBALL_FB_PAGE_ACCESS_TOKEN =
  "EAAgdxEqLNMIBAKTlizZA4xXx7mp5bG0nKZAxVixZBU5Kq12jVifoyT1ZC5NZBl3nv8IczC7gUMbAvRBl94m5joFPZBgv4YiiZAlZBmiLDQv48u34BZBEuJmFiqWxZARMcxuBjWaKckZCWC8DP21blnBOszqPQEsToI6eMc0sZBxp46WVhHmkFP12TrUQ";

function callSendAPI(messageData) {
  var graphApiUrl =
    "https://graph.facebook.com/me/messages?access_token=" +
    WORD_FOOTBALL_FB_PAGE_ACCESS_TOKEN;
  request(
    {
      url: graphApiUrl,
      method: "POST",
      json: true,
      body: messageData
    },
    (error, response, body) => {
      console.error(
        "send api returned",
        "error",
        error,
        "status code",
        response.statusCode,
        "body",
        body
      );
    }
  );
}

exports.webhook = functions.https.onRequest(app);
