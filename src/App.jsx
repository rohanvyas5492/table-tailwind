import { useState } from "react";
import Table from "./components/Table";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Bawan Bhai ka kaam
      </h1>
      <div className="text-center">
        <Table />
      </div>
    </>
  );
}

export default App;
