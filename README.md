## REST API for the ToDo App

## Installation

```bash
$ npm install
```

## Running the app

```bash
#migrations
$ npm run migration:generate
$ npm run migration:run

# development
$ npm run build
$ npm run start

```

## Configure .env file
You should create the Postgres db and configure the .env file with that date.
```bash
POSTGRES_USER='some user'

POSTGRES_PASSWORD='some password'

POSTGRES_DB='some db name'

POSTGRES_PORT='some port'
```

# Examples of requests
# CreateUser
### POST

### http://localhost:3000/users/create
``` bash 
{
    "email": "regular545@gmail.com",
    "password": "regula54r443254",
    "username": "regul45ar54"
}
```
# EditUser
### PUT
### http://localhost:3000/users/edit/5
``` bash 
{
    "email": "regular545@gmail.com",
    "password": "regular545",
}
```

# Delete user by id
### DELETE
### http://localhost:3000/users/${userId}
### Example
```bash
http://localhost:3000/users/5
```

# Created ToDo list
### POST
### http://localhost:3000/list/create
### Example
``` bash 
{
    "title": "Shopping List",
    "userId": 5
}
```

# Get all ToDo lists
### GET
### http://localhost:3000/list/${userId}
### Example
```bash
http://localhost:3000/users/5
```
# EditList
### PUT
### http://localhost:3000/list/edit?userId=${userId}&listId=${listId}
### Example
```bash
http://localhost:3000/list/edit?userId=5&listId=13
```
``` bash 
{
    "title": "Shopping List Edited"
}
```

# Delete ToDo list
### DELETE
### http://localhost:3000/list/delete?userId=${userId}&listId=${listId} 
### Example
```bash
http://localhost:3000/list/delete?userId=4&listId=12
```


# Created Item for ToDo list
### POST
### http://localhost:3000/items/create
### Example
``` bash 
{
    "description": "milk",
    "isDone": "false",
    "userId": 5,
    "listId": 13
}
```

# Edit Item
### PUT
### http://localhost:3000/items/edit?userId=${userId}&listId=${listId}&itemId=${itemId}
### Example
```bash
http://localhost:3000/items/edit?userId=5&listId=13&itemId=30
```
``` bash 
{
    "description": "smth new",
    "isDone": true
}
```

# Delete Item
### DELETE
### http://localhost:3000/items/delete?itemId=${itemId}&userId=${userId}&listId=${listId}
### Example
```bash
http://localhost:3000/items/delete?itemId=30&userId=5&listId=13
```
