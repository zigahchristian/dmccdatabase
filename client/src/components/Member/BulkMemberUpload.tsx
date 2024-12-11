import React, { useState } from "react";
import axios from "axios";
import { useNotification } from "../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

const BulkMemberUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files?.[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    try {
      setLoading(true);

      // Read the file as a buffer
      const formData = new FormData();
      formData.append("members", file);
      const res = await axios.post(
        "http://localhost:7240/members/newBulkMembersUpload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        showNotification({
          message: "Bulk Users Added Successfully!",
          type: "success",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      showNotification({ message: "Failed to upload file.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Upload CSV File</h2>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={loading}
          name="members"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !file}
          className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default BulkMemberUpload;
