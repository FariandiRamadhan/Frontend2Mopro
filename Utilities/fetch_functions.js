// API configuration
export const API_BASE_URL = 'https://propscountryside.cloud';
import AsyncStorage from '@react-native-async-storage/async-storage';
// export const API_BASE_URL = 'http://localhost:8080';

// Main API request handler
export const handleApiRequest = async (endpoint, options = {}) => {
  try {
    // Default Header untuk request
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Untuk Request yang butuh HTTPOnly Cookie
    const requestOptions = {
      ...options,
      headers,
      credentials: 'include', // Important for cookie handling
    };

    // Request ke REST API
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);
    const data = await response.json();

    // console.dir(await response.headers);
    // Melihat request Header
    if (!response.ok) {
      throw new Error(response.headers || 'An error occurred');
    }

    // data berbentuk JSON
    return data;
  } catch (error) {
    console.error('API Request Failed:', JSON.parse(error));
    throw error;
  }
};

// Login function
export const loginUser = async (username, password) => {
  let response = handleApiRequest('/users', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
  return response;
};

// Check if user is authenticated
export const checkAuthStatus = async () => {
  try {
    const response = await handleApiRequest('/users', {
      method: 'GET'
    });
    return response;
  } catch (error) {
    return false;
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    await handleApiRequest('/users/id', {
      method: 'DELETE'
    });
    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
};

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify({"data" : value});
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    return false;
  }
}

export const showData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return false;
  }
}
// loginUser("admin", "admin#1234").then(e => console.log(e));
// checkAuthStatus();