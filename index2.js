const sliderTrack = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slide");
    const halfLength = Math.floor(slides.length / 2); 
    const changeButton = document.getElementById("changeButton");

    let currentIndex = 0;

    function moveToNext() {
        currentIndex++;

    
        if (currentIndex === halfLength) {
            sliderTrack.style.transitionDuration = '0ms';
            sliderTrack.style.transform = `translateX(0px)`;
            currentIndex = 0; 
        } else {
            sliderTrack.style.transitionDuration = '0.5s';
        }

       
        const translateAmount = -(currentIndex * (slides[0].getBoundingClientRect().width + 40));
        sliderTrack.style.transform = `translateX(${translateAmount}px)`;
    }

    changeButton.addEventListener("click", moveToNext);