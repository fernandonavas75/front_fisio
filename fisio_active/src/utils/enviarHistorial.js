// src/utils/enviarHistorial.js
import api from '../api/axiosConfig';

export async function enviarHistorialAOpenAI(data) {
  try {
    const formData = new FormData();
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    formData.append('archivo', blob, 'historial.json');

    const response = await api.post('/openai/sugerencias', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data.sugerencias;
  } catch (error) {
    console.error('Error al enviar historial:', error);
    throw error;
  }
}
