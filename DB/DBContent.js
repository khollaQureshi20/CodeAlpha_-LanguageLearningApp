import DBHandler from './DBHandler';
class DBContent{
    constructor() {
      this.dbHandler = new DBHandler();
      this.dbHandler.initializeDatabase();
    }
  
    // Get all stages from the stage table
    GetContent(lessonId, callback) {
      console.log("Fetching content for lessonId:", lessonId);
      
      this.dbHandler.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM content WHERE lesson_id = ?`,
          [lessonId],
          (_, results) => { 
            const content = [];
            const len = results.rows.length;
    
            for (let i = 0; i < len; i++) {
              content.push(results.rows.item(i));
            }
    
            console.log("Content fetched successfully:", content);
            callback(true, content); 
          },
          (error) => {
            console.error("Error fetching content:", error);
            callback(false, "Error fetching content");
            return false;
          }
        );
      });
    }
    
  }
  
  export default DBContent;
  