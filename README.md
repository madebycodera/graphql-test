## Configure app
Please provide .env file. You'll find out exmpale in exmple.env file.
File should be named for environment correspondingly e.g. for development **development.env**
Possible environments:
 - development
 - production
 - test
 - provision
 
Please specify 
```
DATABASE_SYNCHRONIZE=true
```
to creacte db structure. 
Just in case dump is provided in **dump.sql** file
Postgres is used as db server.
 
## Start app
To start app 
```
yarn start 
or
npm start
```

To start in dev 
```
yarn run dev
or
npm run dev

```

To use graphql queries in playground that require auth, please put token to headers section.
See example below 

```
{"authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRhMmNlNzUzLTljNmUtNDBhOS1iY2Q1LTJmZGJkZTBhMGZmOCIsImlhdCI6MTU2MTk4MjgyNywiZXhwIjoxNTYxOTg2NDI3fQ.OISELJjEJDR9OnHKrCg92ilD2GIXfHQTE49ccvYO0Xc"}
```
