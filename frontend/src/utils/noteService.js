const API_BASE_URL = 'http://localhost:3000/notes';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const fetchNotes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/non-archived`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const createNote = async (note) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

export const deleteNote = async (noteId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${noteId}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

export const archiveNote = async (noteId) => {  
  try {
    const response = await fetch(`${API_BASE_URL}/${noteId}/archive`, {
      method: 'PATCH',
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error archiving note:', error);
    throw error;
  }
};

export const fetchArchivedNotes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/archived`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching archived notes:', error);
    throw error;
  }
};

export const unarchiveNote = async (noteId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${noteId}/unarchive`, {
      method: 'PATCH',
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error unarchiving note:', error);
    throw error;
  }
};