import DBHandler from './DBHandler';
class DBProgress{
    constructor() {
      this.dbHandler = new DBHandler();
      this.dbHandler.initializeDatabase();
    }
  
    // Get all stages from the stage table
    GetProgress(userId,lessonId, callback) {
      console.log("Fetching content for lessonId:", userId,lessonId);
    
      this.dbHandler.db.transaction(tx => {
        tx.executeSql(
          `SELECT 
        language.language_name, 
        stage.stage_name, 
        user_progress.completed, 
        user_progress.quiz_score 
      FROM 
        user_progress
      JOIN 
        lesson ON user_progress.lesson_id = lesson.lesson_id
      JOIN 
        language ON lesson.language_id = language.language_id
      JOIN 
        stage ON lesson.stage_id = stage.stage_id
      WHERE 
        user_progress.user_id = ? AND user_progress.lesson_id = ?`,
          [userId, lessonId],
          (_, results) => {
            const progressData = [];
            const len = results.rows.length;
    
            for (let i = 0; i < len; i++) {
              progressData.push(results.rows.item(i));
            }
    
            console.log("Progress fetched successfully:", progressData);
            callback(true, progressData);
          },
          (error) => {
            console.error("Error fetching progress:", error);
            callback(false, "Error fetching progress");
            return false;
          }
        );
      });
    }
    GetScore(callback) {
      
      this.dbHandler.db.transaction(tx => {
        tx.executeSql(
          `SELECT 
        language.language_name, 
        stage.stage_name, 
        user_progress.completed, 
        user_progress.quiz_score 
      FROM 
        user_progress
      JOIN 
        lesson ON user_progress.lesson_id = lesson.lesson_id
      JOIN 
        language ON lesson.language_id = language.language_id
      JOIN 
        stage ON lesson.stage_id = stage.stage_id
     `,
          [],
          (_, results) => { 
            const progress = [];
            const len = results.rows.length;
    
            for (let i = 0; i < len; i++) {
              progress.push(results.rows.item(i));
            }
    
            console.log("progress fetched successfully:", progress);
            callback(true, progress); 
          },
          (error) => {
            console.error("Error fetching progress:", error);
            callback(false, "Error fetching progress");
            return false;
          }
        );
      });
    }
    
  }
  
  export default DBProgress;
  