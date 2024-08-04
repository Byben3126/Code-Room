import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // Remplacez par l'URL de votre API

const api = axios.create({
  baseURL: API_URL,
});


const getToken = () => {
  return localStorage.getItem('token');
};

export const login = async (credentials) => {
  try {
    const params = new URLSearchParams();
    for (const key in credentials) {
      params.append(key, credentials[key]);
    }
    const response = await api.post('/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Access-Control-Allow-Origin": "*"
      },
    });
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const register = async (data) => {
  console.log("createResource")
    const token = getToken()
    const response = await api.post('/signup', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
  });
  return response;
};

export const getAllResource = async () => {

  const token = getToken()
  const response = await api.get('/resource/', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
  });
  return response;
}

export const createResource = async (data) => {
  console.log("createResource")
    const token = getToken()
    const response = await api.post('/resource', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
    });
  return response;
}

export const saveResource = async (idResource, data) => {
    const token = getToken()
    const response = await api.patch(`/resource/${idResource}/`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
    });
  return response;
}

export const deleteResource = async (idResource) => {
  const token = getToken()
  const response = await api.delete(`/resource/${idResource}/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
  });
return response;
}

export const getChapters = async (idResource) => {

  const token = getToken()
  const response = await api.get(`/resource/${idResource}/chapter`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
  });
  return response;
}

export const getResourceHistory = async (user_id, idResource) => {

  const token = getToken()
  const response = await api.get(`/user/${user_id}/resourcehistory/${idResource}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
  });
  return response;
}


export const getResourceByResourceHistory = async (user_id) => {

  const token = getToken()
  const response = await api.get(`/user/${user_id}/resourcebyresourcehistory`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
  });
  return response;
}

export const createResourceHistory = async (user_id, idResource) => {
 
  const token = getToken()
  const response = await api.post(`/user/${user_id}/resourcehistory/${idResource}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
    });
  return response;
}

export const updateResourceHistory = async (user_id, idResource, data) => {
  const token = getToken()
  const response = await api.patch(`/user/${user_id}/resourcehistory/${idResource}`, data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
  });
  return response;
}


export const createChapter = async (idResource, data) => {
  console.log("createResource")
    const token = getToken()
    const response = await api.post(`/resource/${idResource}/chapter`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
    });
  return response;
}

export const saveChapter = async (idResource, idChapter, data) => {

  const token = getToken()
  const response = await api.patch(`/resource/${idResource}/chapter/${idChapter}/`, data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
  });
  return response;
}

export const deleteChapter = async (idResource, idChapter) => {
  const token = getToken()
  const response = await api.delete(`/resource/${idResource}/chapter/${idChapter}/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
  });
return response;
}


export const deleteAccount = async (idUser) => {
  const token = getToken()
  const response = await api.delete(`/users/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
  });
return response;

}



export default api;