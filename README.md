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

### API's associated with documents

4. [POST & log-in required] 'https://docsready-server.herokuapp.com/api/docs/adddoc'
Headers: authtoken ===> AUTH_TOKEN_HERE_WITHOUT_INVERTED_COMMAS <br>
Query: card ===> e.g 'PAN' ; number ===> eg:'aieou769641' and the overall url called will be: 'https://docsready-server.herokuapp.com/api/docs/add?card=PAN&number=aieou769641' <br>
Body:
```
file: attched file
```
Sample Output:
```
{
  "user": "61bef835ab46f5a7675aeeeb",
  "card": "PAN",
  "number": "aieou769641",
  "fireBaseRef": "https://firebasestorage.googleapis.com/v0/b/docsready.appspot.com/o/PANaieou769641?alt=media&token=b99e1a46-bebb-4037-9827-a1044489c824",
  "_id": "61dd26af22ca7061a24acf7d",
  "__v": 0
}
```

5. [GET & log-in required] 'https://docsready-server.herokuapp.com/api/docs/fetchalldocs'
Headers: authtoken ===> AUTH_TOKEN_HERE_WITHOUT_INVERTED_COMMAS <br>
Body: NO BODY<br>

Sample Output:
```
[
  {
    "_id": "61dc5be52bdb663fb7c2f5af",
    "user": "61bef835ab46f5a7675aeeeb",
    "card": "PAN",
    "number": "8907652",
    "fireBaseRef": "gs://docsready.appspot.com/PAN8907652",
    "__v": 0
  },
  {
    "_id": "61dd26af22ca7061a24acf7d",
    "user": "61bef835ab46f5a7675aeeeb",
    "card": "PAN",
    "number": "aieou769641",
    "fireBaseRef": "https://firebasestorage.googleapis.com/v0/b/docsready.appspot.com/o/PANaieou769641?alt=media&token=b99e1a46-bebb-4037-9827-a1044489c824",
    "__v": 0
  }
]
```
6. [DELETE & log-in required] 'https://docsready-server.herokuapp.com/api/docs/delete/:id'
Headers: authtoken ===> AUTH_TOKEN_HERE_WITHOUT_INVERTED_COMMAS <br>
Body: NO BODY<br>

7. [GET & log-in required] 'https://docsready-server.herokuapp.com/api/docs/getdoc/:id'
Headers: authtoken ===> AUTH_TOKEN_HERE_WITHOUT_INVERTED_COMMAS <br>
Body: NO BODY<br>


