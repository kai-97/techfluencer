# Process  

## User stories

#### Use Case 1:

![image](https://media.github.ncsu.edu/user/22609/files/e35ca9a8-0787-4945-acb5-75b2ed72c751)

#### Use Case 2:  

![image](https://media.github.ncsu.edu/user/22609/files/ad65777e-e144-40a3-bc5a-7bbfc4aa52f1)  
![image](https://media.github.ncsu.edu/user/22609/files/668d8522-5b00-4c35-bd91-575d1fed5b7f)
![image](https://media.github.ncsu.edu/user/22609/files/0f4ced68-24ae-41e1-a24b-3f83bdb9326a)

![image](https://media.github.ncsu.edu/user/22609/files/25472002-e17e-42ef-a254-8f2d9045f88c)  
![image](https://media.github.ncsu.edu/user/22609/files/daf5d683-7ce6-4842-bd67-7cda9f362425)
![image](https://media.github.ncsu.edu/user/22609/files/733b905c-6677-4a1a-9ada-b1b6ea957e19)
![image](https://media.github.ncsu.edu/user/22609/files/f1446b0d-10ea-4a7b-8df2-f46deee70047)

![image](https://media.github.ncsu.edu/user/22609/files/84f1f96b-c065-4428-bfeb-5ececfdaa58a)  
![image](https://media.github.ncsu.edu/user/22609/files/40166268-7cbe-48ca-880a-d865caeef476)
![image](https://media.github.ncsu.edu/user/22609/files/e171e7d8-67ae-4152-a565-951a84349be1)

#### Use Case 3:  

![image](https://media.github.ncsu.edu/user/22609/files/e55681a5-fbef-440f-87a3-df0123e24008)  
![image](https://media.github.ncsu.edu/user/22609/files/7531fab9-07e0-465a-a68e-a87e6c15306d) 
![image](https://media.github.ncsu.edu/user/22609/files/04c2bdaf-a716-47d0-b7c4-fef794dd0ebd)

## Iteration worksheet

The iteration worksheet and process reflection can be found in [WORKSHEET.md](https://github.ncsu.edu/csc510-s2022/CSC510-25/blob/master/WORKSHEET.md).

# Practices  

## Core Practices
### Pair Programming
We have incorporated Pair Programming in our working style for this project. We have split the whole process into the following sections:
- Basic Internal Operations
- Making API Calls to GitHub and StackOverflow
- Database Connectivity and Operation
- Testing

While each one of us contributed to all the sections of the work, unknowingly, we gained a deeper understanding (mastery) in separate sections while working on the Bot milestone. 
This gave us an opportunity to implement Pair Programming in our working style. 
We decided to pair up in such a way that someone working on a module requiring multiple functionalities would be paired up with a ‘master’ of one of the functionalities. 
The master/navigator would be the one supervising and guiding the driver in their implementation.
These are the pairings which we worked in:  
| Tasks | Functionality |
| --- | --- |
| Basic Internal Operations + Testing | Testing of basic responses from and to Mattermost |
| API calls + Testing | Testing the veracity of API calls and running into Errors (especially 403: Tries Maxed Out) |
| Score calculation + Database | Pushing the calculated score to MongoDB |
| User Details + Database | Adding/Updating User details to MongoDB |
| Basic Internal Operations + API calls | Making the API calls from node.js |
| Database Connectivity + Testing | The testing of queries and the values they returned |

The benefits we realized:
- Comprehending the code and functionality ‘on-the-go’.
- Able to come up with a better solution by bursts of brainstorming while coding.
- We were able to solve a bug faster than if we tried rectifying it alone.
- Lesser merge issues as everyone was synchronous with each other’s coding style.
- Mentally comforting to have a teammate working together, thus we achieved higher productivity.

### Energized Work 
Through our two week-long sprints, we aimed to plan and distribute the stories and issues effectively so as to set achievable goals for ourselves. We all made sure that we made progress on our assigned tasks everyday instead of trying to finish them in a single go. This allowed us to effectively manage our time and not be overwhelmed by the amount of work that we needed to get done. Incorporating this practice helped us avoid mental exhaustion of any kind which in turn increased our productivity. This made the sprints quite flexible for all of us as we just needed to code for a few hours everyday, and we could do that anytime in the when we felt the most productive. 

## Corollary Practices
### Incremental Development
It can be said that the practice we followed involved incremental deployment as we used to merge the code into our `dev` branch after a feature was completed. We had assigned each feature to a developer. Once a feature was developed we merged it into the `dev` branch after testing the functionality. All the developers stayed in sync with the changes in the code. Therefore, it can be said that we followed the incremental development process while developing our bot. There was no single merge into dev and we did not follow the full deployment process.

### Single Code Base
This bot is developed to be implemented with the mattermost platform as a UI component. The bot can therefore be implemented for any user with a valid mattermost channel. Apart from that, we have tried to structure the code in such a way that the individual functionalities can be picked up to be deployed on a platform other than mattermost thereby ensuring code reusability.

## Scrum
We held daily scrum meetings which was led by a Scrum Master (each teammate took turns) and we discussed daily updates, tasks for the next day and issues faced. You can find the notes to the
scrum meetings [here](https://github.ncsu.edu/csc510-s2022/CSC510-25/blob/master/scrumMeetings.md).

## Kanban Snapshots

We have used the kanban board under the projects tab of this repository.

Following are the screenshots of the board at the end of iterations 1 and 2 respectively.  

![image](https://media.github.ncsu.edu/user/22609/files/7f98f7ce-89d2-4856-88cc-29d7b369f63c)  

![image](https://media.github.ncsu.edu/user/22609/files/feb04890-4283-4fda-9a9e-b3e2aacc6abd)
