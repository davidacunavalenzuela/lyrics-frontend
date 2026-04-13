async function apiRequest(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  const result = await response.json();

  if (!result.ok) {
    throw new Error(result.error || 'Ocurrió un error en la API');
  }

  return result.data;
}

async function getSongs() {
  const url = `${API_BASE_URL}?action=list`;
  return apiRequest(url);
}

async function getSongById(id) {
  const url = `${API_BASE_URL}?action=song&id=${encodeURIComponent(id)}`;
  return apiRequest(url);
}

async function createSong(song) {
  return apiRequest(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: song.title,
      lyric: song.lyric
    })
  });
}