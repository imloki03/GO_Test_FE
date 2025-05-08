import axiosInstance from "../config/apiConfig";

export const getScore = async (id) => {
    const response = await axiosInstance.get(`scores/${id}`);
    return response.data;
};

export const getScoreStatistics = async () => {
    const response = await axiosInstance.get(`scores/stat`);
    return response.data;
};


export const getTop10ByGroup = async (group) => {
    const response = await axiosInstance.get(`scores/top10/${group}`);
    return response.data;
};