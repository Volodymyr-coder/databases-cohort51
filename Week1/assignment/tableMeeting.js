import connection from './connection.js';

export const createMeeting = () => {
  const Meeting = `CREATE TABLE IF NOT EXISTS Meeting(
     meeting_no INT AUTO_INCREMENT PRIMARY KEY,
      meeting_title VARCHAR(255) NOT NULL,
      starting_time DATETIME NOT NULL,
      ending_time DATETIME NOT NULL,
      room_no INT,
      FOREIGN KEY (room_no) REFERENCES Room(room_no)
    )`;

  connection.query(Meeting, (err, results) => {
    if (err) throw err;
    console.log('Table Meeting created or already exists', results);
  });

  const meetings = [
    ['Team Meeting', '2024-11-07 08:15:00', '2024-11-07 10:00:00', 2],
    ['Project Review', '2025-02-02 14:00:00', '2025-02-02 15:00:00', 3],
    [
      'Presentation of product',
      '2025-01-03 11:00:00',
      '2025-01-03 12:00:00',
      7
    ],
    ['Team Session', '2024-10-04 12:00:00', '2024-10-04 13:00:00', 5],
    [
      'Meeting with had of office',
      '2024-08-04 16:00:00',
      '2024-08-04 16:30:00',
      1
    ]
  ];

  const insertMeetings =
    'INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ?';
  connection.query(insertMeetings, [meetings], (err, results) => {
    if (err) throw err;
  });

  connection.query('USE meetup', (err) => {
    if (err) throw err;
  });
};

export default createMeeting;
