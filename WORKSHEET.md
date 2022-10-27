# Iteration 1

| Deliverable   | Item/Status   | Issues/Tasks 
| ------------  | :-----------: | -----------: |
| Use Case 1    | Ask a Question| 
| Story 1       | Complete      | [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42600), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/33)
| Unit Tests    | In progress   | `hears`, `getSimilarQuestions`, `parseQuestion`
| Use Case 2    | Updating the Database
| Story 1       | Pending	      | [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42597), [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42596), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/30#issue-78290),  [#14](https://github.ncsu.edu/csc510-s2022/CSC510-25/issues/14#issue-156874) 
| Story 2       | In progress   |[Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42598), [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42599)
| Unit Tests    | Pending       | 
| Use Case 3    | Fetching the Leaderboard
| Story 1       | Complete      | [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42603), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/29#issue-78253), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/30#issue-78290)
| Story 2	      | Complete      | [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42604), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/29#issue-78253), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/30#issue-78290)   
| Unit Tests    | Pending       | 

### Reflection - 
After Iteration 1, we are done with Use Case 3 and most of Use Case 1 bar the unit testing. We made little progress regarding the Use Case 2 (Database Connectivity), and in retrospect, we should have started working on it a little earlier. Creating mocks for API calls was where we faced some errors. Creating user’s on the respective platform and getting user with valid data and ensuring their verasity was time consuming. We were successfully able to mock this data and integrate functionality to our platform.

# Iteration 2

| Deliverable   | Item/Status   | Issues/Tasks 
| ------------  | :-----------: | -----------: |
| Use Case 1    | Ask a Question| 
| Story 1       | Complete      | [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42600), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/33)
| Unit Tests    | Complete   | `hears`, `getSimilarQuestions`, `parseQuestion`
| Use Case 2    | Updating the Database
| Story 1       | Complete	      | [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42597), [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42596), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/30#issue-78290),  [#14](https://github.ncsu.edu/csc510-s2022/CSC510-25/issues/14#issue-156874) 
| Story 2       | Complete   |[Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42598), [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42599)
| Story 3       | Complete   |[Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42898), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-43125)
| Unit Tests    | In Progress       | `getUserRepos`, `getUserCommits`, `getUserCommitsToRepo`, `getStackOverflowStatsByPage`, `getStackOverflowStats`
| Use Case 3    | Fetching the Leaderboard
| Story 1       | Complete      | [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42603), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/29#issue-78253), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/30#issue-78290)
| Story 2	      | Complete      | [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42604), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/29#issue-78253), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/30#issue-78290)   
| Unit Tests    | In Progress       | 

### Reflection - 
We were able to complete a major chunk of our use cases and testing for Use Case 1. We successfully replaced all the mock data with actual data being fetch dfrom cloud(MongoDB). Successful API calls for GitHub and StackOverflow were implemented. Connectivity with MongoDB was being intermittent, so maintaining the connectivity by regular opening and closing helped us solve the issue. Testing for Use Case 2 and Use Case3 are left, which we aim to complete in our next iteration. Having completed 90% of our intended functionalities, we would be able to produce a successful project by minor polishing by the next iteration.

# Iteration 3

| Deliverable   | Item/Status   | Issues/Tasks 
| ------------  | :-----------: | -----------: |
| Use Case 1    | Ask a Question| 
| Story 1       | Complete      | [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42600), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/33)
| Unit Tests    | Complete      | `hears`, `getSimilarQuestions`, `parseQuestion`
| Use Case 2    | Updating the Database
| Story 1       | Complete      | [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42597), [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42596), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/30#issue-78290),  [#14](https://github.ncsu.edu/csc510-s2022/CSC510-25/issues/14#issue-156874) 
| Story 2       | Complete      |[Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42598), [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42599)
| Story 3       | Complete      |[Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42898), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-43125)
| Unit Tests    | Complete      | `getUserRepos`, `getUserCommits`, `getUserCommitsToRepo`, `getStackOverflowStatsByPage`, `getStackOverflowStats`, `calculatePoints`, `updateUserStats`, [#28](https://github.ncsu.edu/csc510-s2022/CSC510-25/issues/28), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/48), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/49), 
| Use Case 3    | Fetching the Leaderboard
| Story 1       | Complete      | [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42603), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/29#issue-78253), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/30#issue-78290)
| Story 2	      | Complete      | [Card](https://github.ncsu.edu/csc510-s2022/CSC510-25/projects/1#card-42604), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/29#issue-78253), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/30#issue-78290)   
| Unit Tests    | Complete      | `getUserDetail`, `getAllData`, `updateUserDetailsByUsername`, `getUserDetailOne`, `createMultipleUsers`, [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/47), [PR](https://github.ncsu.edu/csc510-s2022/CSC510-25/pull/48)
