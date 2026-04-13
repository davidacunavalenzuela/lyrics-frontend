const form = document.getElementById('songForm');
const titleInput = document.getElementById('title');
const lyricInput = document.getElementById('lyric');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const formMessage = document.getElementById('formMessage');

function showMessage(message, type = 'info') {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}

function clearMessage() {
  formMessage.textContent = '';
  formMessage.className = 'form-message';
}

function setLoading(isLoading) {
  saveBtn.disabled = isLoading;
  saveBtn.textContent = isLoading ? 'Guardando...' : 'Guardar canción';
}

function resetForm() {
  form.reset();
  titleInput.focus();
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearMessage();

  const title = titleInput.value.trim();
  const lyric = lyricInput.value.trim();

  if (!title) {
    showMessage('Debes ingresar un título.', 'error');
    titleInput.focus();
    return;
  }

  if (!lyric) {
    showMessage('Debes ingresar la letra.', 'error');
    lyricInput.focus();
    return;
  }

  try {
    setLoading(true);

    const createdSong = await createSong({
      title,
      lyric
    });

    showMessage(`Canción guardada con ID ${createdSong.id}.`, 'success');
    resetForm();

  } catch (error) {
    showMessage(error.message || 'No se pudo guardar la canción.', 'error');
  } finally {
    setLoading(false);
  }
});

clearBtn.addEventListener('click', () => {
  resetForm();
  clearMessage();
});