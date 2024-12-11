import DBHandler from './DBHandler';

class DBLogin {
  constructor() {
    this.dbHandler = new DBHandler();
    this.dbHandler.initializeDatabase();
  }
  
    // Get all languages from the language table
    GetAllUsers(callback) {
      this.dbHandler.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM users`, // SQL query to get all languages
          [],
          (_, { rows }) => {
            const users = [];
            for (let i = 0; i < rows.length; i++) {
              users.push(rows.item(i));
            }
            
            callback(true, users); // Pass the languages array to the callback
          },
          (_, error) => {
            console.error('Error fetching languages:', error);
            callback(false, 'Error fetching languages');
            return false; // Stop the transaction
          }
        );
      });
    }
    LoginUsers(email,password,callback) {
      this.dbHandler.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM users WHERE email = ? AND password = ?`, // SQL query to get all languages
          [email,password],
          (_, { rows }) => {
          
            callback(true, rows.item(0)); // Pass the languages array to the callback
          },
          (_, error) => {
            console.error('Error fetching languages:', error);
            callback(false, 'Error fetching languages');
            return false; // Stop the transaction
          }
        );
      });
    }
  }
  
  export default DBLogin;
  