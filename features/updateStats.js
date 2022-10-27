const axios = require('axios');
const chalk = require('chalk');
const so_stats = require('./getStackOverflowStats');
const gh_stats = require('./getGitHubData');
//const database = require('./getRanking');

async function updateUserStats(client){
    await client.connect();
    let result = {};
    let key = 'data';
    result[key] = [];
    let cursor = await client.db("database").collection("user_details").find().project({username: 1, gh_id: 1, so_id: 1, gh_email: 1, _id: 0});
    await cursor.forEach(doc => {
        result[key].push(doc);
    });
    //console.log(result);
    return result;
}

async function calculatePoints(client, data){

    // for loop for users
    for(let i = 0; i < data.length; i++){

        let so_pts = 0;
        if (data[i].so_id.length > 0) {
            let so_cursor = await so_stats.getStackOverflowStats(data[i].so_id);
            so_pts = so_cursor.totalSOScore;
        }
        
        let gh_commits = 0;
        if(data[i].gh_id.length > 0) {
            gh_commits = await gh_stats.getUserCommits(data[i].gh_id, data[i].gh_email);
        }
        let gh_pts = 100* gh_commits;
        let total_pts = 0.3*so_pts + 0.7*gh_pts;
        console.log(total_pts);
        console.log('-------');
        
        //console.log(data[i].gh_id);
        updated_details = {total_points: total_pts, gh_points: gh_pts, so_points: so_pts};
        
        console.log(data[i].gh_id, updated_details);
        const result = await client.db('database').collection('user_details').updateOne({
            username: data[i].username}, {$set: updated_details}
        );
        console.log(`${result.modifiedCount} documents was/were updated`);
    }
    
}

// async function updateUserDetailsByGHID(client, gh_i, updated_details){
//     console.log('here');
//     const result = await client.db('database').collection('user_details').updateOne({
//         gh_id: gh_i}, {$set: updated_details}
//     );
//     console.log(`${result.modifiedCount} documents was/were updated`);
// }


exports.calculatePoints = calculatePoints;
exports.updateUserStats = updateUserStats;