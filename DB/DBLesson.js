import DBHandler from './DBHandler';
class DBLesson{
    constructor() {
      this.dbHandler = new DBHandler();
      this.dbHandler.initializeDatabase();
    }
  
    // Get all stages from the stage table
    GetLesson(stageId, languageId,callback) {
      this.dbHandler.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM lesson WHERE stage_id = ? AND language_id = ?`, 
          [stageId, languageId],
          (_, { rows }) => {
            const lessons = [];
            for (let i = 0; i < rows.length; i++) {
              lessons.push(rows.item(i)); // Add each row to the stages array
            }
            console.log('lessons fetched successfully:', lessons);
            callback(true, lessons); // Pass the stages array to the callback
          },
          (_, error) => {
            console.error('Error fetching lessons:', error);
            callback(false, 'Error fetching lessons');
            return false; // Stop the transaction
          }
        );
      });
    }
  }
  
  export default DBLesson;
  