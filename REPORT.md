# Problem we are trying to Resolve  
The problem we are trying to address is that of the developers not having a single platform to showcase their contributions of consolidated work which is present across various platforms. We also do not have a well-established platform to identify people who have an influence in the Tech industry.  
Here, we are trying to create a platform where the developers get rewarded for their work. Their activity on various platforms is what we wish to aggregate and help them arrive at a point (metric) for that which helps them get their deserved recognition.

# Primary Features and Screenshots
### Getting started
The `#help_me` message displays the instructions for interacting with the bot. This would display the following message-

<img src="./Acceptance Testing Screenshots/help_me.png">

All the working commands of the BOT are shown above. Following are their explanations in more detail-



### Registering a new user - `#add_me`
A new user can use this command to register themselves on the platform. The details that users provide here are then used to fetch their stats
and calculate their score. This command should be used in a specific format which looks like this-  
`#add_me|Name LastName|UnityID|GitHubID|StackOverFlowID|GitHub Email`  
The details should be provided in the order mentioned above. The bot will not register users if either name or username are not provided, and will display an error message. It is also important to note that the bot would not register the user if the wrong(or dummy) stackoverflow details are provided, and would throw an error.
. The StackOverflow id should be made up of only numeric characters. Complete github email should be provided in the correct format. Wrong details would result
in the following error-

<img src="./Acceptance Testing Screenshots/add_me.png">

If all the guidlines are followed, user would be registered and a success message would be displayed.



### Checking user details - `#my_details`
Any user can check their stored details by giving the `#my_details` command. The details would be displayed in the following format - 

<img src="./Acceptance Testing Screenshots/my_details.png">




### Updating user details - `#update_me`
Exsisting users can use this command to update their details. The command should be given in the following format-  
`#update_me|Name LastName|GitHubID|StackOverFlowID|GitHub Email`  
It should be noted that the unity id cannot be updated. All the fields should be provided even if not all of them are to be updated. Again, the details provided should adhere to all the guidlines followed during the resgitration of a new user.
A success message would be displayed on successful updation. 

<img src="./Acceptance Testing Screenshots/update_me.png">

### Checking the leaderboard - `#rankings`
This command displays the top 10 users and their scores. It should be noted that the scores are calculated based on GitHub and Stackoverflow stats and are updated as these stats change.
To check the rankings, just type -   
`#rankings`  
The rankings would be displayed as shown below-

<img src="./Acceptance Testing Screenshots/rankings.png">

### Checking the user rank - `#my_rank`
Users can check their own score and rank using the `#my_rank` command. The rank and score would not be calculated for a new user unless the databate is 
updated by the daily trigger or manually by a user. The rank would be displayed as shown below - 

<img src="./Acceptance Testing Screenshots/my_rank.png">

### Updating the score and ranks - `#update_db`
Running the `#update_db` command would make the bot fetch the latest stats from GitHub and Stackoverflow to calculate user scores and rankings.
This command should be run after a new user is registered to start seeing their score and rank. It should be noted that this command is auto triggred everyday
at 9:00 PM ET. A success message would be displayed on successfull updation of the database.
<img src="./Acceptance Testing Screenshots/update_db.png">

### Asking a Question - `<Question>?`
To ask any question or query, just type the question followed by a `?`. The bot will then fetch similar questions from the Stackoverflow platform and provide their links.
This can be seen in the following image - 

<img src="./Acceptance Testing Screenshots/question.png">


# Reflection
## Project
### JavaScript Concepts
None of us had significant experience with javascript coming into this project. So this project played a major role in getting us comfortable with the language, its applications and different related practices.   

Understanding and dealing with async functions was a challenge, and we had to get a deep conceptual understanding of these functions to ensure their proper application. We also learned about structuring the javascript code in order to separate different functionalities and enforce the DRY principle. Structuring the code this way also allowed us to work on different functionalities individually, and merge them without much hassle. We aimed at writing good code that is readable and comprehensible. This practice allowed each of us to keep a good pace individually as we did not have to spend a lot of time trying to understand the code someone else wrote.  We also learned about the application of different mocking techniques in javascript(mentioned in detail below). 


