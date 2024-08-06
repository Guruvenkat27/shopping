import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loadingpage = () => {
  return (
    <div className="flex items-center justify-center min-h-[75vh]">
      <FaSpinner className="text-6xl text-blue-700 animate-spin" />
    </div>
  );
};

export default Loadingpage;