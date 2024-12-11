import DBHandler from './DBHandler';
class DBAcheviement {
    constructor() {
      this.dbHandler = new DBHandler();
      this.dbHandler.initializeDatabase();
    }
  
    // Get all achievements from the achievements table
    GetAllAchievement(callback) {
      this.dbHandler.db.transaction(tx => {
        // SQL query to fetch all achievements
        tx.executeSql(
          'SELECT * FROM achievements',
          [],
          (tx, resultSet) => {
            // If the query is successful, return the results
            const achievements = [];
            for (let i = 0; i < resultSet.rows.length; i++) {
              achievements.push(resultSet.rows.item(i));
            }
            callback(null, achievements); // Return achievements in the callback
          },
          (tx, error) => {
            // Handle error
            callback(error, null);
          }
        );
      });
    }
  }
  
  export default DBAcheviement;
  