### Application of mocking and testing
In addition to implementing the actual functionalities of the bot, we also learned the concepts of mocking and testing. Following the practice of test-driven development, we tried to develop unit tests simultaneously along with our code. This proved beneficial in the later stages of development wherein we had those predefined test cases to ensure that our bot was performing as expected even as we incorporated further modifications to handle edge cases and null data.  

Using mocking in the initial bot phase gave us a way to chalk out our use cases more coherently and helped us get clarity on what our implementation was supposed to look like. We also used mocking modules like the Axios mock-adapter and mongo in-memory server for our test suite which helped us limit our API calls while in the development phase. This was especially helpful for our update_db functionality since a single call to the function would result in multiple API calls as the program ran through all the user instances.

### Cloud Database integration (MongoDB)
We intended to store the data for enrolled users in a database. The data stored was user credentials, GitHub IDs and StackOverflow IDs. This was eventually used to fetch user activity and assign points to each user. These points were in turn stored in the database to always be ready whenever a user made a request to view the data.
We used MongoDB which is a cloud based database. The reason to choose a cloud based DB was to make the data accessible 24X7 and remove its dependency on the software as a whole.
Finally, to keep the data always updated, we set an automatic refresh of the database at 9PM everyday so that the users get the latest score. The users can also update the database manually if they wish to see the results in real time.

### Dynamic Adaptation
One of the key aspects of the development process was that the team was flexible enough to take in feedback and improve upon it. We had initially started our project with certain use cases that were beyond our scope. As the development proceeded we made sure to keep getting feedback from the Professor and the TAs to make sure that everyone was on the same page. After the first milestone we ensured to reevaluate the use cases and fit them to the scope of the project. Then we discussed them with the TAs and went ahead with the implementation.
Apart from reevaluating our design we also ensured to cross check the tests written by a developer. This practice was followed inorder to ensure that edge cases were also covered that may have been missed by a single developer. Also whenever we encountered edge cases and validation checks that had not been handled then in those cases we promptly added those changes and modified them.

## Process
### Team Collaboration
#### Adapting to new ideas and interaction
We started off with a problem statement that came through a lot of changes in the process eventually and we as a team always were open to trying a new idea that came through. Because of this approach, we were able to add a lot of new features in our product. We did not limit our ideas to product features, we also tried new approaches in coding activity and practices. We tried structuring our functions a certain way and adopted a structure that worked best for us, we also came up with different coding practices that worked best for our team and their schedule.

#### Scrum meetings
We made it a point to have daily scrums at the end of the day to ensure continuous progress in our work. This was beneficial as being communicative of the daily updates helped us stay informed of where we stood in the process and to better adhere to the timeline of our project. It also enabled us to tackle issues before they became any more critical.

#### Agile 
We tried to incorporate Agile practices throughout the development process, and that helped us prioritize our functionalities and come up with a working product which satisfied the basic functionality needs and then some. We started out by scoping out the project and understanding the requirements. Then we prioritized our use cases with the goal of putting together a working bot with minimum functionalities. We made progress by iteratively adding more functionality ensuring that we had a working bot by the end of each iteration. As we made progress, we identified the functionalities that we thought did not add a lot to the bot, and the flexibility of the process allowed us to make the respective changes in the bot without making a lot of changes. We made sure to test our bot rigorously throughout the development process and after the addition of all functionalities. 

