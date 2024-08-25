
# 🌟 Page Generator Engine for Administration Website - Backend  🌟

## 📝 Overview
[![Framework: Sails.js](https://img.shields.io/badge/Framework-Sails.js-blue.svg?style=for-the-badge&logo=sails.js)](https://sailsjs.com/)
[![Node.js: 18.17.0](https://img.shields.io/badge/Node.js-18.17.0-green.svg?style=for-the-badge&logo=node.js)](https://nodejs.org/)

## 🚀 Features

- 🛠️ **Dynamic Page Generation**: Easily create and customize admin pages without repetitive coding.
- 🔒 **Dynamic Authorization**: Developers can create any set of roles and permissions to assign to users, instead of hard authorizing at the backend like most current systems do. In addition, developers can authorize the management page to limit the type of people who can access the page or limit the use of certain functions.
- 💾 **MySQL Integration**: Robust data handling with MySQL for efficient storage and retrieval.
- 📦 **Extensible and Modular**: Designed for easy integration and extension to fit different use cases.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- 🟢 **Node.js** (>= 14.x)
- 🔵 **npm** (Node Package Manager)
- 🟢 **MySQL** (>= 8.x)

## ⚙️ Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/vuvu15202/PGEA.git
    cd PGEA
    cd be
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Configure MySQL Database**:

   - **Set Up MySQL Native Password**:
   
     Run the following SQL scripts one by one in your MySQL command line or MySQL Workbench to set up the native password and grant all privileges:
   
    ```sql
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
    GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;
    FLUSH PRIVILEGES;
    ```

   - **Create a MySQL database**:
   
     After setting up the password, create a database for the project.
   
   - **Update Configuration**:
   
     Update the `config/datastores.js` file in the project with your database credentials.

4. **Configure Redis**:

- How to set Redis password for database: Click **<a href="https://www.youtube.com/watch?v=A75l24G26NE" target="_blank" rel="noopener noreferrer">here</a>**.
- **Update Configuration**:
   
     Update the `config/datastores.js` file in the project with your Redis password credentials.

5. **Run the Application**:
    ```bash
    sails lift
    ```
    or
    ```bash
    sails lift --drop
    ```

Your application should now be running on `http://localhost:1337`.

## 🛠️ Usage

- **Admin Panel**: Log in as an admin to manage users, pages, and content.
- **API Endpoints**: Access various API endpoints for user management, page generation, and more.

## 🤝 Contribution

We welcome contributions from the community! To get started:

1. 🍴 **Fork the Repository** on GitHub.
2. 🌿 **Create a New Branch** for your feature or bugfix.
3. 📝 **Submit a Pull Request** with a detailed description of your changes.

## 🛡️ Support

If you have any questions or need assistance, feel free to open an issue on GitHub.

## 🙏 Acknowledgements

- **Sails.js** - The powerful MVC framework for Node.js
- **MySQL** - The world's most popular open-source database
