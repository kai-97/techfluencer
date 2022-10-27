// Initialize the mattermost client
const {MongoClient} = require('mongodb');
const Client = require('mattermost-client');
const question = require('./features/getSimilarQuestions');
const database = require('./features/getRanking');
const update = require('./features/updateStats');
const getSOStats= require('./features/getStackOverflowStats');
const getGHData = require('./features/getGitHubData')
const schedule = require('node-schedule');
const emoji = require('node-emoji');

require('dotenv').config()

// Configurations
let host = "chat.robotcodelab.com"
let group = "CSC510-S22"
let bot_name = "techfluencer";
let client = new Client(host, group, {});

var dataBase = new Object()
dataBase = {}

async function main()
{
    let request = await client.tokenLogin(process.env.BOTTOKEN);
    let dbClient = await establishConnection();
    dbClient.connect();
    
    client.on('message', async function(msg)
    {

        await parseMessage(msg, client, dbClient);

    });

    // // To run update_db without mattermost
    // let channel_id = msg.broadcast.channel_id;
    // console.log("Trying to update db")
    // try{
    //     let response = await update.updateUserStats(dbClient);
    //     let data = response.data;
    //     //console.log(data);
    //     await update.calculatePoints(dbClient, data);
    //     console.log("Success");
    // }catch(err){
    //     console.log("DB Update Not Possible. Sorry!");
    // }
    
    const job = schedule.scheduleJob('0 0 21 * * *', async function(){
        console.log('Database Update Scheduled');
        try{
                let response = await update.updateUserStats(dbClient);
                var data = response.data;
                //console.log(data);
                await update.calculatePoints(dbClient, data);
            }catch(err){
                console.log(err);
         }
      });

    dbClient.close();
}

async function establishConnection(){
    //URI here
    console.log("Connecting to MongoDB...");
    let uri = await process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    console.log("Connected to MongoDB!");
    return client;
}

function hears(msg, text)
{
    if( msg.data.sender_name == bot_name) return false;
    if( msg.broadcast.channel_id == '9pzcihbz77go9xjt569y57spgy') return false;
    if( msg.data.post )
    {
        let post = JSON.parse(msg.data.post);
        if( post.message.indexOf(text) >= 0)
        {
            return true;
        }
    }
    return false;
}

