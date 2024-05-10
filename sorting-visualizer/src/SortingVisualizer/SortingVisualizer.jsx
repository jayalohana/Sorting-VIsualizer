import "./SortingVisualizer.css";
import React from "react";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
    this.resetArray = this.resetArray.bind(this); // Binding the method to use 'this' correctly
  }

  componentDidMount() {
    this.resetArray(); // Ensuring method is called to initialize the array
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 310; i++) {
      array.push(this.randomIntFromInterval(5, 1000));
    }
    this.setState({ array }); // Correct the way to update the state
  }

  randomIntFromInterval(min, max) {
    // Corrected function name and placement
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  render() {
    const { array } = this.state;
    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
            }}
          ></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button>
      </div>
    );
  }
}
