# Meeting 1: 03/21/2022 - Scrum Master: Kaivan Shah
## Stories
### Leaderboard
As a user, I want to know the top 10 people to compete better.  
As a user, I want to know my own score, to compete and get a better rank.  
As a user, I want to add my GH activity daily, to increase my score.  
As a user, I want to add my SO activity daily, to increase my score.  

### Asking a Question
As a user, I want to ask my queries, to gain more knowledge.  
As a user, I want to see questions that are similar to my queries, to get a faster response.  

## Tasks
### Leaderboard
| Task | Status| 
| --- | --- |
| Frontend | Complete  
| GH API | TBD   
| SO API | TBD   
| Display | Complete |
| Calculation of score | TBD  
| #my_score functionality | TBD  
| Mocks | to be eliminated  
| DB Querying | TBD (Fetching + Updation)  

### Asking a Question
| Task | Status| 
| --- | --- |
| Frontend | Complete  
| Similar Question API | TBD  
| Display | Complete  
| Mocks | to be eliminated  

### Database
| Task | Status| 
| --- | --- |
| Set up | Complete  
| Populating DB | Complete  
| Connectivity to node.js | TBD  
| Connecting to Other Usecases | TBD  
| Querying | TBD  

# Meeting 2: 03/22/2022 - Scrum Master: Manasi Ghosalkar

## Update on meeting with the TA.
1. User story for DB also should be added. (We can add it in todays scrum meeting)
2. Regarding practices (Core+Corollary), clarify with Prof. Ore as Zari wasn't sure.
3. We have to follow Scrumban. She emphasized.
4. Process.md needed during the next submission along with the presentation to the TAs.
5. Use cases dont have to be fully functional in the next presentation, you can use mock data but each use case has to show some development compared to work done in Bot: Milestone. (Proof of Concept Expected)
6. Scrum meeting documentation on GH is okay.

## Stories
### Leaderboard
As a user, I want to know the top 10 people to compete better.  
As a user, I want to know my own score, to compete and get a better rank. **- Assigned**  
As a user, I want to add my GH activity daily, to increase my score.  
As a user, I want to add my SO activity daily, to increase my score.  

### Asking a Question
As a user, I want to ask my queries, to gain more knowledge.  
As a user, I want to see questions that are similar to my queries, to get a faster response.  

### Database
As a user, I want my data to be stored and updated regularly on cloud, to get my latest score. **- Assigned**

## Tasks
### Leaderboard
| Task | Status| 
| --- | --- |
| Frontend | Complete  
| GH API | TBD   
| SO API | TBD   
| Display | Complete |
| Calculation of score | TBD  
| #my_score functionality | TBD  
| Mocks | to be eliminated  
| DB Querying | TBD (Fetching + Updation)  

### Asking a Question
| Task | Status| 
| --- | --- |
| Frontend | Complete  
| Similar Question API | TBD  
| Display | Complete  
| Mocks | to be eliminated  

### Database
| Task | Status| 
| --- | --- |
| Set up | Complete  
| Populating DB | Complete  
| Connectivity to node.js | TBD  
| Connecting to Other Usecases | TBD  
| Querying | TBD  

# Meeting 3: 03/23/2022 - Scrum Master: FNU Roshani

1. Added new user stories
2. Planned how to integrate MongoDB database
3. Discussed Core practices that can be followed
4. Started working on GH and SO API integrations


# Meeting 4: 03/24/2022 - Scrum Master: Kaivan Ketan Shah

1. Held meeting with Professor J.W.Ore for clarification regarding.
2. Clarification regarding Core + Corollary
3. Story points added for all usecases
4. Story further broken down to sub-stories. Also complete assignment of stories.
5. Database Connectivity Established
6. 3rd party API + DB integration initiated.

# Meeting 5: 03/25/2022 - Scrum Master: Manasi Ghosalkar

1. Added Iteration worksheet `WORKSHEET.md`
2. Added Database operations
3. Use Case 1 (Asking questions) completed
4. Use Case 3 (Fetching ranks) completed
5. Kanban board updated

# Meeting 6: 03/28/2022 - Scrum Master: Rahul Shukla
1. Added new story for score calculations - [link](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42898)
2. Started development for this story
3. Started writing test for `getSimilarQuestions()`

# Meeting 7: 03/29/2022 - Scrum Master: FNU Roshani
1. Updation of user details like github email, GitHub and StackOverflow id and points to database.
2. Decided on schedule for remaining tasks
3. Decided on how to calcukate GitHub points
4. Database story test cases started

# Meeting 8: 03/30/2022 - Scrum Master: Kaivan Ketan Shah
1. GitHub API to get commits complete
2. StackOverflow API to get statistics complete.
3. Completed module for score calculation for GitHub and StackOverflow.
4. Updating scores to Database for every user.
5. StackOverflow similar questions testing done.
6. MongoDB Testing initiated.

# Meeting 9: 03/31/2022 - Scrum Master: Manasi Ghosalkar
1. Tests for `getGitHubData` - completed.
2. Tests for `getStackOverflowStats` - completed.
3. Implementing `updateStats` at specified time - completed.
4. Mock for mongoDB - In progress.
5. Addition and updation of user details - In progress.

# Meeting 10: 04/11/2022 - Scrum Master: FNU Roshani
## In progress
*[Discussion involved all the team members]*
1. Add validation checks to handle wrong inputs.
2. Start VCL Setup
3. Start working on deployment on ansible
4. Increase test coverage
5. Start acceptance testing
6. Task Assignment

# Meeting 11: 04/12/2022 - Scrum Master: Manasi Ghosalkar
## In progress
1. Developing validation checks to handle wrong inputs *[Team Members: Rahul Shukla]*
2. Deployment on ansible *[Team Members: Roshani, Kaivan Shah, Manasi Ghosalkar]*
3. Increase test coverage *[Team Members: Manasi Ghosalkar]*
4. Start acceptance testing *[All members]*

## Done
1. VCL Setup *[Team Members: Kaivan Shah]*

# Meeting 12: 04/13/2022 - Scrum Master: Kaivan Ketan Shah
## In progress
1. Unit Testing 76% achieved *[All members]*
2. Proceeded to Clone GitHub repo to VCL. Stuck up on some points. TBD in office hours. *[All members]*
3. Made progress with validation checks. *[Team Members: Rahul Shukla]*

## Done
1. Mongo Mock Completed for testing *[Team Members: Manasi Ghosalkar]*

# Meeting 13: 04/14/2022 - Scrum Master: Manasi Ghosalkar
## In progress
1. Unit Testing 73% achieved *[All members]*
2. Adding tests to index.js for >80% coverage *[Team Member: Manasi Ghosalkar]*
3. Proceeding with bot deployment on VCL *[Team Members: Kaivan Shah, Roshani, Manasi Ghosalkar]*
4. Validation checks *[Team Members: Rahul Shukla]*

## Done
1. Cloning github repo to VCL *[Team Members: Roshani, Kaivan Shah]*
2. Validation checks for new and updated user details *[Team Members: Rahul Shukla]*


# Meeting 14: 04/14/2022 - Scrum Master: Kaivan Ketan Shah
## In progress
1. Unit Testing 90% achieved *[All members]*

## Done
1. Added tests to index.js *[Team Member: Manasi Ghosalkar]*
2. Bot deployment on VCL Completed with first level of checking *[Team Members: Kaivan Shah, Roshani, Manasi Ghosalkar]*
3. Discussed further Deployment steps to be completed. *[All members]*