async function parseMessage(msg, client, dbClient) {
    if( hears(msg, "?") )
    {
        // Store the question asked by the user in the database
        dataBase[msg.data.sender_name] = msg.data.post;
        console.log("Received question.")
        // Parse the question and get similar questions
        question.parseQuestion(msg, client);
        console.log("Posted something")
    }
    
    else if( hears(msg, "#rankings") )
    {
        let channel_id = msg.broadcast.channel_id;
        // Fetch the question asked by the user from the database
        let response = await database.getAllData(dbClient);
        //console.log("Response", responseString.data);
        
        let responseString = "##### Here is the Leaderboard:\n\n"
        responseString += "| Rank | Points | Name \n"
        +"| :-----: | :-----: | :----- \n"
        
        var sorted_data = response.data;
        sorted_data.sort((sorted_data, b) => (sorted_data.total_points < b.total_points ? 1:-1));
        
        let leaderboardLength = 10;
        if (sorted_data.length < leaderboardLength) {leaderboardLength = sorted_data.length}
        for(let i = 0; i < leaderboardLength; i++){
            responseString += String("| " + (i+1) + " | " + parseInt(sorted_data[i].total_points) + " | " + sorted_data[i].name + "\n")
        }
        
        client.postMessage(responseString, channel_id);
    }

    
    else if( hears(msg, "#my_rank") )
    {
        // Fetch the question asked by the user from the database
        let channel_id = msg.broadcast.channel_id;
        let username = msg.data.sender_name;
        username = username.substring(1, username.length);
    
        try{
            let responseString = await database.getUserDetail(dbClient, username);
            client.postMessage(responseString, channel_id);
        }catch(err){
            client.postMessage("Ranking service is down. Sorry!", channel_id);
        }
    }

    else if( hears(msg, "#add_me") )
    {
        // Fetch the question asked by the user from the database

        let message_user = (JSON.parse(msg.data.post).message).split('|');
        console.log(message_user);
        let channel_id = msg.broadcast.channel_id;
        if( message_user.length == 6 ){
            let username = msg.data.sender_name;
            username = username.substring(1, username.length);
            user_json = [{
                name: message_user[1].trim(),
                username: message_user[2].trim(),
                gh_id: message_user[3].trim(),
                so_id: message_user[4].trim(),
                gh_points: 0,
                so_points: 0,
                total_points: 0,
                gh_email: message_user[5].trim()
            }];
            
            let resp2 = await getSOStats.getStackOverflowStatsByPage(user_json[0].so_id,1).catch(
                err => client.postMessage("", channel_id));
            
            let gitRepos = await getGHData.getUserRepos(user_json[0].gh_id).catch(err => client.postMessage("", channel_id));

            if (user_json[0].name == ''){
                client.postMessage("Please provide a valid name", channel_id);

            }
            else if(user_json[0].username == ''){
                client.postMessage("Please provide a valid username", channel_id);

            }
            else if((user_json[0].so_id != '') && (!(/^\d+$/.test(user_json[0].so_id)))){
                console.log(user_json[0].so_id);
                client.postMessage("Please provide correct Stack Overflow ID", channel_id);
            }
            else if((user_json[0].so_id != '') && (resp2.rejectUnauthorized)){
                client.postMessage("Please provide correct Stack Overflow ID", channel_id);
            }
            else if((user_json[0].gh_id != '') && (!gitRepos)){
                client.postMessage("Please provide correct GitHub ID", channel_id);
            }
            else if((user_json[0].gh_email != '') && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_json[0].gh_email))){
                client.postMessage("Please provide correct GitHub email id", channel_id);
            }
            else{
                try{
                    await database.createMultipleUsers(dbClient, user_json);
                    client.postMessage("Success", channel_id);
                } catch(err){
                    client.postMessage("Adding Service is down. Sorry!", channel_id);
                }
            }
        }
        else {
            client.postMessage("Invalid number of fields. Please check your input string.", channel_id);
        }

        
    }

    else if( hears(msg, "#update_me") )
    {
        let message_user = (JSON.parse(msg.data.post).message).split('|');
        console.log(message_user);
        let channel_id = msg.broadcast.channel_id;
        if( message_user.length == 5 ){
            let username = msg.data.sender_name;
            username = username.substring(1, username.length);
            user_json_update = {
                name: message_user[1].trim(),
                //username: message_user[2],
                gh_id: message_user[2].trim(),
                so_id: message_user[3].trim(),
                gh_email: message_user[4].trim()
            };

            let resp = await getSOStats.getStackOverflowStatsByPage(user_json_update.so_id,1).catch(
                err => client.postMessage("", channel_id));
            
            let gitRepos = await getGHData.getUserRepos(user_json_update.gh_id).catch(err => client.postMessage("", channel_id));

            if (user_json_update.name == ''){
                client.postMessage("Please provide a valid name", channel_id);

            }
            else if((user_json_update.so_id != '') && (!(/^\d+$/.test(user_json_update.so_id)))){
                console.log(user_json_update.so_id);
                client.postMessage("Please provide correct Stack Overflow id", channel_id);
            }
            else if((user_json_update.so_id != '') && (resp.rejectUnauthorized)){
                client.postMessage("Please provide correct Stack Overflow id", channel_id);
            }
            else if((user_json_update.gh_id != '') && (!gitRepos)){
                client.postMessage("Please provide correct GitHub ID", channel_id);
            }
            else if((user_json_update.gh_email != '') && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_json_update.gh_email))){
                client.postMessage("Please provide correct GitHub email id", channel_id);
            }

            else{
                try{
                    await database.updateUserDetailsByUsername(dbClient, username, user_json_update);
                    client.postMessage("Success", channel_id);
                } catch(err){
                    client.postMessage("Updation Service is down. Sorry!", channel_id);
                }
            }
        }
        else {
            client.postMessage("Invalid number of fields. Please check your input string.", channel_id);
        }
        
    }

    else if( hears(msg, "#update_db") )
    {
        let channel_id = msg.broadcast.channel_id;
        try{
            let response = await update.updateUserStats(dbClient);
            let data = response.data;
            //console.log(data);
            await update.calculatePoints(dbClient, data);
            client.postMessage("Success", channel_id);
        }catch(err){
            client.postMessage("DB Update Not Possible. Sorry!", channel_id);
        }
    }

    else if( hears(msg, "#help_me") )
    {   
        let channel_id = msg.broadcast.channel_id;
        let rsp = "#### "+emoji.get('blue_book')+"Commands List:    \n"+
        "##### To use the following commands: **Add** a **'#'** before each keyword, followed by the necessary instructions:- \n\n"+
        "| Emoji  | Keywords  | Explanation \n"+
        "| :------------: |:---------------:|:-----\n"+
        " | " + emoji.get('pencil2')+"   | add_me | To add a new user: **<hashtag>**add_me &#124; Name LastName &#124; UnityID &#124; GitHubID &#124; StackOverFlowID &#124; GitHub Email |\n"+
        " | " + emoji.get('pencil')+"    |update_me | To update an existing user: **<hashtag>**update_me &#124; Name LastName &#124; GitHubID &#124; StackOverFlowID &#124; GitHub Email |\n"+
        " | " + emoji.get('bar_chart')+"  |  rankings | To check the Leaderboard|\n"+
        " | " + emoji.get('star')+"    |my_rank | To check your Rank and Points|\n"+
        " | " + emoji.get('scroll')+"   | my_details | To check your Personal Details|\n"+
        " | " + emoji.get('arrows_counterclockwise')+"    |update_db | To Refresh the score. _(This will be triggered automaticaly at a set time)_|\n"+
        " | " + emoji.get('question')+"  |  | Ask your query as a question to check out similar questions |\n"; 
        client.postMessage(rsp, channel_id);   
    }

    else if( hears(msg, "#my_details") )
    {
        // Fetch the question asked by the user from the database
        let channel_id = msg.broadcast.channel_id;
        let username = msg.data.sender_name;
        username = username.substring(1, username.length);
    
        try{
            let responseString = await database.getUserDetailOne(dbClient, username);
            client.postMessage(responseString, channel_id);
        }catch(err){
            client.postMessage("Ranking service is down. Sorry!", channel_id);
        }
    }

}

(async () => 
{
    if (process.env.NODE_ENV != 'test') {
        await main();
    }
})()

exports.hears = hears;
exports.main = main;
exports.establishConnection = establishConnection;
exports.parseMessage = parseMessage;

