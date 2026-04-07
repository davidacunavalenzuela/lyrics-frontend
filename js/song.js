const songDetail = document.getElementById('song-detail');

async function loadSong() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
      songDetail.innerHTML = `<p class="error">No se indicó el id de la canción.</p>`;
      return;
    }

    const response = await fetch(`${CONFIG.API_BASE_URL}?action=song&id=${id}`);

    if (!response.ok) {
      throw new Error('No se pudo conectar con el backend');
    }

    const result = await response.json();
    console.log('Respuesta del backend:', result);

    if (!result.ok || !result.data) {
      throw new Error('No se encontró la canción');
    }

    renderSong(result.data);
  } catch (error) {
    console.error(error);
    songDetail.innerHTML = `<p class="error">No se pudo cargar la canción.</p>`;
  }
}

function renderSong(song) {
  songDetail.innerHTML = '';

  const meta = document.createElement('p');
  meta.className = 'song-meta';
  meta.textContent = `ID: ${song.id}`;

  const title = document.createElement('h2');
  title.textContent = song.title;

  const lyrics = document.createElement('div');
  lyrics.className = 'song-lyrics';
  lyrics.textContent = song.lyric;

  songDetail.appendChild(meta);
  songDetail.appendChild(title);
  songDetail.appendChild(lyrics);
}

loadSong();