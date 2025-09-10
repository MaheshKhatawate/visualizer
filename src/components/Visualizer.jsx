import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import CommonForm from "./common/form";
import { sizeFormControls } from "@/config";
import { sortingAlgorithms } from "@/utils/algoritms";

function getRandomArray(length = 20, min = 10, max = 100) {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

const initialSize = 20

function Visualizer() {
    const [array, setArray] = useState(() => getRandomArray());
    const [formData, setFormData] = useState({ size: initialSize });
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [animationSteps, setAnimationSteps] = useState([]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
    
    const handleGenerateArray = () => {
        const size = Math.min(Math.max(parseInt(formData.size) || initialSize, 10), 50);
        setArray(getRandomArray(size));
        setAnimationSteps([]);
        setCurrentStep(0);
        setIsAnimating(false);
    };

    const handleSizeSubmit = (event) => {
        event.preventDefault();
        const size = Math.min(Math.max(parseInt(formData.size) || initialSize, 10), 50);
        setArray(getRandomArray(size));
        setFormData({ ...formData, size: size }); // Update form data with clamped value
        setAnimationSteps([]);
        setCurrentStep(0);
        setIsAnimating(false);
    };

    const handleSort = () => {
        if (isAnimating) return;
        
        const algorithm = sortingAlgorithms[selectedAlgorithm];
        if (algorithm) {
            const steps = algorithm.function(array);
            setAnimationSteps(steps);
            setCurrentStep(0);
            setIsAnimating(true);
        }
    };

    const handleStop = () => {
        setIsAnimating(false);
        setCurrentStep(0);
        setAnimationSteps([]);
    };

    // Animation effect
    useEffect(() => {
        if (isAnimating && animationSteps.length > 0) {
            const timer = setTimeout(() => {
                if (currentStep < animationSteps.length - 1) {
                    setCurrentStep(currentStep + 1);
                } else {
                    setIsAnimating(false);
                }
            }, 400); // Adjust speed here (500ms per step)

            return () => clearTimeout(timer);
        }
    }, [isAnimating, currentStep, animationSteps.length]);

    // Get current array state and visual indicators
    const getCurrentState = () => {
        if (animationSteps.length > 0 && currentStep < animationSteps.length) {
            return animationSteps[currentStep];
        }
        return { array, comparing: [], swapping: [], sorted: [] };
    };

    const currentState = getCurrentState();

    // Function to get bar color based on state
    const getBarColor = (index) => {
        if (currentState.sorted.includes(index)) return 'bg-green-500'; // Sorted
        if (currentState.swapping.includes(index)) return 'bg-red-500'; // Swapping
        if (currentState.comparing.includes(index)) return 'bg-yellow-500'; // Comparing
        return 'bg-blue-500'; // Default
    };


    return (
        <div className="flex flex-col items-center w-full h-full p-4">
            {/* Visualization Area */}
            <div className="flex items-end justify-center w-full h-64 bg-gray-100 rounded-md mb-8 border border-gray-200">
                {currentState.array.map((value, idx) => (
                    <div
                        key={idx}
                        className={`mx-0.5 rounded-t ${getBarColor(idx)}`}
                        style={{
                            height: `${value * 2}px`,
                            width: "18px",
                            transition: "all 0.3s ease",
                        }}
                        title={value}
                    />
                ))}
            </div>
            
            {/* Algorithm Selection and Controls */}
            <div className="flex gap-4 mb-4">
                <select 
                    value={selectedAlgorithm} 
                    onChange={(e) => setSelectedAlgorithm(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                    disabled={isAnimating}
                >
                    {Object.entries(sortingAlgorithms).map(([key, algo]) => (
                        <option key={key} value={key}>{algo.name}</option>
                    ))}
                </select>
                
                <Button 
                    onClick={handleSort} 
                    variant="default" 
                    size="lg"
                    disabled={isAnimating}
                >
                    {isAnimating ? 'Sorting...' : 'Start Sort'}
                </Button>
                
                {isAnimating && (
                    <Button 
                        onClick={handleStop} 
                        variant="destructive" 
                        size="lg"
                    >
                        Stop
                    </Button>
                )}
            </div>
            {/* Generate New Array Button */}
            <Button onClick={handleGenerateArray} variant="default" size="lg">
                Generate New Array
            </Button>
            <CommonForm
                formControls={sizeFormControls}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSizeSubmit}
                buttonText="Set Size"
            />
        </div>
    );
}

export default Visualizer