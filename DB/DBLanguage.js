import DBHandler from './DBHandler';

class DBLanguage {
  constructor() {
    this.dbHandler = new DBHandler();
    this.dbHandler.initializeDatabase();
  }
  
    // Get all languages from the language table
    GetAllLanguages(callback) {
      this.dbHandler.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM language`, // SQL query to get all languages
          [],
          (_, { rows }) => {
            const languages = [];
            for (let i = 0; i < rows.length; i++) {
              languages.push(rows.item(i));
            }
            
            callback(true, languages); // Pass the languages array to the callback
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
  
  export default DBLanguage;
  