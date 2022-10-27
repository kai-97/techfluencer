const axios = require('axios');
const chalk = require('chalk');


function getUserRepos(username){

    return new Promise(function(resolve, reject)
    {
        let url = "https://api.github.com/users/" + username + "/repos?sort=created"

        axios.get(url).then(function(response) {
            let repos = [];
            // console.log("outside for", response.data.length)
            // console.log(response.data[1])
            let count = 3;
            if (count > response.data.length) {
                count = response.data.length;
            }
            for (i = 0; i < count; i++){
                // print("inside for")
                // console.log(response.data[i]);
                repos.push(response.data[i].full_name)

            }

            resolve(repos)
        }).catch(function(error) {
            let repos = []
            console.log(chalk.red(error));
            reject(error);
            return; // Terminate execution.
        });
    });
}

function getUserCommitsToRepo(userEmail, repo) {

    return new Promise(function(resolve, reject)
    {
        let url = "https://api.github.com/repos/" + repo + "/commits"

        axios.get(url).then(function(response) {
            let userCommits = 0;
            // console.log("outside for", response.data.length)
            // console.log(response.data[1])
            
            for (i = 0; i < response.data.length; i++){
                // print("inside for")
                // console.log(response.data[i]);
                if (response.data[i].commit.author.email == userEmail) {
                    userCommits++;
                    // console.log(response.data[i].commit.)
                }
            }

            resolve(userCommits)
        }).catch(function(error) {
            console.log(chalk.red(error));
            reject(error);
            return; // Terminate execution.
        });
    });
}

async function getUserCommits(username, userEmail) {
    
    let userRepos = await getUserRepos(username).catch(err => {console.log('Invalid gh_id: ' + username)});
    
    let commitsToRepo = 0;
    // console.log(userRepos.length)
    let totalCommits = 0;
    if(userRepos){
        for (let i = 0; i < userRepos.length; i++) {
            commitsToRepo = await getUserCommitsToRepo(userEmail, userRepos[i]);
            totalCommits = totalCommits + commitsToRepo;
        }
    }
    return totalCommits;
}

exports.getUserRepos = getUserRepos;
exports.getUserCommitsToRepo = getUserCommitsToRepo;
exports.getUserCommits = getUserCommits;

// (async () => {
//     let gitRepos = await getUserCommits("mghosal", "").catch(err => {console.log(err.response.status)});
//     if(!gitRepos){
//         console.log("Error in input");
//     }
//     else{console.log(gitRepos)}
// })();