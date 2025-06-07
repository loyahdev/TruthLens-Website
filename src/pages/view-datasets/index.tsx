

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ViewDatasetsPage = () => {
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetch("/train.csv")
      .then((res) => res.text())
      .then((text) => {
        const rows = text.split("\n").map((row) => row.split(","));
        setCsvData(rows);
      })
      .catch((err) => console.error("Failed to load CSV:", err));
  }, []);

  const displayedData = isExpanded ? csvData : csvData.slice(0, 50);

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">View Datasets</h1>
        <p>
            View my datasets used to the train the local Truth Lens model and view the repository that hosts the project.
        </p>

        <br />

        <div className="mb-6">
          <img
            src="https://opengraph.githubassets.com/1/loyahdev/TruthLens-Website"
            alt="GitHub Repo Preview"
            className="rounded shadow"
          />
        </div>
        <div className="mb-10">
          <iframe
            src="https://ghbtns.com/github-btn.html?user=loyahdev&repo=TruthLens-Website&type=star&count=true"
            frameBorder="0"
            scrolling="0"
            width="100"
            height="20"
            title="GitHub"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 text-sm">
            <thead className="bg-gray-900 text-gray-200">
              <tr>
                {csvData[0]?.map((header, index) => (
                  <th key={index} className="px-4 py-2 border">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-gray-700">
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className="px-4 py-2 border">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!isExpanded && (
          <a
            href="https://truthlens.loyah.dev/train.csv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Read More
          </a>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ViewDatasetsPage;