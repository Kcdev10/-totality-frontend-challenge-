import React, { useState } from "react";

interface DateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (checkInDate: string, checkOutDate: string) => void;
}

const DateRangeModal: React.FC<DateRangeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (checkInDate && checkOutDate) {
      onConfirm(checkInDate, checkOutDate);
      onClose(); // Close the modal after confirming
    } else {
      alert("Please select both check-in and check-out dates.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Select Dates</h2>
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          className="mt-2 border rounded p-1"
          placeholder="Check-in Date"
        />
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          className="mt-2 border rounded p-1"
          placeholder="Check-out Date"
        />
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="bg-gray-300 rounded py-2 px-4">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-[#00B2A9] text-white rounded py-2 px-4 hover:bg-[#009A8A]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangeModal;
