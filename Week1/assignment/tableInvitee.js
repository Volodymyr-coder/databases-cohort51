import connection from './connection.js';
export const createInvitee = () => {
  const Invitee = `CREATE TABLE IF NOT EXISTS Invitee(
     invitee_no INT AUTO_INCREMENT PRIMARY KEY,
      invitee_name VARCHAR(150) NOT NULL,
      invited_by VARCHAR(150) NOT NULL
    )`;

  connection.query(Invitee, (err, results) => {
    if (err) throw err;
    console.log('Table Invitee created or already exists');
  });

  const invitees = [
    ['Ivan Petrow', 'Anna'],
    ['Roy Smith', 'Dima'],
    ['Karin Dars', 'Sergey'],
    ['David Sidorenko', 'Illia'],
    ['Andre Weluk', 'Yana']
  ];

  const insertInvitees =
    'INSERT INTO Invitee (invitee_name, invited_by) VALUES ?';
  connection.query(insertInvitees, [invitees], (err, results) => {
    if (err) throw err;
  });

  connection.query('USE meetup', (err) => {
    if (err) throw err;
  });
};

export default createInvitee;
