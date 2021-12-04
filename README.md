# DocsReadyServer

This is server script of DocsReady, it is hosted in heroku and the url is: https://docsready-server.herokuapp.com

###  The api's associated to the user:

1. [POST & log-in not required] 'https://docsready-server.herokuapp.com/api/auth/signup' <br>
Headers: Content-Type ===> application/json <br>
Body:
```
{
    "name": "Chandan Kumar",
    "email": "abc123@gmail.com",
    "password":"password",
    "aadharNumber":"298765432190",
    "fatherName": "Deepak Kumar",
    "address":"AFS Kalaikunda",
    "dob": "18-may-2000"
}
```

Sample Output:
```
{
  "user": {
    "name": "Chandan Kumar",
    "email": "abc123@gmail.com",
    "password": "$2a$10$H2KC9ReoMZ0NeILB4B4hNekOajjsi7rtYDE7K/RXD75rMD7KZFNL6",
    "aadharNumber": "298765432190",
    "fatherName": "Deepak Kumar",
    "address": "AFS Kalaikunda",
    "dob": "18-may-2000",
    "_id": "61aae8be1d9ef70ca4bec7ad",
    "date": "2021-12-04T04:04:14.412Z",
    "__v": 0
  },
  "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhYWU4YmUxZDllZjcwY2E0YmVjN2FkIn0sImlhdCI6MTYzODU5MDY1NH0.GmxhnDtMxF4ySvKrPlqsPzkx6wUCt_xXBtA7oQuMRrU",
  "success": true
}
```

2. [POST & log-in not required] 'https://docsready-server.herokuapp.com/api/auth/login' <br>
Headers: Content-Type ===> application/json <br>
Body:
```
{
    "aadharNumber":298765432190,
    "password":"password"
}
```
Sample Output:
```
{
  "user": {
    "_id": "61aae8be1d9ef70ca4bec7ad",
    "name": "Chandan Kumar",
    "email": "abc123@gmail.com",
    "password": "$2a$10$H2KC9ReoMZ0NeILB4B4hNekOajjsi7rtYDE7K/RXD75rMD7KZFNL6",
    "aadharNumber": "298765432190",
    "fatherName": "Deepak Kumar",
    "address": "AFS Kalaikunda",
    "dob": "18-may-2000",
    "date": "2021-12-04T04:04:14.412Z",
    "__v": 0
  },
  "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhYWU4YmUxZDllZjcwY2E0YmVjN2FkIn0sImlhdCI6MTYzODU5MDg4NX0.uaDTSfqNaxgXyY4SrMazJLckBPT5CwH3ee1F9RLQQpw",
  "success": true
}
```

3. [POST & log-in required] 'https://docsready-server.herokuapp.com/api/auth/getuser'
Headers: Content-Type ===> application/json and authtoken ===> AUTH_TOKEN_HERE_WITHOUT_INVERTED_COMMAS <br>
Body:
```
NO BODY FOR THIS API
```
Sample Output:
```
{
  "_id": "61aae8be1d9ef70ca4bec7ad",
  "name": "Chandan Kumar",
  "email": "abc123@gmail.com",
  "aadharNumber": "298765432190",
  "fatherName": "Deepak Kumar",
  "address": "AFS Kalaikunda",
  "dob": "18-may-2000",
  "date": "2021-12-04T04:04:14.412Z",
  "__v": 0
}
```
