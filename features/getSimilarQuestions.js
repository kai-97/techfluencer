const axios = require('axios');
const chalk = require('chalk');

config = {}

async function parseQuestion(msg, client){
    let channel = msg.broadcast.channel_id;
    let obj = JSON.parse(msg.data.post)
    let words = obj.message  
    let ques = await getSimilarQuestions(words).catch(
        err => client.postMessage("Question service is down. Sorry!", channel));
    if( ques )
    {
        // Parse through the response of the API
        let responseString = "| Suggestion #  | Question \n"+
        "| :------------: |:---------------\n";
        let suggestion = 1;
        for(var key in ques){
            if (ques.hasOwnProperty(key)){
                var value = ques[key];
                // console.log(key + " -> " + String(value));
                responseString += "| Suggestion " + String(suggestion) + "|";
                responseString += String("[" + key + "](" + value + ")|\n")
                suggestion++;
            }
        }
        
        console.log(chalk.blue("Response: " + responseString));
        // Post the response of similar questions fetched from SO to the user
        return client.postMessage(responseString, channel) 
    }
}

function getSimilarQuestions(words){
    
    return new Promise(function(resolve,reject)
    {
        let url = "https://api.stackexchange.com/2.3/similar?page=1&pagesize=5&order=desc&sort=relevance&title=" + words + "&site=stackoverflow";
        // Implement the GET endpoint here which fetches similar questions from SO
        axios.get(url).then(function(response) {
            console.log(response.data.items);
            var questionList = new Object()
            questionList = {}
            
            const regex = /\?/g;
            console.log(chalk.blue("Response: " + JSON.stringify(response.data)));
            for(let i = 0; i < response.data.items.length; i++){
                let question = response.data.items[i].title.replace(regex, '');
                questionList[question] = response.data.items[i].link;
            }
            
            // Send the similar questions as the response
            resolve(questionList);
            })
            .catch(function (error) {
                console.log(chalk.red(error));
                reject(error);
                return; // Terminate execution.
        });
  });
}

exports.getSimilarQuestions = getSimilarQuestions;
exports.parseQuestion = parseQuestion;