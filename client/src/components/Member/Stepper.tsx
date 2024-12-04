import React from "react";

interface Step {
  title: string;
  fields: string[];
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                transition-colors duration-200
                ${
                  index <= currentStep
                    ? "bg-[#024240] text-white ring-2 ring-blue-100"
                    : "bg-gray-100 text-gray-400"
                }
                ${index < currentStep && "ring-4 ring-blue-50"}
              `}
            >
              {index < currentStep ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <span className="text-sm font-semibold">{index + 1}</span>
              )}
            </div>
            {index < steps.length - 1}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-3">
        {steps.map((step, index) => (
          <span
            key={index}
            className={`
              text-sm font-medium transition-colors duration-200
              ${index <= currentStep ? "text-[#024240]" : "text-gray-400"}
            `}
          >
            {step.title}
          </span>
        ))}
      </div>
    </div>
  );
}
