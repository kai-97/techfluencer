const axios = require('axios');
const chalk = require('chalk');

async function getUserDetail(client, nameOfUser){
    // await client.connect();
    var result = {};
    var key = 'data';
    result[key] = [];
    var cursor = await client.db("database").collection("user_details").find();
    await cursor.forEach(doc => {
        result[key].push(doc);
    });

    var sorted_data = result.data;
    sorted_data.sort((sorted_data, b) => (sorted_data.total_points < b.total_points ? 1:-1));
    //console.log(result);
    let responseString = "";
    for(let i=0;i<sorted_data.length;i++){
        console.log(sorted_data[i]);
        if(sorted_data[i].username==nameOfUser){
            //console.log(`Found a listing in the collection with name: '${nameOfListing}'`);
            responseString = ``+nameOfUser+`'s rank is `+(i+1)+` with points ${sorted_data[i].total_points}`;
            //console.log(`Rank for '${nameOfUser}' is `+ (i+1)+` with points `+result.total_points);
            break;
            
        } else{
            responseString = `Sorry, I don't have a rank for '${nameOfUser}'`;
            console.log(`No user found with the name '${nameOfUser}'`);
        }
    }
    
    return responseString;
}

async function getAllData(client){
    await client.connect();
    var result = {};
    var key = 'data';
    result[key] = [];
    var cursor = await client.db("database").collection("user_details").find();
    await cursor.forEach(doc => {
        result[key].push(doc);
    });
    //console.log(result.data[0]);

    return result;
}

async function updateUserDetailsByUsername(client, usernm, updated_details){
    const result = await client.db('database').collection('user_details').updateOne({
        username: usernm}, {$set: updated_details}
    );
    console.log(`${result.modifiedCount} documents was/were updated`);
}

async function createMultipleUsers(client, newListing){
    const result = await client.db("database").collection("user_details").insertMany(newListing);
    console.log(`${result.insertedCount} new listing created with the following ids:`);
    console.log(result.insertedIds);
    return result
}


async function getUserDetailOne(client, nameOfUser){
    // await client.connect();
    var result = {};
    var key = 'data';
    result[key] = [];
    var cursor = await client.db("database").collection("user_details").findOne( { username: nameOfUser });
    var myName = "";
    if (cursor) {
        myName = "##### Here are details for ***'"+nameOfUser+"':***\n\n" +
        "| Field | Details \n"+
        "| :------------: |:---------------\n"+
        
        "| Name: |"+cursor.name+"|\n| UnityID: |"+cursor.username+"\n| GitHub ID: |"
        + cursor.gh_id+"|\n| StackOverFlow ID: |"+cursor.so_id+"|\n| GitHub EmailID: |"+cursor.gh_email;
     }
    
    return myName;
}


exports.getUserDetail = getUserDetail;
exports.getUserDetailOne = getUserDetailOne;
exports.updateUserDetailsByUsername = updateUserDetailsByUsername;
exports.createMultipleUsers = createMultipleUsers;
exports.getAllData = getAllData;
