export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
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
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

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
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, endIdx]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, endIdx]);
    if (array[j] <= pivotValue) {
      i++;
      // Swap elements at i and j
      animations.push([i, array[j], true]); // We push true to indicate a swap
      animations.push([j, array[i], true]); // We push true to indicate a swap
      swap(array, i, j);
    }
  }
  // Swap elements at i+1 and endIdx (swap with pivot)
  animations.push([i + 1, array[endIdx], true]);
  animations.push([endIdx, array[i + 1], true]);
  swap(array, i + 1, endIdx);
  return i + 1;
}

function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export function getHeapSortAnimations(array) {
  const animations = [];
  buildMaxHeap(array, animations);
  for (let endIdx = array.length - 1; endIdx > 0; endIdx--) {
    // Swap the root of the max heap with the last element
    animations.push([0, array[endIdx], true]); // We push true to indicate a swap
    animations.push([endIdx, array[0], true]); // We push true to indicate a swap
    swap(array, 0, endIdx);
    siftDown(array, 0, endIdx - 1, animations);
  }
  return animations;
}

function buildMaxHeap(array, animations) {
  const firstParentIdx = Math.floor((array.length - 2) / 2);
  for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
    siftDown(array, currentIdx, array.length - 1, animations);
  }
}

function siftDown(array, currentIdx, endIdx, animations) {
  let childOneIdx = currentIdx * 2 + 1;
  while (childOneIdx <= endIdx) {
    const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
    let idxToSwap;
    if (childTwoIdx !== -1 && array[childTwoIdx] > array[childOneIdx]) {
      idxToSwap = childTwoIdx;
    } else {
      idxToSwap = childOneIdx;
    }
    animations.push([currentIdx, idxToSwap]);
    animations.push([currentIdx, idxToSwap]);
    if (array[idxToSwap] > array[currentIdx]) {
      animations.push([currentIdx, array[idxToSwap], true]);
      animations.push([idxToSwap, array[currentIdx], true]);
      swap(array, currentIdx, idxToSwap);
      currentIdx = idxToSwap;
      childOneIdx = currentIdx * 2 + 1;
    } else {
      break;
    }
  }
}

function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
