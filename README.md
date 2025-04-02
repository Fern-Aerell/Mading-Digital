# Digital Bulletin Board

This is a technological innovation designed to modernize the traditional concept of a school bulletin board.

| Content |
| ------- |
| [Technologies Used](#technologies-used) |
| [Main Features](#main-features) |
| [Required Prerequisites](#required-prerequisites) |
| [Creators and Their Roles](#creators-and-their-roles) |
| [CHANGELOG](CHANGELOG.md) |

## Technologies Used
1. **NodeJs:** 
   - Used as the runtime platform for running the application.
   - Allows developers to execute JavaScript on the server-side.

2. **NPM (Node Package Manager):** 
   - Manages JavaScript dependencies for this project.
   - Simplifies installation, updates, and removal of third-party libraries.
   - Packages used:
        - sequelize
        - bcrypt
        - dotenv
        - ejs
        - express
        - express-fileupload
        - express-session
        - moment
        - mysql2
        - qrcode
        - socket.io

3. **MySQL:** 
   - A database management system used to:
     - Store and manage data related to videos.
     - Store and manage data related to QR codes.
     - Store and manage news ticker text.
     - Store and manage school activity schedules.

4. **HTML, CSS, and JavaScript:** 
   - HTML: Builds the structure of web pages.
   - CSS: Manages layout and style to create an appealing web design.
   - JavaScript: Adds interactivity and ensures the user interface is responsive.
   - Together, these technologies support creating an attractive and optimal user interface.

## Main Features
1. **Video Display:** The Digital Bulletin Board allows videos to be displayed directly, adding a multimedia dimension to the information shared.

2. **QR Code:** Provides easy access by embedding QR codes, enabling users to easily access more information.

3. **News Marquee Text:** Displays scrolling news text, ensuring that the latest and most important information gets maximum attention.

4. **School Activity Schedule:** Automatically displays the school's activity schedule based on the current day, providing an easy-to-access time guide.

5. **Control Panel:** A user interface that can be easily accessed to manage content. This control panel allows users to update data in the database, change displays, and make other adjustments.

6. **Automatic Updates:** Any changes made through the control panel will immediately reflect on the Digital Bulletin Board. This automation process ensures accuracy and consistency of information.

The "Digital Bulletin Board" project not only gives a modern touch to the traditional school bulletin board but also enhances efficiency in delivering information. With a combination of modern technologies and effective management through the control panel, this project brings an innovative and responsive approach to managing school information.

## Required Prerequisites
- MySQL 5.1+
- NodeJs 20.9.0+
- NPM 10.2.4+

## Setting Up on Raspberry Pi (In Progress)

1. **Update Linux**
```sh
sudo apt update -y
sudo apt upgrade -y
sudo apt-get update -y 
sudo apt-get upgrade -y
```

2. **Install Git**
```sh
sudo apt install git -y
```

3. **Install MySQL and Change Root Password**
```sh
# Install MySQL
sudo apt install mariadb-server -y

# To view MySQL status
sudo service mysql status

# Start MySQL
sudo service mysql start

# Stop MySQL
sudo service mysql stop

# Change MySQL root user password
sudo mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword';
exit;
```

4. **Install NodeJs 20.9.0+ and NPM 10.2.4+**

Currently under research.

5. **Clone & Setup Project**

Clone the GitHub repository
```sh
git clone https://github.com/Fern-Aerell/Mading-Digital.git mading_digital
```

Go into the `mading_digital` folder
```sh
cd mading_digital
```

Copy the `env` file and rename it to `.env`
```sh
cp env .env
```

Edit the `.env` file with nano
```sh
nano .env
```

Change and uncomment certain things in the `.env` file
```
# NODE_ENV=development
to
NODE_ENV=production // development, production
```
```
// Uncomment database config according to NODE_ENV

# PRO_DB_USER=root
# PRO_DB_PASS=
# PRO_DB_NAME=mading_digital_production
# PRO_DB_HOST=localhost
# PRO_DB_PORT=3306
# PRO_DB_DIALECT=mysql
to
PRO_DB_USER=root
PRO_DB_PASS=newpassword
PRO_DB_NAME=mading_digital_production
PRO_DB_HOST=localhost
PRO_DB_PORT=3306
PRO_DB_DIALECT=mysql
```

Install all required packages
```sh
npm install
```

## Creators and Their Roles
- Aerell (Design, Frontend, Backend)
- Reza (Design, Frontend)
- Nico (Design, Frontend)
- Justin (Design, Frontend)
