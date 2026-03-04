// utils/logger.js
export const logUserAction = (action, productName) => {
  const logs = JSON.parse(localStorage.getItem('userLogs')) || [];
  const newLog = {
    action,
    productName,
    timestamp: Date.now()
  };
  logs.push(newLog);
  localStorage.setItem('userLogs', JSON.stringify(logs));
};
