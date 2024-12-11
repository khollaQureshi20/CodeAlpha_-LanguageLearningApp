import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

// Sample icons for steps
const playIcon = require('../../../assesst/play.png'); // Assuming you have a play.png image

const { width, height } = Dimensions.get('window');

// Function to calculate points on a cubic Bézier curve
const calculateBezierPoint = (t, p0, p1, p2, p3) => {
  const x =
    Math.pow(1 - t, 3) * p0.x +
    3 * Math.pow(1 - t, 2) * t * p1.x +
    3 * (1 - t) * Math.pow(t, 2) * p2.x +
    Math.pow(t, 3) * p3.x;

  const y =
    Math.pow(1 - t, 3) * p0.y +
    3 * Math.pow(1 - t, 2) * t * p1.y +
    3 * (1 - t) * Math.pow(t, 2) * p2.y +
    Math.pow(t, 3) * p3.y;

  return { x, y };
};

const Gamified = ({ navigation }) => {
  // Define control points for the Bézier curve
  const p0 = { x: width * 0.4, y: 50 };
  const p1 = { x: width * 0.6, y: 150 };
  const p2 = { x: width * 0.2, y: 300 };
  const p3 = { x: width * 0.5, y: 400 };

  // Generate even spacing (e.g., 4 steps) along the curve
  const stepCount = 4; // Number of icons
  const tValues = Array.from({ length: stepCount }, (_, i) => i / (stepCount - 1)); // Generate t values (e.g., [0, 0.33, 0.67, 1])
  const stepPositions = tValues.map(t => calculateBezierPoint(t, p0, p1, p2, p3)); // Map t values to curve positions

  // Set up state for the active level
  const [activeLevel, setActiveLevel] = useState(1); // Start with Level 1 active

  // Function to render the dashed line along the curve
  const renderDashedLine = () => {
    const dashedLine = [];
    const dashLength = 15; // Length of each dash
    const spaceLength = 10; // Space between dashes
    const totalLength = 500; // You can calculate the total length of the curve for better control

    // Loop to create dashed segments along the curve
    for (let i = 0; i < totalLength; i += dashLength + spaceLength) {
      const t = i / totalLength;
      const position = calculateBezierPoint(t, p0, p1, p2, p3);
      dashedLine.push(
        <View
          key={i}
          style={[styles.dash, { left: position.x - 7.5, top: position.y - 1, width: dashLength, height: 2 }]}/>
      );
    }

    return dashedLine;
  };

  // Function to handle play button click
  const handlePlayButtonClick = (level) => {
    if (level === activeLevel) {
      if (level === stepCount) {
       
      //  navigation.navigate('Finish');
      } else {

        setActiveLevel(level + 1);
        console.log(`Playing Level ${level}`);
        navigation.navigate('Quiz2');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Curved Path (Dashed Line) */}
      <View style={styles.curveContainer}>{renderDashedLine()}</View>

      {/* Render Levels and Play buttons */}
      {stepPositions.map((position, index) => (
        <View key={index} style={[styles.iconContainer, { left: position.x - 30, top: position.y - 30 }]}>
          <TouchableOpacity
            style={[
              styles.playButton,
              { backgroundColor: activeLevel === index + 1 ? '#CDB4F5' : '#D3D3D3' },
            ]}
            onPress={() => handlePlayButtonClick(index + 1)} // Handle click for each play button
            disabled={activeLevel !== index + 1} // Disable inactive buttons
          >
            <Image
              source={playIcon}
              tintColor={activeLevel === index + 1 ? 'black' : 'gray'}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.levelText}>Level {index + 1}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  curveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, // Ensure the dashed line is behind the icons
    overflow: 'visible', // Ensure the line is not clipped
  },
  dash: {
    position: 'absolute',
    backgroundColor: 'black', // Dashed line color
    borderRadius: 1,
  },
  iconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  levelText: {
    marginLeft: 20,
    color: 'red',
    fontSize: 15,
    marginBottom: 5,
    textAlign: 'center',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default Gamified;
