// Frontend-only mode: No backend health checks needed
// All operations use localStorage

export const checkBackendHealth = async () => {
  console.log('Frontend-only mode: No backend required');
  return true;
};

export const waitForBackend = async (maxRetries = 5, delay = 2000) => {
  console.log('Frontend-only mode: No backend required');
  return true;
};
