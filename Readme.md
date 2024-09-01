# Instagram Auto Unfollower

This script is designed to automate the process of unfollowing users on Instagram. It collects the list of usernames you're following, saves them in an array, and then proceeds to unfollow them one by one with randomized delays to mimic human behavior.

## Features

- Automatically collects all usernames you're following.
- Unfollows users based on the collected list.
- Randomized wait times between actions to avoid detection.
- Handles dynamic loading of followers/following lists by scrolling to load more items.

## How to Use

### Prerequisites

- A modern web browser (Google Chrome, Firefox, etc.).
- Basic knowledge of how to open the Developer Console in your browser.

### Steps

1. **Open Instagram**: Log in to your Instagram account and navigate to your profile.
2. **Open the Following List**: Click on the "Following" button to view the list of users you're following.
3. **Open Developer Console**:
    - In Chrome: `Right-click` -> `Inspect` -> Select the `Console` tab.
    - In Firefox: `Right-click` -> `Inspect Element` -> Select the `Console` tab.
4. **Copy and Paste the Script**: Copy the script from this repository and paste it into the console.
5. **Run the Script**: Press `Enter` to execute the script.
6. **Watch it Work**: The script will start collecting usernames and automatically unfollow them.

### Important Notes

- **Usage Limits**: Instagram has limits on how many accounts you can unfollow within a certain time period. This script has a built-in safety check to stop after unfollowing 140 accounts.
- **Use Responsibly**: This script is intended for personal use. Abusing automation on Instagram could result in temporary or permanent suspension of your account.

## Contributing

Feel free to open an issue or submit a pull request if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
