# Chat-React

Chat-React is a real-time messaging application built with React that allows users to send private messages to each other. It provides a user-friendly interface and essential features for a seamless messaging experience.

## Features

- **Private Messaging:** Users can send private messages to each other, ensuring secure and confidential communication.

- **User Search and Conversation Initiation:** Users can search for other users and easily initiate conversations with them.

- **Login/Register:** Users can create new accounts or log in to existing ones to access the messaging functionality.

- **Real-time Updates with Sockets:** The application leverages sockets to provide real-time updates, ensuring instant message delivery and seamless conversation flow.

- **MySQL Database:** The application uses MySQL as its data storage solution, ensuring reliable and scalable data management.

- **New Message Notification:** New messages are visually highlighted with bold text on banners, allowing users to quickly identify new content.

- **Message Status:** The application provides a message status indicator, showing whether a message has been seen or delivered.

- **Message Delivery Time:** Each message includes a timestamp indicating when it was delivered, providing users with essential information about the message timeline.

## Installation

To run Chat-React locally, please follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Sunehildeep/Chat--React.git```

2. Navigate to the project directory:
    ```
    cd chat--react
    ```

3. Install dependencies in both chatbox & chatbox-backend folder by using this command
    ```
    npm i .
    ```

4. Import the MySQL export in your MySQL server.

5. Configure the MySQL details in chatbox-backend/config/db.js

6. Run npm start in both folders.

7. That's it :)

## Technologies Used

• React
• Socket.io
• MySQL
• HTML
• CSS

## Contributing
Contributions to Chat-React are welcome! If you encounter any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request.
