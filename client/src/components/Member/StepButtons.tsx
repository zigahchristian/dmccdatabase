import React from "react";

interface StepButtonsProps {
  currentStep: number;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
  isSubmitting: boolean;
}

export function StepButtons({
  currentStep,
  isLastStep,
  onPrevious,
  onNext,
  isSubmitting,
}: StepButtonsProps) {
  return (
    <div className="flex gap-4 pt-6">
      {currentStep > 0 && (
        <button
          type="button"
          onClick={onPrevious}
          className="
            flex-1 px-4 py-2.5 rounded-lg
            bg-gray-50 text-gray-700 font-medium
            hover:bg-gray-100 
            active:bg-gray-200
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-gray-200
          "
        >
          Previous
        </button>
      )}
      {!isLastStep ? (
        <button
          type="button"
          onClick={onNext}
          className="
            flex-1 px-4 py-2.5 rounded-lg
            bg-[#024240] text-white font-medium
            hover:bg-blue-700
            active:bg-blue-800
            disabled:opacity-70
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-300
          "
        >
          Next
        </button>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            flex-1 px-4 py-2.5 rounded-lg
            bg-blue-600 text-white font-medium
            hover:bg-blue-700
            active:bg-blue-800
            disabled:opacity-70
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-300
          "
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      )}
    </div>
  );
}
