const API_BASE_URL = "http://localhost:3000/notes";
const API_CATEGORIES_URL = "http://localhost:3000/categories";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

export const fetchNotes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/non-archived`);
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const createNote = async (note) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const updateNote = async (note) => {
  const { id, title, content, categories } = note;
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, categories }),
    });

    if (!response.ok) {
      throw new Error("Failed to update note");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

export const deleteNote = async (noteId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${noteId}`, {
      method: "DELETE",
    });

    // Check if the response is not empty
    const text = await response.text();
    if (!text) {
      return "Empty response from server";
    }

    // Parse the JSON response
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

export const archiveNote = async (noteId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${noteId}/archive`, {
      method: "PATCH",
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error archiving note:", error);
    throw error;
  }
};

export const fetchArchivedNotes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/archived`);
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching archived notes:", error);
    throw error;
  }
};

export const unarchiveNote = async (noteId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${noteId}/unarchive`, {
      method: "PATCH",
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error unarchiving note:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_CATEGORIES_URL}`);
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching archived notes:", error);
    throw error;
  }
};

export const createCategory = async (name) => {
  const response = await fetch(`${API_CATEGORIES_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return response.json();
};
