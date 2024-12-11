import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

// Assuming GetContentByLessonId is a function that fetches content based on lesson_id
import DBLesson from "../../../DB/DBLesson"; // Import your DBLesson class
import DBContent from "../../../DB/DBContent";

const CourseContent = ({ route, navigation }) => {
  const { item } = route.params || {};
  console.log("course item", item.lesson_id);
  const [currentStep, setCurrentStep] = useState(0);
  const [lessonContent, setLessonContent] = useState([]); // State to store lesson content

  const dbLesson = new DBLesson();
  const dbContent = new DBContent();

  // Fetch content based on lesson_id
  useEffect(() => {
    if (item.lesson_id) {
      dbContent.GetContent(item.lesson_id, (success, content) => {
        if (success) {
          setLessonContent(content); // Set fetched content
        } else {
          console.error("Failed to fetch lesson content");
        }
      });
    }
  }, [item.lesson_id]);

  const renderTabs = () => {
    return lessonContent.map((_, index) => (
      <View
        key={index}
        style={[
          styles.tab,
          currentStep === index ? styles.activeTab : styles.inactiveTab,
        ]}
      />
    ));
  };

  const renderContent = () => {
    if (lessonContent.length === 0) {
      return (
        <View style={styles.content}>
          <Text>No content available for this lesson.</Text>
        </View>
      );
    }

    const currentDetail = lessonContent[currentStep];

    return (
      <View style={styles.content}>
        <Text style={styles.title}>{currentDetail.content_title}</Text>
        <Text style={styles.description}>{currentDetail.content_body}</Text>

    

       
        {/* Button to move to the next step */}
        <TouchableOpacity
          style={styles.finishButton}
          onPress={() => {
            if (currentStep < lessonContent.length - 1) {
              setCurrentStep(currentStep + 1);
            } else {
              navigation.navigate("Quiz"); // Navigate to the next screen
            }
          }}
        >
          <Text style={styles.finishButtonText}>
            {currentStep < lessonContent.length - 1 ? "Next" : "Finish"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          {/* Back Button (Optional) */}
        </TouchableOpacity>
        <View style={styles.tabs}>{renderTabs()}</View>
        <TouchableOpacity>
          {/* More Options (Optional) */}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingTop: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  tabs: {
    flexDirection: "row",
    alignItems: "center",
  },
  tab: {
    width: 40,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  activeTab: {
    backgroundColor: "#007BFF",
  },
  inactiveTab: {
    backgroundColor: "#E0E0E0",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
  codeBlock: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  code: {
    color: "#FFF",
    fontFamily: "monospace",
    fontSize: 14,
  },
  runButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  runButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  outputTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  outputBlock: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  outputText: {
    color: "#FFF",
    fontFamily: "monospace",
    fontSize: 14,
  },
  finishButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  finishButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CourseContent;
