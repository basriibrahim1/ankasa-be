# PE - WORLD BACKEND
Our hiring app API is built using ExpressJS and NodeJS, and is designed to connect Employers with Employees. The app features two distinct user roles - Employees and Employers - and includes key information about each user's experience, skills, and portfolio.

# Database Schema
![Database Schema](/schema/db_diagram.png)

# ENV Keys
```bash
DB_USER = 
DB_NAME = 
DB_PASS = 
DB_PORT = 
DB_HOST = 

JWT_TOKEN = 
BASE_URL = 

EMAIL_NAME = 
EMAIL_PASS = 

CLOUD_NAME = 
CLOUD_KEY = 
CLOUD_SECRET = 
```

# Installation
Clone the project

```bash
  git clone https://github.com/basriibrahim1/ankasa-be
```

Go to the project directory

```bash
  cd ankasa-be/
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nodemon
```

# Api documentation
users
ticket
ticket_booking

---
### Register users
```http
  POST /auth/register
```
Req Body Form: 
| Key | Value |
| :-------- |:------------------------- |
| `email` | **Required**. email |
| `name` | **Required**. name |
| `password` | **Required**. password |


---
### Login
```http
  POST /auth/login
```
Req Body Form: 
| Key | Value |
| :-------- | :------------------------- |
| `email` | **Required**. email |
| `password` | **Required**. password |




---
### Get all Ticket

```http
  GET /ticket
```
Query Params: 
| Key | Description | Default Value
| :-------- | :------------------------- | :-------- |
| `search` | search query  |null
| `searchBy` | search category |name
| `sortBy`| sort category |created_at
| `sort`| sort query |asc


---


### Get ticket by Id

```http
  GET /ticket/:id
```

---


### Get Users Payload

```http
  GET /users/myuser
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

---

### Update Users
```http
  PUT /users/
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

Req Body Form: 
| Key | Value |
| :-------- | :------------------------- |
| `name` | Nama|
| `email` | Nama@email |
| `phone` | 0812 |
| `photo` | image jpeg/png|
| `address` | Lorem ipsum dolor sir amet |
| `city` | Lorem |
| `country` | Indonesia |
| `postal_code` | 105510 |


---
### Get Booking Payload

```http
  GET /booking/mybooking
```
Query Params: 
| Key | Description | Default Value
| :-------- | :------------------------- | :-------- |
| `bearer token` |**Required**. Login accessToken |


---
### Get Booking Id

```http
  GET /booking/:id
```

---

### Insert Booking
```http
  POST /booking/
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

Req Body Form: 
| Key | Value |
| :-------- | :------------------------- |
| `users_id` | payload|
| `ticket_id` | 1 |
| `fullname` | name |
| `phone` | 08121|
| `nationality` | Indonesia |
| `Insurance` | true |
| `total` | 1000 |


---