import connection from './connection.js';
import createInvitee from './tableInvitee.js';
import createRoom from './tableRoom.js';
import createMeeting from './tableMeeting.js';

connection.connect((err) => {
  if (err) {
    console.error('Error:', err.stack);
    return;
  }
  console.log('connect to DB with threadId:', connection.threadId);
  createInvitee();
  createRoom();
  createMeeting();
  connection.end();
});
