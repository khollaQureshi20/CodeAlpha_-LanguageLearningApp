import DBHandler from './DBHandler';
class DBQuiz{
    constructor() {
      this.dbHandler = new DBHandler();
      this.dbHandler.initializeDatabase();
    }
  
    // Get all stages from the stage table
    Getquiz(callback) {
      
      this.dbHandler.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM quizzes`,
          [],
          (results) => { 
            const quiz = [];
            const len = results.rows.length;
    
            for (let i = 0; i < len; i++) {
                quiz.push(results.rows.item(i));
            }
    
            console.log("quiz fetched successfully:", quiz);
            callback(true, quiz); 
          },
          (error) => {
            console.error("Error fetching quiz:", error);
            callback(false, "Error fetching quiz");
            return false;
          }
        );
      });
    }
    InsertQuiz(lessonId, question, option1, option2, option3, correctOption, callback) {
        this.dbHandler.db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO quizzes (lesson_id, question, option_1, option_2, option_3, correct_option) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [lessonId, question, option1, option2, option3, correctOption],
            (_, result) => {
              console.log("Quiz inserted successfully:", result);
              callback(true, "Quiz inserted successfully");
            },
            (error) => {
              console.error("Error inserting quiz:", error);
              callback(false, "Error inserting quiz");
              return false;
            }
          );
        });
      }
      
    
    
  }
  
  export default DBQuiz;
  