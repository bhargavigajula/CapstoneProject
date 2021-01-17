var mongojs = require('mongojs')
var fs = require("fs");
var TelegramBot = require('node-telegram-bot-api')

var token = '1339210665:AAHe9uJ6RUo1ojLcbcPDWyzBUy8_YzQ5EhE'
var cString = "mongodb+srv://bhargavigajula:9381395219@cluster0.b6vo1.mongodb.net/ExamResults?retryWrites=true&w=majority"
var db = mongojs(cString, ['Results'])
const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });
 
var bot = new TelegramBot(token, {polling: true});
bot.on('message', (msg) => {
  var m = msg.text;
  var value = m.split(",")
  if(value.length == 1) {
  	console.log(value[0]);
    db.Results.find({RegNo:value[0]},function(err,docs) {
    	if(docs.length > 0) {
           var haltno = value[0];
           	function f(haltno, i) {
    			nightmare
      				.viewport(1440, 900)
      				.goto("https://www.svecwexams.in/htform3.jsp")
      				.wait(2000)
      				.type("#htno", haltno)
      				.click("#babtn")
      				.wait(15000)
      				.screenshot("results.png")
      				.end()
      				.then(console.log)
      				.catch((error) => {
        			console.error("Search failed:", error);
      				});
    				setTimeout(i, 45000);
  			}
  			function i() {
    			fs.readFile("results.png", function (err, data) {
      			    if (err) {
        			  console.log(err);
      			    } 
      			    else {
      			       bot.sendMessage(msg.chat.id,"Hello " + docs[0].Name + " Welcome to SVECWExamResults chatbot!!!\nHere is your ExamResults")
        			   bot.sendPhoto(msg.chat.id, data);
      			    }
    		    });
            }
            
            f(haltno, i);

    	}
    	else {
    		bot.sendMessage(msg.chat.id,"You are new to this chatbot Please Enter your RegNo along with your Name!!!");
    	}

    })
  }
  else if(value.length == 2) {
  	 db.Results.find({RegNo:value[0]},function(err,docs) {
    	if(docs.length > 0) {
           bot.sendMessage(msg.chat.id,"Details Updated Successfully");
           var haltno = value[0];
           	function f(haltno, i) {
    			nightmare
      				.viewport(1440, 900)
      				.goto("https://www.svecwexams.in/htform3.jsp")
      				.wait(2000)
      				.type("#htno", haltno)
      				.click("#babtn")
      				.wait(15000)
      				.screenshot("results.png")
      				.end()
      				.then(console.log)
      				.catch((error) => {
        			console.error("Search failed:", error);
      				});
    				setTimeout(i, 45000);
  			}
  			function i() {
    			fs.readFile("results.png", function (err, data) {
      			    if (err) {
        			  console.log(err);
      			    } 
      			    else {
      			       bot.sendMessage(msg.chat.id,"Hello " + value[1] + " Welcome to SVECWExamResults chatbot!!!\nHere is your ExamResults")
        			   bot.sendPhoto(msg.chat.id, data);
      			    }
    		    });
            }
            f(haltno, i);
    	}
    	else {
    		var insertStudent = {
  	 			RegNo : value[0],
  	 			Name : value[1]
  	 		}
  	 		db.Results.insert(insertStudent, function (err,docs) {
  	 			bot.sendMessage(msg.chat.id,"Inserted Successfully!!!")
  	 		})
  	 		var haltno = value[0];
           	function f(haltno, i) {
    			nightmare
      				.viewport(1440, 900)
      				.goto("https://www.svecwexams.in/htform3.jsp")
      				.wait(2000)
      				.type("#htno", haltno)
      				.click("#babtn")
      				.wait(15000)
      				.screenshot("results.png")
      				.end()
      				.then(console.log)
      				.catch((error) => {
        			console.error("Search failed:", error);
      				});
    				setTimeout(i, 45000);
  			}
  			function i() {
    			fs.readFile("results.png", function (err, data) {
      			    if (err) {
        			  console.log(err);
      			    } 
      			    else {
      			       bot.sendMessage(msg.chat.id,"Hello " + value[1] + " Welcome to SVECWExamResults chatbot!!!\nHere is your ExamResults")
        			   bot.sendPhoto(msg.chat.id, data);
      			    }
    		    });
            }
            
            f(haltno, i);
            
    	}
    })
  }
  else {
  	bot.sendMessage(msg.chat.id, "This chatbot accepts only two fields.Please enter your RegNo and Name!!!");
  }
});