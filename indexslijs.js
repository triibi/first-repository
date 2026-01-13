document.addEventListener('DOMContentLoaded', function() {

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


    let currentBackground = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';


    function updateText() {
        textTop.textContent = fromInput.value || 'От кого';
        textCenter.textContent = toInput.value || 'Кому';
        textBottom.textContent = wishInput.value || 'Пожелание';
    }


    fromInput.addEventListener('input', updateText);
    toInput.addEventListener('input', updateText);
    wishInput.addEventListener('input', updateText);



    selectImageBtn.addEventListener('click', function() {
        imageUpload.click();
    });


    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;


        if (!file.type.match('image.*')) {
            alert('Пожалуйста, выберите файл изображения (JPG, PNG, GIF)');
            return;
        }


        if (file.size > 5 * 1024 * 1024) {
            alert('Файл слишком большой. Максимальный размер: 5MB');
            return;
        }

        const reader = new FileReader();
        
        reader.onload = function(e) {

            card.style.background = `url('${e.target.result}') center/cover no-repeat`;
            currentBackground = `url('${e.target.result}') center/cover no-repeat`;
            

            alert('Изображение успешно загружено!');
        };
        
        reader.onerror = function() {
            alert('Ошибка при чтении файла');
        };
        
        reader.readAsDataURL(file);
    });


    createCardBtn.addEventListener('click', function() {
        if (typeof html2canvas === 'undefined') {
            alert('Пожалуйста, подождите загрузки библиотеки и попробуйте снова');
            return;
        }
        

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

            const link = document.createElement('a');
            const date = new Date();
            const fileName = `открытка-${date.getTime()}.png`;
            
            link.download = fileName;
            link.href = canvas.toDataURL('image/png');
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

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
    updateText();
});