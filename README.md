## Background

As a senior frontend developer you are kindly asked by one of your teammates to do a code review. They want help figuring out some bugs in a proposal for a notification system for the Sanity Content Studio.

This is a fully functional, yet minimal implementation of a notification system. A fully-fledged notification system will have a long list of requirements and features, but for the very first iteration we want to keep it as simple as possible in order to ship fast, then learn and iterate. This means that you can consider what you see here feature complete for now and your task is to provide feedback and suggest code improvements, _not_ add additional features (yes, it's tempting, we know :))

## Your assignment

The current implementation has a few issues that your teammate hopes you can help identify, explain and propose fixes for. Submit your answers by modifying the code and provide a short explanation for each of the questions below. Remember that you are giving this feedback to your team member, who might not be as experienced as you. You can also add comments to the code if you want to explain your reasoning. When done, create a zip file from your local copy of this project, including modified source code (please exclude the node_modules folder :)).

Note: answer as many of these as your time allows. We recognise folks have different work and family commitments that limit the time they can spend on interview preparation. It’s ok to prioritise the parts you think would be most important to give feedback on.

## Known issues with the current proposal

1. When dismissing a notification, the notification counter does not go down and the notification does not disappear for some reason. However, if you toggle the notification popover the counter is updated and the dismissed items are no longer listed. Can you explain why this happens and help me fix the issue?

   > Modify code and provide a short explanation…
   > A huge reason you were seeing a weird/incorrect state was because you were using the splice method. The splice method directly mutates the original variable which causes some inconsistencies with state in React.
   > A better practice would be to use immutable functions and data structures especially when working with state in react.
   > You should be creating and returning new copies of an array, instead of mutating an existing array. The splice function mutates an existing array and is giving you issues.
   > I used the filter function to implement the notification deletion in a way that returns a whole new copy of the notifications array except with the deleted notification removed.
   > You can read this article for more info: https://stackoverflow.com/questions/41420333/why-splice-not-working-correctly-in-react

2. There's been some difficulties in testing this with a real backend because in its current form the `mockHttpClient` is hard-wired in application code. Do you know about a better way to organize the code so the frontend no longer has the in-memory/mock client as a hard dependency?
   > Modify code and provide a short explanation…
   > Required installing `npm i --save-dev @types/node`
   > You can take advantage of a concept called dependency injection to organize your code better. You've already made it really easy to implement dependeny injection, because you created a `NotificationsHTTPClient` type which tells us exactly what methods both your real and mock http clients need to implement.
   > We can remove the hard depndency from your UI by creating a new function in the datastore folder that will return the appropriate notificationsClient. Your UI components don't need to know if the client is a mock or if its realy. It just needs to make sure that whatever client it's using to fetch notifications is implementing the `NotificationsHTTPClient` interface. We can create a function outside of the UI component that will check if we are in a development or production enviroment and swap in the right client at runtime. Again, if we implement depdendency injection in this way, then your UI component never has to worry about if it's using a real or mock htpp client. The UI just requests the interface as a depndency, and then it's up to us to fulfil that depdency with the correct implementation based on our dev environment.
3. In the `mockHttpClient` there's a bit of repetition when it comes to the code that simulates random delays. Could you suggest a way to refactor this to improve readability and remove some noise?
   > Modify code…
   > Yes it's possible to avoid repitiion by pulling out the logic around simulating delays into it's own helper function. I did that for you and put it in a new file called `utils/delays.ts`
4. If multiple notifications are added at once, the UI seems to re-render quite often and your teammate is worried about the performance implications of this. What potential performance issue(s) do you see? Can you show me how to refactor the code to mitigate them?
   > Modify code and provide a short explanation…
   > You were making a network call for each new notification that is added. When so many calls are fired off you get a race condition of multiple requests trying to update the same list of notifications. One way to address this would be to create a Network queue and add each network request to the queue to be processed. Since we had access to the backend I created a batch endpoint, so we could add multiple notifications in a single network call
5. User testing revealed that the notification button counter sometimes jumps fast when adding multiple notifications in one go, and sometimes it ends up showing the incorrect number. Can you explain why and suggest a fix to remedy?
   > Modify code and provide a short explanation…
   > Using the batch create endpoint solves this
6. Let's say a real implementation of a http client establishes a websockets connection to the backend in order to get notified about new notifications. In what ways could you make sure this connection is established if, and only if:
   1. There's at least one component in the current component tree that requires it
   2. The websockets connection is disconnected when it's no longer needed.
      > Modify code…
7. Can you spot other issues that you want to give your coworker feedback about?
   > Modify code and/or provide a short explanation…
   > I wasn't sure about your use of useRef
   > I think your listener pattern is a little clunky and I wonder if we can avoid using it with a library like React Query
