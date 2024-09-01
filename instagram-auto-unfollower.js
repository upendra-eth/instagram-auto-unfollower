(async () => {
  // Array to store the usernames of people you want to unfollow
  let usersToUnfollow = [];

  // Function to generate a random integer between min and max (inclusive)
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  // Function to sleep for a random amount of time between 2 and 4 seconds
  async function sleepRand() {
    const ms = randInt(2000, 4000);
    console.log("Sleeping for", ms, "ms");
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Function to sleep for a random amount of time between 10 and 20 seconds
  async function sleepShort() {
    const ms = randInt(10000, 20000); // 10 to 20 seconds
    console.log("Sleeping for", ms, "ms");
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Function to process each follower div and extract the username
  async function processFollowerDiv(followerDiv) {
    let username = "";
    // Extract the username from the anchor tags within the follower div
    followerDiv.querySelectorAll("a").forEach((a) => {
      if (a.hasAttribute("href")) {
        const temp = a.href.split("/").slice(-2)[0];
        if (temp !== "") {
          username = temp;
        }
      }
    });
    // Add the extracted username to the array
    if (username) {
      usersToUnfollow.push(username);
    }
  }

  // Recursive function to find the item container with at least 10 elements
  function findItemContainer(parentNode) {
    const children = parentNode.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.children.length >= 10) {
        return child;
      }
      const result = findItemContainer(child);
      if (result) {
        return result;
      }
    }
  }

  // Main function to execute the script
  async function main() {
    // Select the dialog node that contains the list of people you're following
    const dialogNode = document.querySelectorAll('[role="dialog"]')[0];
    const itemContainer = findItemContainer(dialogNode);

    let previousHeight = 0;
    let retries = 0;

    // Loop to scroll through the entire list of users
    while (true) {
      const folllowerNodes = itemContainer.children;

      // Process each follower div to extract usernames
      for (let followerDiv of folllowerNodes) {
        await processFollowerDiv(followerDiv);
      }

      // Scroll to load more items
      folllowerNodes[folllowerNodes.length - 1].scrollIntoView(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const currentHeight = itemContainer.scrollHeight;

      // Stop if we are at the end of the list
      if (currentHeight === previousHeight) {
        retries++;
      } else {
        retries = 0;
      }

      previousHeight = currentHeight;

      if (retries > 5) {
        console.log("Reached the end of the list.");
        break;
      }
    }

    console.log("Total usernames collected:", usersToUnfollow.length);
    console.log("Proceeding to unfollow the users...");

    let numUnfollows = 0;

    // Loop through the collected usernames and unfollow each one
    for (const username of usersToUnfollow) {
      const followerDivs = Array.from(itemContainer.children);
      for (const followerDiv of followerDivs) {
        let currentUsername = "";
        followerDiv.querySelectorAll("a").forEach((a) => {
          if (a.hasAttribute("href")) {
            const temp = a.href.split("/").slice(-2)[0];
            if (temp !== "") {
              currentUsername = temp;
            }
          }
        });
        if (currentUsername === username) {
          console.log("UNFOLLOWING:", username);
          const followingButton = followerDiv.querySelectorAll("button")[0];
          followingButton.click();
          await sleepRand();
          const confirmDialog = document.querySelectorAll('[role="dialog"]')[2];
          const unfollowConfirm = confirmDialog.querySelectorAll("button")[0];
          unfollowConfirm.click();
          numUnfollows++;
          await sleepShort();
          break;
        }
      }

      // Stop after unfollowing 140 users to avoid hitting Instagram's limits
      if (numUnfollows > 140) {
        alert("You've unfollowed too many people. Please wait 24 hours before running this script again.");
        return;
      }
    }
  }

  // Start the main function
  await main();
})();
