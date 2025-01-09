import React, { useState } from "react";

interface AgeRangeSearchProps {
  onSearch: (minAge: number, maxAge: number) => void;
}

const AgeRangeSearch: React.FC<AgeRangeSearchProps> = () => {
  const [minAge, setMinAge] = useState<string>("");
  const [maxAge, setMaxAge] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    const min = parseInt(minAge, 10);
    const max = parseInt(maxAge, 10);

    if (isNaN(min) || isNaN(max)) {
      setError("Please enter valid numbers for both age ranges.");
      return;
    }

    if (min < 0 || max < 0) {
      setError("Age values cannot be negative.");
      return;
    }

    if (min > max) {
      setError("Minimum age cannot be greater than maximum age.");
      return;
    }
    console.log(minAge, maxAge` `);
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Search Ages</h2>

      <div className="mb-4">
        <label
          htmlFor="minAge"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Minimum Age
        </label>
        <input
          type="number"
          id="minAge"
          value={minAge}
          onChange={(e) => setMinAge(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="maxAge"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Maximum Age
        </label>
        <input
          type="number"
          id="maxAge"
          value={maxAge}
          onChange={(e) => setMaxAge(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default AgeRangeSearch;
