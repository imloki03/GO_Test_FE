import axiosInstance from "../config/apiConfig";

export const getScore = async (id) => {
    const response = await axiosInstance.get(`scores/${id}`);
    return response.data;
};

export const getScoreStatistics = async () => {
    const response = await axiosInstance.get(`scores/stat`);
    return response.data;
};