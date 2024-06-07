import axios from "axios";
// const API_URL= import.meta.env.VITE_API_URL
const API_URL = "https://passgen-backend.onrender.com"


export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data; 
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data; 
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

export const savepass= async (userData)=>{
    try {
        const response = await axios.post(`${API_URL}/savepass`,userData)
        return response.data
    } catch (error) {
        console.error('Error saving password',error)
        throw error
    }
}


export const getpasslist=async(userData)=>{
    try {
        const response=  await axios.post(`${API_URL}/getsaved`,userData)
        return response.data
    } catch (error) {
        console.log("Error while fetching password",error)
    }
}

export const deletepass= async(userData)=>{
    try {
        const response = await axios.post(`${API_URL}/deletepass`,userData)
        return response.data
    } catch (error) {
        console.log('Error while deleting password')
        throw response.data
    }
}