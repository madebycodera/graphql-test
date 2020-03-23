# Mobile App
- react native
- Tested on iOS simulator
- In client folder
    $ npm install
    $ cd ios && pod install && cd ..
    $ react-native run-ios

# Functionalities app 
- List todos
- Add todo (plus FAB button)
    - Description mandatory
    - Priority optional
- Update todo (long press on list item)
    - Description mandatory
    - Priority optional
- Mark as done (press on list item)
- Delete todo (close icon on list item)
- Filters (icon on top right)
    - Sort by date, priority, description
    - Ascending/Descending

# Server side
- http://localhost:4003/
- GraphQL playground: http://localhost:4003/graphql
- Entry point server.js
- In server folder
    $ npm install
    $ node server.js

# Database
- MongoDB
- NOTE: in server/server.js add your mongo URI (local or Atlas cluster)
const MONGO_URI = 'YOUR_MONGO_DB_URI’;
- dump in mongodb_dump in root