const express = require('express')
const bodyParser = require('body-parser')
const firebase = require("firebase")
const fetch = require('node-fetch')
const dialogflow = require('dialogflow')
const uuid = require('uuid')
const credentials = require('./smart-farm-bpmy-8ba8d83576c1.json')
var cron = require('node-cron')

cron.schedule('0 7 * * *', function(){
  const headers = {
    'Content-Type' :'application/json',
    'Authorization':'Bearer {3gxhyRZIiaO5JTgy6QJXVtAGPCVgLq6tFPjqIU6k+4RytPOdKD0UJrW5Hhks8jIMlN+rI1TwvNhFZoVYwLJNLSWAutVRmt3+2BYNti37Cd3XYPyDVL1a0ViIdD2k53/V5907ZSF66aTzfAo+9249lgdB04t89/1O/w1cDnyilFU=}',
  }
  const msg = {
    type: 'text',
    text: JSON.stringify({
      temperature: 30,
      wind: 20,
      luminance: 200,
      humidity: 10,
    })
  }
  const body = JSON.stringify({
    to: 'U9917a961739c1e7dea7f2b365def5cf5',
    messages: [msg]
  })
  fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers,
    body
  })
});


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

  var firebaseConfig = {
    apiKey: "AIzaSyBNKDcDqZbgSybGSQCtjQYFWpSnj6u3zqQ",
    authDomain: "smartfarm-20f29.firebaseapp.com",
    databaseURL: "https://smartfarm-20f29.firebaseio.com",
    projectId: "smartfarm-20f29",
    storageBucket: "smartfarm-20f29.appspot.com",
    messagingSenderId: "728983560877",
    appId: "1:728983560877:web:22c435cef61f5aa4729c24",
    measurementId: "G-1B2YFEP46P"
  };
  firebase.initializeApp(firebaseConfig);

let firestore = firebase.firestore()

let port = process.env.PORT || 3333;

app.listen(port, function() {
  console.log(`Start server at http://localhost:${port}`);
});

app.post('/webhook',async function (req, res) {
  const replyToken = req.body.events[0].replyToken 
  const textInput = req.body.events[0].message.text

  const result = await correctWord(textInput)

      const headers = {
        'Content-Type' :'application/json',
        'Authorization':'Bearer {3gxhyRZIiaO5JTgy6QJXVtAGPCVgLq6tFPjqIU6k+4RytPOdKD0UJrW5Hhks8jIMlN+rI1TwvNhFZoVYwLJNLSWAutVRmt3+2BYNti37Cd3XYPyDVL1a0ViIdD2k53/V5907ZSF66aTzfAo+9249lgdB04t89/1O/w1cDnyilFU=}',
      }
      var msg = {}

    if(result == 'temperature') {
      msg= {
        type : 'text',
        text : '38 °C'
      }
    }

    if(result == 'humidity') {
      msg= {
        type : 'text',
        text : '73%'
      }
    }

    if(result == 'water the plant') {
      msg= {
        type : 'text',
        text : 'your plant is too hot!! water your plan'
      }
    }

    if(result == 'select farm') {
      msg= {
        type : 'text',
        text : 'select farm first'
      }
    }

    if(textInput == 'graph') {
    msg = {
      type: 'flex',
      altText: 'flex',
      contents: {
        "type": "carousel",
        "contents": [
          {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://www.img.in.th/images/79a591edc52a393cec47b263fd319efb.png",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover",
              "action": {
                "type": "uri",
                "label": "Action",
                "uri": "https://liff.line.me/1655333615-yXk8Qnjg"
              }
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "md",
              "action": {
                "type": "uri",
                "label": "Action",
                "uri": "https://liff.line.me/1655333615-yXk8Qnjg"
              },
              "contents": [
                {
                  "type": "text",
                  "text": "Humidity",
                  "weight": "bold",
                  "size": "xl",
                  "contents": []
                },
                {
                  "type": "text",
                  "text": "Sauce, Onions, Pickles, Lettuce & Cheese",
                  "size": "xxs",
                  "color": "#AAAAAA",
                  "wrap": true,
                  "contents": []
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "spacer",
                  "size": "xxl"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "See Detail",
                    "uri": "https://liff.line.me/1655333615-yXk8Qnjg"
                  },
                  "color": "#4EA72EFF",
                  "style": "primary"
                }
              ]
            }
          },
          {
            "type": "bubble",
            "direction": "ltr",
            "hero": {
              "type": "image",
              "url": "https://www.img.in.th/images/7e3281fdaae934d71a10289215887a08.png",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover",
              "action": {
                "type": "uri",
                "label": "Action",
                "uri": "https://liff.line.me/1655333615-yXk8Qnjg"
              }
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "md",
              "action": {
                "type": "uri",
                "label": "Action",
                "uri": "https://liff.line.me/1655333615-yXk8Qnjg"
              },
              "contents": [
                {
                  "type": "text",
                  "text": "Temperature",
                  "weight": "bold",
                  "size": "xl",
                  "contents": []
                },
                {
                  "type": "text",
                  "text": "Sauce, Onions, Pickles, Lettuce & Cheese",
                  "size": "xxs",
                  "color": "#AAAAAA",
                  "wrap": true,
                  "contents": []
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "spacer",
                  "size": "xxl"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "See Detail",
                    "uri": "https://liff.line.me/1655333615-yXk8Qnjg"
                  },
                  "color": "#4EA72EFF",
                  "style": "primary"
                }
              ]
            }
          },
          {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://www.img.in.th/images/acf4f3927939232b03b19cab59edfed7.png",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover",
              "action": {
                "type": "uri",
                "label": "Action",
                "uri": "https://liff.line.me/1655333615-yXk8Qnjg"
              }
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "md",
              "action": {
                "type": "uri",
                "label": "Action",
                "uri": "https://liff.line.me/1655333615-yXk8Qnjg"
              },
              "contents": [
                {
                  "type": "text",
                  "text": "Wind Velocity",
                  "weight": "bold",
                  "size": "xl",
                  "contents": []
                },
                {
                  "type": "text",
                  "text": "Sauce, Onions, Pickles, Lettuce & Cheese",
                  "size": "xxs",
                  "color": "#AAAAAA",
                  "wrap": true,
                  "contents": []
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "spacer",
                  "size": "xxl"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "See Detail",
                    "uri": "https://liff.line.me/1655333615-yXk8Qnjg"
                  },
                  "color": "#4EA72EFF",
                  "style": "primary"
                }
              ]
            }
          }
        ]
      }
    }
    }
    else if(textInput == 'monitor'){
      msg = {
        type : 'text',
        text: 'kuay'   
    }
    }

      const body = JSON.stringify(
        {
          replyToken,
          messages: [msg]
        })

      fetch('https://api.line.me/v2/bot/message/reply', {
        method: 'POST',
        headers,
        body
      })
      res.sendStatus(200)
})

app.post('/user', function (req,res) {
    const a = firestore.collection("Farm").add({ 
        farm_id: 33,
        name: "Hatsune Miku"
    });
    res.json(a)
})
app.post('/mockup',function (req,res) {

})
async function correctWord (input) {
  const sessionID = uuid.v4();

  const sessionClient = new dialogflow.SessionsClient({ credentials })
  const sessionPath = sessionClient.sessionPath(credentials.project_id,sessionID)

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: input,
        languageCode: 'en-US',
      },
    },
  }

  const responses = await sessionClient.detectIntent(request)
  const result = responses[0].queryResult.fulfillmentMessages[0].text.text[0];
  return result
}