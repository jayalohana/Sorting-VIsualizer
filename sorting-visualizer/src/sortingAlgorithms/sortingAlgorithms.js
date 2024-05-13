// Utility function to swap elements in an array
function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

// Function to get animations for Merge Sort
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

// Function to get animations for Quick Sort
export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
  if (startIdx < endIdx) {
    const pivotIdx = partition(array, startIdx, endIdx, animations);
    quickSortHelper(array, startIdx, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, endIdx, animations);
  }
}

function partition(array, startIdx, endIdx, animations) {
  const pivotValue = array[endIdx];
  let i = startIdx - 1;
  for (let j = startIdx; j < endIdx; j++) {
    animations.push([j, endIdx]);
    animations.push([j, endIdx]);
    if (array[j] <= pivotValue) {
      i++;
      animations.push([i, array[j], true]);
      animations.push([j, array[i], true]);
      swap(array, i, j);
    }
  }
  animations.push([i + 1, array[endIdx], true]);
  animations.push([endIdx, array[i + 1], true]);
  swap(array, i + 1, endIdx);
  return i + 1;
}

// Function to get animations for Heap Sort
export function getHeapSortAnimations(array) {
  const animations = [];
  buildMaxHeap(array, animations);
  let size = array.length;
  for (let endIdx = array.length - 1; endIdx > 0; endIdx--) {
    // Animate the swap between the root and the last element
    animations.push([0, endIdx, array[endIdx], array[0]]);
    swap(array, 0, endIdx);
    size--; // Reduce the size of the heap
    siftDown(array, 0, size - 1, animations);
  }
  return animations;
}

function buildMaxHeap(array, animations) {
  const firstParentIdx = Math.floor((array.length - 2) / 2);
  for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
    siftDown(array, currentIdx, array.length - 1, animations);
  }
}

function siftDown(array, startIdx, endIdx, animations) {
  let root = startIdx;
  while (root * 2 + 1 <= endIdx) {
    const leftChild = root * 2 + 1;
    const rightChild = root * 2 + 2;
    let swapIdx = root;

    if (array[swapIdx] < array[leftChild]) {
      swapIdx = leftChild;
    }
    if (rightChild <= endIdx && array[swapIdx] < array[rightChild]) {
      swapIdx = rightChild;
    }
    if (swapIdx === root) {
      return; // The root holds the largest element. As no swap needed, break.
    } else {
      animations.push([root, swapIdx, array[swapIdx], array[root]]);
      swap(array, root, swapIdx);
      root = swapIdx; // Continue sifting down the child now
    }
  }
}
