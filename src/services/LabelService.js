const API_URL = "http://localhost:5000/api/labels/";

const labelList = async () => {
  try {
    const response = await fetch(API_URL + "list");
    if (!response.ok) {
      throw new Error("Failed to fetch labels");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const predict = async (image, url) => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.text();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const labelService = {
  predictNoResnet: (image) => predict(image, API_URL + "predict/no-resnet"),
  predictResnet: (image) => predict(image, API_URL + "predict/resnet"),
  labelList: () => labelList(),
};
