import DBHandler from './DBHandler';
class DBStage{
    constructor() {
      this.dbHandler = new DBHandler();
      this.dbHandler.initializeDatabase();
    }
  
    // Get all stages from the stage table
    GetAllStages(callback) {
      this.dbHandler.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM stage`, // SQL query to fetch all records from stage table
          [],
          (_, { rows }) => {
            const stages = [];
            for (let i = 0; i < rows.length; i++) {
              stages.push(rows.item(i)); // Add each row to the stages array
            }
            console.log('Stages fetched successfully:', stages);
            callback(true, stages); // Pass the stages array to the callback
          },
          (_, error) => {
            console.error('Error fetching stages:', error);
            callback(false, 'Error fetching stages');
            return false; // Stop the transaction
          }
        );
      });
    }
  }
  
  export default DBStage;
  