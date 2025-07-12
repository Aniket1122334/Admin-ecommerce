import axios from "axios";

export const fetchData = async (url) => {
  try {
    const fullUrl = import.meta.env.VITE_BASE_URL + url;
    const { data } = await axios.get(fullUrl);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postData = async (url, payload) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + url,
      payload,
      {
        timeout: 10000, // 10 seconds timeout
      }
    );

    if (response.status >= 200 && response.status < 300) {
      return { success: true, data: response.data };
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error posting data:", error);
    return {
      success: false,
      message: error.response?.data?.msg || error.message || "Network error",
    };
  }
};
