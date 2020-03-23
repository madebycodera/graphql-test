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
- GraphQL playground: http://localhost:4000/
- Entry point index.js
- In index folder
    $ npm install
    $ node index.js
- Test graphql queries and mutations in test.sh

# Database
- MongoDB
- NOTE: in index.js add your mongo url (local or Atlas cluster)
const url = 'YOUR_MONGO_DB_URI’;
- dump in mongodb_dump in root