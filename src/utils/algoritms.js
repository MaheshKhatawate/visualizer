// Here I will be writing all the sorting algorithms

/**
 * Generates step-by-step animations for sorting algorithms
 * Each step contains the array state and visual indicators for comparisons/swaps
 */

// Helper function to create animation steps
function createStep(array, comparing = [], swapping = [], sorted = []) {
    return {
        array: [...array],
        comparing,
        swapping,
        sorted
    };
}

/**
 * Bubble Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * 
 * Process:
 * 1. Compare adjacent elements
 * 2. Swap if they are in wrong order
 * 3. Continue until no swaps are needed
 */
export function bubbleSort(inputArray) {
    const array = [...inputArray];
    const steps = [];
    const n = array.length;
    
    // Add initial state
    steps.push(createStep(array));
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            // Show comparison
            steps.push(createStep(array, [j, j + 1], [], getSortedIndices(i, n)));
            
            if (array[j] > array[j + 1]) {
                // Show swap
                steps.push(createStep(array, [], [j, j + 1], getSortedIndices(i, n)));
                
                // Perform swap
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapped = true;
                
                // Show result after swap
                steps.push(createStep(array, [], [], getSortedIndices(i, n)));
            }
        }
        
        // If no swapping occurred, array is sorted
        if (!swapped) break;
    }
    
    // Final state - all elements sorted
    steps.push(createStep(array, [], [], Array.from({length: n}, (_, i) => i)));
    
    return steps;
}

// Helper function to get sorted indices for bubble sort
function getSortedIndices(currentPass, totalLength) {
    const sorted = [];
    for (let i = totalLength - 1; i >= totalLength - currentPass; i--) {
        sorted.push(i);
    }
    return sorted;
}

/**
 * Framework for implementing other sorting algorithms
 * 
 * To add a new sorting algorithm:
 * 
 * 1. Create a function that follows this pattern:
 *    export function yourSortName(inputArray) {
 *        const array = [...inputArray];
 *        const steps = [];
 *        
 *        // Add initial state
 *        steps.push(createStep(array));
 *        
 *        // Your sorting logic here
 *        // Use createStep() to capture each significant state change
 *        
 *        // Add final state
 *        steps.push(createStep(array, [], [], Array.from({length: array.length}, (_, i) => i)));
 *        
 *        return steps;
 *    }
 * 
 * 2. Key points for visualization:
 *    - comparing: Array of indices being compared (usually 2 elements)
 *    - swapping: Array of indices being swapped (usually 2 elements)  
 *    - sorted: Array of indices that are in their final sorted position
 * 
 * 3. Color coding in visualization:
 *    - Default: Blue bars (unsorted elements)
 *    - Comparing: Yellow/Orange bars (elements being compared)
 *    - Swapping: Red bars (elements being swapped)
 *    - Sorted: Green bars (elements in final position)
 * 
 * Examples of algorithms you can implement:
 * - Selection Sort
 * - Insertion Sort  
 * - Merge Sort
 * - Quick Sort
 * - Heap Sort
 */

// Example: Selection Sort (you can implement this next)
export function selectionSort(inputArray) {
    const array = [...inputArray];
    const steps = [];
    const n = array.length;
    
    steps.push(createStep(array));
    
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        
        // Find minimum element in remaining unsorted array
        for (let j = i + 1; j < n; j++) {
            steps.push(createStep(array, [minIdx, j], [], Array.from({length: i}, (_, idx) => idx)));
            
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        
        // Swap if needed
        if (minIdx !== i) {
            steps.push(createStep(array, [], [i, minIdx], Array.from({length: i}, (_, idx) => idx)));
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            steps.push(createStep(array, [], [], Array.from({length: i + 1}, (_, idx) => idx)));
        }
    }
    
    steps.push(createStep(array, [], [], Array.from({length: n}, (_, i) => i)));
    return steps;
}

//Insertion Sorting algorithm
export function insertionSort(inputArray){
    const array = [...inputArray];
    const steps = [];
    const n = array.length;
    
    // Add initial state
    steps.push(createStep(array));
    
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let keyIndex = i;
        let j = i - 1;
        
        // Show the element we're trying to insert (highlight the key)
        steps.push(createStep(array, [i], [], Array.from({length: i}, (_, idx) => idx)));
        
        // Move elements greater than key one position ahead
        while (j >= 0 && array[j] > key) {
            // Show comparison between current element and the key
            steps.push(createStep(array, [j, keyIndex], [], Array.from({length: i}, (_, idx) => idx)));
            
            // Show the shift operation (moving element to the right)
            array[j + 1] = array[j];
            keyIndex = j; // Update key position as it shifts right
            
            // Show state after shift with the key in its new position
            steps.push(createStep(array, [], [], Array.from({length: i}, (_, idx) => idx)));
            
            j = j - 1;
        }
        
        // Insert the key at its correct position
        array[j + 1] = key;
        
        // Show the key being placed in its final position
        if (j + 1 !== i) {
            steps.push(createStep(array, [], [j + 1], Array.from({length: i + 1}, (_, idx) => idx)));
        }
        
        // Show final state with this iteration complete
        steps.push(createStep(array, [], [], Array.from({length: i + 1}, (_, idx) => idx)));
    }
    
    // Final state - all elements sorted
    steps.push(createStep(array, [], [], Array.from({length: n}, (_, i) => i)));
    
    return steps;
}

// Registry of available sorting algorithms
export const sortingAlgorithms = {
    'bubble': {
        name: 'Bubble Sort',
        function: bubbleSort,
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        description: 'Compares adjacent elements and swaps them if they are in wrong order'
    },
    'selection': {
        name: 'Selection Sort', 
        function: selectionSort,
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        description: 'Finds minimum element and places it at the beginning'
    },
    'insertion':{
        name: 'Insertion Sort',
        function: insertionSort,
        timeComplexity:'O(n²)',
        spaceComplexity:'O(1)',
        description:'Builds the final sorted array one item at a time by inserting each element into its correct position'
    }
    // Add more algorithms here as you implement them
};