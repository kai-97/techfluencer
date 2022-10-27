jest.mock('mattermost-client');
let Client = require('mattermost-client');
var chai = require('chai');
var assert = chai.assert;


process.env.NODE_ENV = 'test';

const bot = require('../index');
const getSQ = require("../features/getSimilarQuestions")
const getR = require("../features/getRanking")
const getGH = require("../features/getGitHubData")
const getSOS = require("../features/getStackOverflowStats")
const updateStats = require('../features/updateStats')
const emoji = require('node-emoji');

process.env.MONGODB_URI = global.__MONGO_URI__;
process.env.BOTTOKEN = '';

const {MongoClient, ExplainVerbosity} = require('mongodb');
const mockDatabase = require('./mocks/mockDatabase.json')

let mockclient = Client.mock.instances[0];
// let mockDBClient;

let mockData = require('../mock.json');
const { default: axios } = require('axios');
const { expect } = require('chai');
let MockAdapter = require("axios-mock-adapter");
let mock = new MockAdapter(axios);

let similarQuestions = require("./mocks/SOSimilarQuestions.json");



mock.onGet("https://api.stackexchange.com/2.3/users/5875416/posts?page=1&pagesize=100&order=desc&sort=activity&site=stackoverflow").reply(200, mockData.userStatsPage1);
mock.onGet("https://api.stackexchange.com/2.3/users/5875416/posts?page=2&pagesize=100&order=desc&sort=activity&site=stackoverflow").reply(200, mockData.userStatsPage2);

mock.onGet("https://api.stackexchange.com/2.3/similar?page=1&pagesize=5&order=desc&sort=relevance&title=What is Python?&site=stackoverflow").reply(200, similarQuestions);
mock.onGet("https://api.github.com/repos/octocat/apple/commits").reply(200, mockData.commits[0]);
mock.onGet("https://api.github.com/repos/octocat/blueberry/commits").reply(200, mockData.commits[1]);
mock.onGet("https://api.github.com/repos/octocat/cherry/commits").reply(200, mockData.commits[2]);
mock.onGet("https://api.github.com/repos/octocat/guava/commits").reply(200, mockData.commits[3]);
mock.onGet("https://api.github.com/users/octocat/repos?sort=created").reply(200, mockData.repos);
mock.onGet("https://api.github.com/users/jarvis/repos?sort=created").reply(200, mockData.repos2);
mock.onGet("https://api.github.com/users/friday/repos?sort=created").reply(200, mockData.repos3);
mock.onGet("https://api.github.com/users/parker/repos?sort=created").reply(200, mockData.repos3);
mock.onGet("https://api.github.com/repos/jarvis/red/commits").reply(200, mockData.commits2[0]);
mock.onGet("https://api.github.com/repos/jarvis/blue/commits").reply(200, mockData.commits2[1]);
mock.onGet("https://api.github.com/repos/jarvis/mark42/commits").reply(200, mockData.commits2[2]);


