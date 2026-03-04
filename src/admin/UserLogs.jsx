import React, { useEffect, useState } from 'react';

const UserLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch logs from localStorage (mocked for now)
    const storedLogs = localStorage.getItem('userLogs');
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs).reverse()); // show latest first
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f2ef] p-10">
      <h1 className="text-3xl font-bold mb-6">🕵️‍♂️ User Activity Logs</h1>

      {logs.length === 0 ? (
        <p className="text-gray-600">No user activity yet.</p>
      ) : (
        <ul className="space-y-4">
          {logs.map((log, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded shadow border-l-4 border-blue-600"
            >
              <div className="text-sm text-gray-500 mb-1">{new Date(log.timestamp).toLocaleString()}</div>
              <div className="text-md">
                <strong>{log.action}</strong> — <span>{log.productName}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserLogs;
