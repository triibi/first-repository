document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const fromInput = document.getElementById('fromInput');
    const toInput = document.getElementById('toInput');
    const wishInput = document.getElementById('wishInput');
    
    const textTop = document.getElementById('textTop');
    const textCenter = document.getElementById('textCenter');
    const textBottom = document.getElementById('textBottom');
    
    const selectImageBtn = document.getElementById('selectImageBtn');
    const createCardBtn = document.getElementById('createCardBtn');
    const resetBtn = document.getElementById('resetBtn');
    const imageUpload = document.getElementById('imageUpload');
    const card = document.getElementById('card');

    // Текущий фон карточки
    let currentBackground = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

    // Обновление текста на открытке
    function updateText() {
        textTop.textContent = fromInput.value || 'От кого';
        textCenter.textContent = toInput.value || 'Кому';
        textBottom.textContent = wishInput.value || 'Пожелание';
    }

    // Слушаем ввод в полях
    fromInput.addEventListener('input', updateText);
    toInput.addEventListener('input', updateText);
    wishInput.addEventListener('input', updateText);


    // Выбор изображения
    selectImageBtn.addEventListener('click', function() {
        imageUpload.click();
    });

    // Обработка выбора изображения
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Проверяем тип файла
        if (!file.type.match('image.*')) {
            alert('Пожалуйста, выберите файл изображения (JPG, PNG, GIF)');
            return;
        }

        // Проверяем размер файла (максимум 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Файл слишком большой. Максимальный размер: 5MB');
            return;
        }

        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Устанавливаем выбранное изображение как фон
            card.style.background = `url('${e.target.result}') center/cover no-repeat`;
            currentBackground = `url('${e.target.result}') center/cover no-repeat`;
            
            // Показываем уведомление
            alert('Изображение успешно загружено!');
        };
        
        reader.onerror = function() {
            alert('Ошибка при чтении файла');
        };
        
        reader.readAsDataURL(file);
    });

    // Создание и сохранение открытки
    createCardBtn.addEventListener('click', function() {
        if (typeof html2canvas === 'undefined') {
            alert('Пожалуйста, подождите загрузки библиотеки и попробуйте снова');
            return;
        }
        
        // Проверяем, заполнены ли поля
        if (!fromInput.value.trim() || !toInput.value.trim() || !wishInput.value.trim()) {
            alert('Пожалуйста, заполните все поля перед созданием открытки');
            return;
        }
        
        const originalText = createCardBtn.textContent;
        createCardBtn.disabled = true;
        createCardBtn.textContent = 'Создаём...';
        
        html2canvas(card, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false
        }).then(canvas => {
            // Создаем ссылку для скачивания
            const link = document.createElement('a');
            const date = new Date();
            const fileName = `открытка-${date.getTime()}.png`;
            
            link.download = fileName;
            link.href = canvas.toDataURL('image/png');
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Показываем успешное сообщение
            createCardBtn.disabled = false;
            createCardBtn.textContent = 'Создано!';
            
            setTimeout(() => {
                createCardBtn.textContent = originalText;
            }, 2000);
            
        }).catch(error => {
            console.error('Ошибка:', error);
            alert('Ошибка при создании открытки. Пожалуйста, попробуйте еще раз.');
            
            createCardBtn.disabled = false;
            createCardBtn.textContent = originalText;
        });
    });
    // Инициализация
    updateText();
});