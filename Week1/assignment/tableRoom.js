import connection from './connection.js';

export const createRoom = () => {
  const Room = `CREATE TABLE IF NOT EXISTS Room(
     room_no INT AUTO_INCREMENT PRIMARY KEY,
      room_name VARCHAR(150) NOT NULL,
      floor_number INT NOT NULL
    )`;

  connection.query(Room, (err, results) => {
    if (err) throw err;
    console.log('Table Room created or already exists');
  });

  const rooms = [
    ['Room A', 2],
    ['Room C', 1],
    ['Room 22', 5],
    ['Room D2', 7],
    ['Room F5', 3]
  ];

  const insertRooms = 'INSERT INTO Room (room_name, floor_number) VALUES ?';
  connection.query(insertRooms, [rooms], (err, results) => {
    if (err) throw err;
  });

  connection.query('USE meetup', (err) => {
    if (err) throw err;
  });
};

export default createRoom;
