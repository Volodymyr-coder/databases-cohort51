// import connection from './connection.js';

// export const insertData = () => {
//   const invitees = [
//     ['Ivan Petrow', 'Anna'],
//     ['Roy Smith', 'Dima'],
//     ['Karin Dars', 'Sergey'],
//     ['David Sidorenko', 'Illia'],
//     ['Andre Weluk', 'Yana']
//   ];

//   const rooms = [
//     ['Room A', 2],
//     ['Room C', 1],
//     ['Room 22', 5],
//     ['Room D2', 7],
//     ['Room F5', 3]
//   ];

//   const meetings = [
//     ['Team Meeting', '2024-11-07 08:15:00', '2024-11-07 10:00:00', 2],
//     ['Project Review', '2025-02-02 14:00:00', '2025-02-02 15:00:00', 3],
//     [
//       'Presentation of product',
//       '2025-01-03 11:00:00',
//       '2025-01-03 12:00:00',
//       7
//     ],
//     ['Team Session', '2024-10-04 12:00:00', '2024-10-04 13:00:00', 5],
//     [
//       'Meeting with had of office',
//       '2024-08-04 16:00:00',
//       '2024-08-04 16:30:00',
//       1
//     ]
//   ];

//   const insertInvitees =
//     'INSERT INTO Invitee (invitee_name, invited_by) VALUES ?';
//   connection.query(insertInvitees, [invitees], (err, results) => {
//     if (err) throw err;

//     const insertRooms = 'INSERT INTO Room (room_name, floor_number) VALUES ?';
//     connection.query(insertRooms, [rooms], (err, results) => {
//       if (err) throw err;

//       const insertMeetings =
//         'INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ?';
//       connection.query(insertMeetings, [meetings], (err, results) => {
//         if (err) throw err;
//       });
//     });
//   });
// };

// export default insertData;
