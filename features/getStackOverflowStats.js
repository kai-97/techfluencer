const axios = require('axios');
const chalk = require('chalk');

function getStackOverflowStatsByPage(userId,pageNumber){
    
    return new Promise(function(resolve,reject)
    {
        
        let url = "https://api.stackexchange.com/2.3/users/" + userId + "/posts?page=" + pageNumber + "&pagesize=100&order=desc&sort=activity&site=stackoverflow";
        // Implement the GET endpoint here which fetches all the posts from SO
        
        axios.get(url).then(function(response) {
            // console.log('Rahul', response.data.items);
            // var userStats = new Object()
            userStats = {}
            userStats["userId"] = userId
            userStats["reputation"] = response.data.items[0].owner.reputation
            userStats["answers"] = 0
            userStats["questions"] = 0
            userStats["hasMore"] = response.data.has_more
            
            
            // const regex = /\?/g;
            // console.log(chalk.blue("Response: " + JSON.stringify(response.data.items)));
            for(let i = 0; i < response.data.items.length; i++){
                
                let post = response.data.items[i].post_type;
                if (post == "answer")
                    userStats["answers"] += 1;
                else
                    userStats["questions"] += 1;
            }

            // userStats["totalSOScore"] = userStats["answers"]*20 + userStats["questions"]*2 + userStats["reputation"]/10
            
            // console.log("userStats = ", userStats)

            // Send the similar questions as the response
            resolve(userStats);
            })
            .catch(function (error) {
                console.log(chalk.red(error));
                reject(error);
                return; // Terminate execution.
        });
  });
}


async function getStackOverflowStats(userId){
     
    uStats = {}
    uStats["userId"] = userId
    uStats["answers"] = 0
    uStats["questions"] = 0
    uStats["hasMore"] = true
    i = 1
    while (uStats["hasMore"]){
        // console.log("blah")
        let stats = await getStackOverflowStatsByPage(userId,i.toString()).catch(
            err => {console.log('Invalid so_id: ' + userId)});
        
        // console.log('blah2')
        if (stats) {
            uStats["answers"] += stats["answers"]
            uStats["questions"] += stats["questions"]
            uStats["reputation"] = stats["reputation"]
            uStats["hasMore"] = stats["hasMore"]
            i += 1
        }
        else{
            uStats["reputation"] = 0;
            uStats["hasMore"] = false;
        }
        // console.log(uStats)

    }
    // console.log(userStats)
    uStats["totalSOScore"] = uStats["answers"]*10 + uStats["questions"]*2 + uStats["reputation"]/10

    return uStats
}



// getStackOverflowStats('833827283920283').then(function(a){
//     console.log("a",a);
// })


exports.getStackOverflowStats = getStackOverflowStats;
exports.getStackOverflowStatsByPage = getStackOverflowStatsByPage;