The progress of our process has been documented here - [WORKSHEET.md](https://github.ncsu.edu/csc510-s2022/CSC510-25/blob/master/WORKSHEET.md)

### Programming Practices
We followed Iterative development where we broke down the user stories into smaller stories and developed them. Once we had completed all the smaller user stories we integrated all of them together to complete a user case. Alongside the development we ensured to perform testing simulta	neously so as to ensure that the entire story got completed, thus performing continuous integration. 

As we broke down the larger user stories into smaller ones and assigned it to different developers we also included the practice of pair programming. We ensured that developers working on the same story would stay in sync and collaborate, so as to avoid any merge conflicts from happening and also ensure redundancy of functionalities.

We also ensured to maintain a single coding standard that all the developers adhered to and therefore, all the code with similar functionalities have the same structure.

Apart from this we incorporated regular refactoring of the code as and when we encountered any edge cases, or if certain functionalities did not work as expected. We also ensured to reuse certain pieces of code to avoid redundancy.

#### No comments in codes
Commenting the code was something we should have done regularly as we ourselves got lost while finding certain functionalities. We only initially adopted this practice which we regret not following till the end. It would have been easier to understand each other's work and we would have saved a lot of time as well with code comments.

#### Learning Presenting our work
Presenting our work is something we do not do on a day-to-day basis, but it is a very important aspect as it pretty much sums up all the work you have done, in those few minutes. These minutes in which people present/pitch their work is what in today’s world decides whether your company makes billions or breaks pennies. Having to present our intermediate works helped us gain skills like:  
 - Limiting scope of concentration
 - Identifying important features
 - Scripting
 - Presenting
 - Audio Visual editing    
We are sure these skills will come in handy when we are presenting our work to our managers/investors.

#### Git
1. Good practices  
We tried to follow good git practices by keeping the branches separate for different functionalities and fixes. Firstly, we made sure that code was never directly committed to the main branch and that all development took place on dev and its other branches. We also ensured that when the code on a branch was done and tested, we merged that branch to dev and pulled those changes to local branches so that any further development being done elsewhere was in sync with already tested and reviewed code. Furthermore, all the merges were done through pull requests so as to ensure that the code and functionality was reviewed by other team members before incorporating them into dev.

2. Scope for improvement  
A part of the learning process throughout this experience was making mistakes. As we created more and more PR on the dev branch, we started paying less attention to these PRs and that led to a mistake that ate into a big chunk of our time. For one of the PRs, we did not notice that it was actually created on the master branch instead of dev. Later when we tried to merge dev with the master branch, this mistake led to a lot of merge conflicts which we had to resolve manually. We learned from this mistake and always made sure to review the PRs before merging them.  
One of the practices that we had not followed initially was adding comments on the PRs made. However, in the later milestones we ensured to add the comments while raising a PR and before merging them.

# Limitations and Future Scope

## Limitations 

### Veracity of user data
We were taking user data as input from the user and checking if the data is in the correct format but we are not checking for the veracity of the data for all the credentials. We are checking if a valid and active GitHub and StackOverflow ID is entered by the user or not and we throw an error for the same, but we did not do the same for email. We are only checking if the format of the email entered is correct or not. We would want to check if an email is active or not in the future.

## Future Scope
### Integrate more APIs
At present, our bot inly considers activity on Github and Stackoverflow to determine the score for a user. But there are numerous other platforms which allow user participation to help others. These can be platforms like GeeksForGeeks and Kaggle. In future, the user activity on these platforms can also be considered while calculating the user score.

### Improve scoring mechanism
Currently, our implementation evaluates the github component of the score based on recent commits. This functionality can be further enhanced by incorporating different types of activities such as creation and closing of issues, pull requests and project board activities as they too are a vital part of the software development process. The scoring mechanism can also be enhanced by assessing the quality of the commits rather than just their number. 

### Incorporating Mattermost points
Along with the current points system, we plan to also integrate points allotment for within mattermost activities like where a person replies to a question or a comment with an emoji or simply has something positive to say, the person gets rewarded.


### Points based on categories
One of the improvements that can be made for ranking an individual would be to provide scores based on categories. The current implementation considers an overall score of the user based on their Stackoverflow/GitHub activity. However, if a user wishes to just compete against their peers who are experts in the same category then that can be achieved by fetching individual category scores. This feature would fetch customized leaderboards which would be based on categories so an user can check their rankings only in their field of interest and also check their improvements.
