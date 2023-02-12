### Genral info

-- This is a simple project about using websockets.

-- For messages, i considered a very simple use case 'chat room', in which a user logs in
and sends messages, and the other members receive them.

-- The process of login is simulated with a users list from which you select a user and then
you'll be redirected to the chat room.

-- The messages are simply broadcased to all the connected users.

-- I kept messages route handlers(in case we need to get, update or delete some message), the process
of adding messages to DB is handled inside of the WS server.

### Run

-- Use "node index.js" to run the backend server.

### DB populating

-- Consider to add some users in your mongodb database before you run the app.