describe("Techfluencers Tests", function() {
    
    describe("Techfluencers index.js Tests", function() {

        let mockDBClient;
        let mockPostMessage = mockclient.postMessage;
        
        beforeAll(async () => {
            mockDBClient = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            });
        //   console.log(global.__MONGO_DB_NAME__)
        //   console.log(global.__MONGO_URI__)
        //   db = await mockDBClient.db("database");
            
        });
        
        afterAll(async () => {
            await mockDBClient.db("database").collection('user_details').deleteMany({});
            await mockDBClient.close();
        });
        
        it('Inserted dummy data into collection', async () => {
            const users = await mockDBClient.db("database").collection('user_details');
        
        //   const mockUser = {_id: 'some-user-id', name: 'John'};
        //   const mockUser = mockDatabase[0];
            for(let i=0; i<mockDatabase.length; i++){
                const mockUser = mockDatabase[i];
                await users.insertOne(mockUser);
                const insertedUser = await users.findOne({_id:mockUser._id});
                expect(insertedUser).to.deep.equal(mockUser);
            }
            
        });
    
        it("ensures that hears() returns true for ?", function() {
            // CREATE TEST OBJECT
            mockData.message.data.post = JSON.stringify({"message": "What is Python?"});
            let returnValue = bot.hears(mockData.message, "?")
            assert(returnValue === true);
        });

        it("ensures that hears() returns false for empty string", function() {
            // CREATE TEST OBJECT
    
            mockData.message.data.post = JSON.stringify({"message": ""});
            let returnValue = bot.hears(mockData.message, "#rankings")
            assert(returnValue === false);
        });

        it("ensures that hears() returns false for wrong input", function() {
            // CREATE TEST OBJECT
    
            mockData.message.data.post = JSON.stringify({"message": "blah"});
            let returnValue = bot.hears(mockData.message, "#rankings")
            assert(returnValue === false);
        });

        it("ensures that client is created", function() {
            // CREATE TEST OBJECT
            expect(Client).to.be.a('function');
        });

        it("ensures that establishConnection returns a MongoDB client", async function() {
            return await bot.establishConnection()
            .then((returnValue) => {
                expect(returnValue).to.be.a('object');
                expect(returnValue).to.respondTo('connect');
                expect(returnValue.s.url).to.equal(process.env.MONGODB_URI);
            });
        });

        it("ensures that #help_me lists all available input options", async function() {
            
            let expectedString = "#### "+emoji.get('blue_book')+"Commands List:    \n"+
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
            
            mockData.message.data.post = JSON.stringify({"message":"#help_me"}); 
            
            // let mockPostMessage = mockclient.postMessage;
            return await bot.parseMessage(mockData.message, mockclient, mockDBClient)
            .then((returnValue) => {
                
                expect(mockPostMessage.mock.calls[0][0]).equal(expectedString, mockData.message.broadcast.channel_id);
            })
        });

        it("ensures that asking a question with a '?' posts similar questions", async function() {
            // CREATE TEST OBJECT
            
            let s = "| Suggestion #  | Question \n"+
            "| :------------: |:---------------\n"+
            "| Suggestion 1|" + 
                "[What is Python used for](https://stackoverflow.com/questions/1909512/what-is-python-used-for)|\n" +
                "| Suggestion 2|" +
                "[What is Python implicit relative import](https://stackoverflow.com/questions/48716943/what-is-python-implicit-relative-import)|\n" +
                "| Suggestion 3|" +
                "[what is python interpreter bytecode languages](https://stackoverflow.com/questions/32549832/what-is-python-interpreter-bytecode-languages)|\n" +
                "| Suggestion 4|" +
                "[what is python doing with systemtap](https://stackoverflow.com/questions/47140035/what-is-python-doing-with-systemtap)|\n" +
                "| Suggestion 5|" +
                "[what is python equivalent of getInputStream() and getOutputStream()](https://stackoverflow.com/questions/57140491/what-is-python-equivalent-of-getinputstream-and-getoutputstream)|\n";
            
            mockData.message.data.post = JSON.stringify({"message":"What is Python?"}); 
            
            // let mockPostMessage1 = mockclient.postMessage;
            return await bot.parseMessage(mockData.message, mockclient, mockDBClient)
            .then(async(returnValue) => {
                const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
                await delay(1000);
                console.log(mockPostMessage.mock.calls);
                
                expect(mockPostMessage.mock.calls[1][0]).equal(s, mockData.message.broadcast.channel_id);
            })
        });

        it("ensures that #my_rank gives user's rank", async function() {
            
            let expectedString = "octocat's rank is 2 with points 1010.9";
            
            mockData.message.data.post = JSON.stringify({"message":"#my_rank"}); 
            
            // let mockPostMessage1 = mockclient.postMessage;
            return await bot.parseMessage(mockData.message, mockclient, mockDBClient)
            .then((returnValue) => {
                console.log(mockPostMessage.mock.calls);
                expect(mockPostMessage.mock.calls[2][0]).equal(expectedString, mockData.message.broadcast.channel_id);
            })
        });

        it("ensures that #rankings posts the leaderboard", async function() {
            
            let expectedString = "##### Here is the Leaderboard:\n\n"
                                + "| Rank | Points | Name \n"
                                + "| :-----: | :-----: | :----- \n"
                                + "| 1 | 1210 | Tony Stark\n"
                                + "| 2 | 1010 | Octocat\n";
            
            mockData.message.data.post = JSON.stringify({"message":"#rankings"}); 
            
            // let mockPostMessage1 = mockclient.postMessage;
            return await bot.parseMessage(mockData.message, mockclient, mockDBClient)
            .then((returnValue) => {
                console.log(mockPostMessage.mock.calls);
                expect(mockPostMessage.mock.calls[3][0]).equal(expectedString, mockData.message.broadcast.channel_id);
            })
        });
        
        it("ensures that #my_details fetches user's details", async function() {
            
            let expectedString = "##### Here are details for ***'octocat':***\n\n"
            + "| Field | Details \n"
            + "| :------------: |:---------------\n"
            + "| Name: |Octocat|\n"
            + "| UnityID: |octocat\n"
            + "| GitHub ID: |octocat|\n"
            + "| StackOverFlow ID: |5875416|\n"
            + "| GitHub EmailID: |octocat@email.com";
            
            mockData.message.data.post = JSON.stringify({"message":"#my_details"}); 
            
            return await bot.parseMessage(mockData.message, mockclient, mockDBClient)
            .then((returnValue) => {
                console.log(mockPostMessage.mock.calls);
                expect(mockPostMessage.mock.calls[4][0]).equal(expectedString, mockData.message.broadcast.channel_id);
            })
        });

        it("ensures that #update_me updates details of the specified user in database", async function() {
            
            let expectedString = "Success";
            
            mockData.message.data.post = JSON.stringify({"message":"#update_me|Tony Stark|friday| 5875416 |friday@somemail.com"});
            mockData.message.data.sender_name = "ironman";
            return await bot.parseMessage(mockData.message, mockclient, mockDBClient)
            .then((returnValue) => {
                console.log(mockPostMessage.mock.calls);
                expect(mockPostMessage.mock.calls[5][0]).equal(expectedString, mockData.message.broadcast.channel_id);
            })
        });
        
        it("ensures that #add_me updates details of the specified user in database", async function() {
            
            let expectedString = "Success";
            
            mockData.message.data.post = JSON.stringify({"message":"#add_me|Peter Parker|pparker|parker|5875416|peter@email.com"});
            mockData.message.data.sender_name = "ironman";
            return await bot.parseMessage(mockData.message, mockclient, mockDBClient)
            .then((returnValue) => {
                console.log(mockPostMessage.mock.calls);
                expect(mockPostMessage.mock.calls[6][0]).equal(expectedString, mockData.message.broadcast.channel_id);
            })
        });
        
        
    });
    
    describe("Techfluencers getSimilarQuestions Tests", function() {
        
        it("ensures that getSimilarQuestions() returns similar questions", async function() {
            // CREATE TEST OBJECT
            dict = {
                "What is Python used for" : "https://stackoverflow.com/questions/1909512/what-is-python-used-for",
                "What is Python implicit relative import" : "https://stackoverflow.com/questions/48716943/what-is-python-implicit-relative-import",
                "what is python interpreter bytecode languages" : "https://stackoverflow.com/questions/32549832/what-is-python-interpreter-bytecode-languages",
                "what is python doing with systemtap" : "https://stackoverflow.com/questions/47140035/what-is-python-doing-with-systemtap",
                "what is python equivalent of getInputStream() and getOutputStream()" : "https://stackoverflow.com/questions/57140491/what-is-python-equivalent-of-getinputstream-and-getoutputstream"
            }

            return await getSQ.getSimilarQuestions("What is Python?")
            .then((returnValue) => {
                assert.deepEqual(returnValue,dict)
            })
        });


        it("ensures that parseSimilarQuestions() posts similar questions", async function() {
            // CREATE TEST OBJECT
            
            s = "| Suggestion #  | Question \n"+
            "| :------------: |:---------------\n"+
            "| Suggestion 1|" + 
                "[What is Python used for](https://stackoverflow.com/questions/1909512/what-is-python-used-for)|\n" +
                "| Suggestion 2|" +
                "[What is Python implicit relative import](https://stackoverflow.com/questions/48716943/what-is-python-implicit-relative-import)|\n" +
                "| Suggestion 3|" +
                "[what is python interpreter bytecode languages](https://stackoverflow.com/questions/32549832/what-is-python-interpreter-bytecode-languages)|\n" +
                "| Suggestion 4|" +
                "[what is python doing with systemtap](https://stackoverflow.com/questions/47140035/what-is-python-doing-with-systemtap)|\n" +
                "| Suggestion 5|" +
                "[what is python equivalent of getInputStream() and getOutputStream()](https://stackoverflow.com/questions/57140491/what-is-python-equivalent-of-getinputstream-and-getoutputstream)|\n";
            
            mockData.message.data.post = JSON.stringify({"message":"What is Python?"}); 
            
            const mockPostMessage = mockclient.postMessage;
            return await getSQ.parseQuestion(mockData.message,mockclient)
            .then((returnValue) => {
                expect(mockPostMessage.mock.calls[7][0]).equal(s, mockData.message.broadcast.channel_id);
            })
        });
    });

    describe("Techfluencers getGitHubData.js tests", function() {

        it("ensures that getUserRepos returns 3 most recent repositories", async function() {
            
            let repoList = ["octocat/apple", "octocat/blueberry", "octocat/cherry"]
            return await getGH.getUserRepos('octocat')
            .then((returnValue) => {
                assert.deepEqual(returnValue,repoList)
            })
        });

        it("ensures that getUserCommits returns 7 commits", async function() {
            // let w = await getUserRepos(user);
            
            return await getGH.getUserCommits("octocat", "octocat@email.com")
            .then((returnValue) => {
                assert.deepEqual(returnValue,7)
            })
        });

        it("ensures that getUserCommitsToRepo returns 3 commits", async function() {
            // let w = await getUserRepos(user);
            
            return await getGH.getUserCommitsToRepo("octocat@email.com", "octocat/apple")
            .then((returnValue) => {
                assert.deepEqual(returnValue,3)
            })
        });


    });

    describe("Techfluencers getStackOverflowStats Tests", function() {


        it("ensures that getStackOverflowStatsByPage() returns the SO stats of a user on one page.", async function() {
            // CREATE TEST OBJECT
    
            let userStats = {
                "userId": '5875416',
                "answers": 2,
                "questions": 2,
                "hasMore": true,
                "reputation": 6923,
                // "totalSOScore": 2524.3
              }
            user = "5875416"
            return await getSOS.getStackOverflowStatsByPage(user,1)
            .then((returnValue) => {
                assert.deepEqual(returnValue,userStats)
    
            })
        });


        it("ensures that getStackOverflowStats() returns the complete SO stats and score for a user.", async function() {
            // CREATE TEST OBJECT
    
            let userStats = {
                "userId": '5875416',
                "answers": 5,
                "questions": 3,
                "hasMore": false,
                "reputation": 6923,
                "totalSOScore": 748.3
              }
            user = "5875416"
            return await getSOS.getStackOverflowStats(user)
            .then((returnValue) => {
                assert.deepEqual(returnValue,userStats)
    
            })
        });

    
    });

    describe("Techfluencers getRankings Tests", function() {
    
        let mockDBClient;
        // let db;
        
        beforeAll(async () => {
            mockDBClient = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            });
        //   console.log(global.__MONGO_DB_NAME__)
        //   console.log(global.__MONGO_URI__)
        //   db = await mockDBClient.db("database");
            
        });
        
        afterAll(async () => {
            await mockDBClient.db("database").collection('user_details').deleteMany({});
            await mockDBClient.close();
        });
        
        it('Inserted dummy data into collection', async () => {
            const users = await mockDBClient.db("database").collection('user_details');
        
        //   const mockUser = {_id: 'some-user-id', name: 'John'};
        //   const mockUser = mockDatabase[0];
            for(let i=0; i<mockDatabase.length; i++){
                const mockUser = mockDatabase[i];
                await users.insertOne(mockUser);
                const insertedUser = await users.findOne({_id:mockUser._id});
                expect(insertedUser).to.deep.equal(mockUser);
            }
            
        });
    
        it("ensures that getUserDetail(client, user) returns rankings of the specified user", async function() {
                        
            let expectedString = `octocat's rank is 2 with points 1010.9`;
            return await getR.getUserDetail(mockDBClient, 'octocat')
            .then((returnValue) => {
                assert.deepEqual(returnValue, expectedString)
            });
        });

        it("ensures that getAllData(client) returns rankings of all users in database", async function() {
            let expectedValue = {
                "data": mockDatabase};
            return await getR.getAllData(mockDBClient)
            .then((returnValue) => {
                assert.deepEqual(returnValue, expectedValue)
            });
        });

        it("ensures that updateUserDetailsByUsername updates details of the specified user in database", async function() {
            let user_update = {
                name: "Tony Stark",
                //username: message_user[2],
                gh_id: "friday",
                so_id: "5875416",
                gh_email: "friday@somemail.com"
            };
            let expectedValue = {
                "_id":"623e139125b98b8ee8d79618",
                "name":"Tony Stark",
                "username":"ironman",
                "gh_id":"friday",
                "so_id":"5875416",
                "gh_points":1000,
                "so_points":210.3,
                "total_points":1210.3,
                "gh_email":"friday@somemail.com"
            };
            await getR.updateUserDetailsByUsername(mockDBClient, 'ironman', user_update);
            
            return await mockDBClient.db("database").collection('user_details').findOne({username:"ironman"})
            .then((returnValue) => {
                assert.deepEqual(returnValue, expectedValue)
            });
        });

        it("ensures that getUserDetailOne returns details of the specified user", async function() {
                        
            let expectedString = "##### Here are details for ***'octocat':***\n\n"+
            "| Field | Details \n"+
        "| :------------: |:---------------\n"+
             "| Name: |Octocat|\n"
            + "| UnityID: |octocat\n"
            + "| GitHub ID: |octocat|\n"
            + "| StackOverFlow ID: |5875416|\n"
            + "| GitHub EmailID: |octocat@email.com";
            return await getR.getUserDetailOne(mockDBClient, 'octocat')
            .then((returnValue) => {
                assert.deepEqual(returnValue, expectedString)
            });
        });

        it("ensures that createMultipleUsers adds a new user to the database", async function() {
            let new_user_json = [{
                name: "Peter Parker",
                username: "pparker",
                gh_id: "peter",
                so_id: '',
                gh_points: 0,
                so_points: 0,
                total_points: 0,
                gh_email: 'peter@email.com'
            }];

            let returnValue = await getR.createMultipleUsers(mockDBClient, new_user_json)
            assert.deepEqual(returnValue.acknowledged, true);
            assert.deepEqual(returnValue.insertedCount, 1);
            console.log(returnValue)
            return await mockDBClient.db("database").collection('user_details').findOne({_id:returnValue.insertedIds[0]})
            .then((insertedDetails) => {                
                assert.deepEqual(insertedDetails, new_user_json[0])
            });
    
        });
        
                
    });

    describe("Techfluencers updateStats Tests", function() {

        let mockDBClient;
        
        beforeAll(async () => {
            mockDBClient = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            });
            // await mockDBClient.connect();
        //   console.log(global.__MONGO_DB_NAME__)
        //   console.log(global.__MONGO_URI__)
        //   db = await mockDBClient.db("database");
            
        });
        
        afterAll(async () => {
            await mockDBClient.db("database").collection('user_details').deleteMany({});
            await mockDBClient.close();
        });
        
        it('Inserted dummy data into collection', async () => {
            const users = await mockDBClient.db("database").collection('user_details');
        
        //   const mockUser = {_id: 'some-user-id', name: 'John'};
        //   const mockUser = mockDatabase[0];
            for(let i=0; i<mockDatabase.length; i++){
                const mockUser = mockDatabase[i];
                await users.insertOne(mockUser);
                const insertedUser = await users.findOne({_id:mockUser._id});
                expect(insertedUser).to.deep.equal(mockUser);
            }
            
        });

        it('ensures that updateUserStats fetches stackoverflow and github details of all users', async () => {
            let expectedValue = {
                "data": [
                    {
                        "username": "octocat",
                        "gh_email": "octocat@email.com", 
                        "gh_id": "octocat", 
                        "so_id": "5875416"
                    }, 
                    {
                        "username": "ironman",
                        "gh_email": "jarvis@email.com", 
                        "gh_id": "jarvis", 
                        "so_id": "5875416"
                    }
                ]
            };
            return await updateStats.updateUserStats(mockDBClient)
            .then((returnValue) => {
                assert.deepEqual(returnValue, expectedValue)
            });

        });

        it('ensures that calculatePoints updates db with accurate points and handles null values', async () => {
            let expectedData = mockDatabase;
            expectedData[0].gh_points = 700;
            expectedData[1].gh_points = 0;
            expectedData[0].so_points = 748.3;
            expectedData[1].so_points = 0;
            expectedData[0].total_points = 714.4899999999999;
            expectedData[1].total_points = 0;
            const data = [
                {
                    "username": "octocat",
                    "gh_email": "octocat@email.com", 
                    "gh_id": "octocat", 
                    "so_id": "5875416"
                }, 
                {
                    "username": "ironman",
                    "gh_email": "jarvis@email.com", 
                    "gh_id": "", 
                    "so_id": ""
                }
            ];
            await updateStats.calculatePoints(mockDBClient, data);
            // const updatedUserdata = await mockDBClient.db('database').collection('user_details').findOne({_id:expectedData[0]._id});
            // expect(updatedUserdata).to.deep.equal(expectedData[0]);
            for(let i = 0; i < data.length; i++){
                const mockUser = expectedData[i];
                const updatedUserdata = await mockDBClient.db('database').collection('user_details').findOne({_id:mockUser._id});
                expect(updatedUserdata).to.deep.equal(mockUser);
            }
            
        });

    });
    
});
