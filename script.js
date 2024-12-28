// Получение данных с GitHub API
fetch('https://api.github.com/repos/dogsingaps/paper_thieves/contents/collages/gallery.json')
  .then(response => response.json())
  .then(data => {
    const galleryContainer = document.getElementById('gallery-container');
    
    // Декодируем контент (он приходит закодированным в Base64)
    const galleryData = JSON.parse(atob(data.content));
    
    // Отображаем изображения в галерее
    galleryData.forEach(item => {
      const imgElement = document.createElement('img');
      imgElement.src = item.image_url;
      imgElement.alt = item.caption;
      
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');
      galleryItem.appendChild(imgElement);
      galleryContainer.appendChild(galleryItem);

      // Добавляем событие для открытия изображения в модальном окне
      galleryItem.addEventListener('click', () => {
        openModal(item.image_url);
      });
    });
  })
  .catch(error => console.error('Error loading gallery data:', error));

// Функция для открытия изображения в модальном окне
function openModal(imageUrl) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-image");
  modal.style.display = "block";
  modalImg.src = imageUrl;
}

// Закрытие модального окна
document.getElementById("close").onclick = function () {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
};
