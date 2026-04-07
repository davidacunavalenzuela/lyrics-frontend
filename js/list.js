const songsList = document.getElementById('songs-list');

async function loadSongs() {
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}?action=list`);

    if (!response.ok) {
      throw new Error('No se pudo conectar con el backend');
    }

    const result = await response.json();

    if (!result.ok || !Array.isArray(result.data)) {
      throw new Error('La respuesta del backend no tiene el formato esperado');
    }

    renderSongs(result.data);
  } catch (error) {
    console.error(error);
    songsList.innerHTML = `
      <li class="error">No se pudo cargar el listado de canciones.</li>
    `;
  }
}

function renderSongs(songs) {
  if (songs.length === 0) {
    songsList.innerHTML = `
      <li class="empty">No hay canciones disponibles.</li>
    `;
    return;
  }

  songsList.innerHTML = songs.map(song => `
    <li>
      <a href="song.html?id=${song.id}">${song.title}</a>
    </li>
  `).join('');
}

loadSongs();