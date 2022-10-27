# Milestone: DEPLOYMENT

### Deployment

Configuration Management Tools:  
- Ansible

Deployment Scripts:
- install-app.yml
- .env
- secrets.json

Preparation Before executing `install-app.yml`:
1. Get a GitHub Personal Access Token:  
    a. Go to GitHub User Settings.  
        <img src="./images/github_user_settings1.PNG">  
    b. Select `Developer Settings` > `Personal Access Tokens`.  
    c. Click on `Generate New Token`.  
    d. Give a name to it the token.  
    e. `Expiration` can be set to **30 days**.  
    f. Select the following checkboxes:  
        - repo  
        - admin:public_key  
        - user  
        - admin: gpd_key  

    g. Click on `Generate Token`.  
    h. Please note the token and copy it at a secure place where it can be accessed.  
2. Copy the file `secrets.json` on Desktop of VCL and Open it. You will see something like this:  
    
    ```json
    {
        "variables":{
            "token":"{{GitHub Token}}",
            "username":"{{Github Username}}"
        }
    }
    ```


    Replace the `{{GitHub Token}}` and `{{GitHub Username}}` by the actual details of the GitHub Token and the username respectively. Save the File.  
    
3. Copy and paste the `install-app.yml` and `hosts` files to VCL Desktop.  
    
4. Create a new folder on Desktop named `env_file`. Copy Paste the `.env` file in the folder `env_file`.   
    
5. Open the terminal and navigate to the Desktop using the command.  
    ``` cd Desktop```.  

6. run the following command:  
    ```yml
    ansible-playbook install-app.yml
    ```

7. Once all the tasks are run successfully, we can conclude that the deployment and configuration for the app has completed successfully.

8. You can then go to **Mattermost** and go to the ***techfluencer*** bot channel and enter the '#help_me' command to get started.

## Acceptance Testing

### How to get started
Start by sending the `#help_me` message. This would display the following message-

<img src="./Acceptance Testing Screenshots/help_me.png">

All the working commands of the BOT are shown above. Following are their explanations in more detail-



### Registering a new user - `#add_me`
A new user should use this command in order to register themselves on the platform. The details that users provide here are then used to fetch their stats
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
Exsisting users should use this command to update their details. The command should be given in the following format-  
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

### Deployment Scripts

The Deployment Scripts are present in this folder: [deployment_files](./deployment_files)

#### Ansible Code (install-app.yml)

Here we are trying to set the variables necessary to run the ansible playbook.  

```yml
---
- hosts: localhost
  vars:
    input: "{{ lookup('file','secrets.json') | from_json }}"
  tasks:
     - name: Set Facts
       set_fact:
         token: "{{ input.variables.token }}"
         username: "{{ input.variables.username }}"
```

We are cloning the Git Repository here using the credentials taken from the previous step.
```yml
     - name: Clone Bot Repository
       git:
         repo: https://{{username}}:{{token}}@github.ncsu.edu/csc510-s2022/CSC510-25.git
         version: master
         dest: repos/CSC510-25
         force: yes
```

Here we are installing all the necessary packages and their updated versions needed to deploy the bot.
```yml
     - name: Install nodejs
       shell: cd ~; curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh; sudo bash /tmp/nodesource_setup.sh; sudo apt install nodejs
       become: yes
     - name: Install forever
       community.general.npm:
         name: forever
         global: yes
         state: latest
       become: yes
     - name: Latest Version of Nodejs
       shell: cp -v env_file/.env repos/CSC510-25
       become: yes 
```

Here we are copying the .env file from `env_file` to the git repo that is cloned.
```yml
     - name: Copy .env to git repo folder
       shell: cp -v env_file/.env repos/CSC510-25
       become: yes 
```

Here we are installing the necessary packages needed to deploy the app.
```yml
     - name: test the packages
       shell: sudo apt-get install {{ item }}
       loop:
         - openssl
         - bash
         - openssh-server
         - openssh-client
       become: yes
```

Here we are running `npm install` to install the packages from Git repo.
```yml
     - name: Install packages based on package-lock.json using the npm installed
       npm:
         path: repos/CSC510-25
       become: yes
```

Here we are Starting the bot using forever. Main file to initiate the bot is `index.js`
```yml
     - name: Start the application
       command:
         chdir: repos/CSC510-25
         cmd: forever start index.js
       become: yes
       async: 1000
       poll: 0
```

Here we are ensuring the status of the bot, that it is always running.
```yml
     - name: Ensure app is running
       shell: ps aux | grep node
       register: app_status
      
     - debug: msg={{app_status.stdout_lines}}-
```

Here is the Screencast for Deploying the 'Techfluencer' bot: [link](https://drive.google.com/file/d/1xoDS_s6OcmMGnSdB76dICDcVHnREyw9J/view?usp=sharing)  
#### **Final Code**
The final code is present in our 'master' branch and that same code is being cloned to the VCL and dpeloyed.  

#### **Updated Worksheet.md**
Here is the link for the updated `WORKSHEET.md` file - [link](WORKSHEET.md)
