import axios from "axios";

const baseURL = "http://localhost:1808/notes";

const createNewNote = async (payload) => {
  try {
    const response = await axios.post(`${baseURL}`, payload);
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
const getAllNotes = async (page_number = 1) => {
  try {
    const response = await axios.get(`${baseURL}?page=${page_number}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
const deleteNote = async (note_id) => {
  try {
    const response = await axios.delete(baseURL + "/" + note_id);
    return response.data;
  } catch (error) {
    console.log("Can not delete Note");
  }
};
const getSingleNote = async (note_id) => {
  try {
    const response = await axios.get(baseURL +"/" + note_id);
    return response.data;
  } catch (error) {
    console.log("can not find the Note");
  }
};
const updateSingleNote = async (note_id ,{note_title,note_body,dateVal}) =>{
  try{
    const payload ={
      title: note_title,
      note_body: note_body,
      date: dateVal,
    }
    const updated = await axios.post(baseURL+ "/" + note_id,payload);
  return updated.data;
  }
  catch(error){
    console.log("Can not Update...");
  }
};

export { createNewNote, getAllNotes, deleteNote, getSingleNote, updateSingleNote };
