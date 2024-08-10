import React, { useState } from "react";
import axios from "axios";

const DynamicForm = () => {
  const [formData, setFormData] = useState({
    selectedValue: "1", // Default to 1
    textInputs: [""], // An array to hold the text input values
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      selectedValue: e.target.value,
      textInputs: Array(Number(e.target.value)).fill(""),
    });
  };

  const handleTextInputChange = (e, index) => {
    const newInputs = [...formData.textInputs];
    newInputs[index] = e.target.value;
    setFormData({ ...formData, textInputs: newInputs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here, you can send the form data to your backend
      const response = await axios.post("YOUR_BACKEND_ENDPOINT", {
        selectedValue: formData.selectedValue,
        textInputs: formData.textInputs,
      });

      // Handle the response as needed
      console.log("Response:", response);
    } catch (error) {
      console.error("Error while submitting the form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="selectedValue">Select a number: </label>
      <select
        id="selectedValue"
        name="selectedValue"
        value={formData.selectedValue}
        onChange={handleChange}
      >
        {[1, 2, 3, 4, 5, 6].map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </select>
      {formData.textInputs.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          onChange={(e) => handleTextInputChange(e, index)}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
