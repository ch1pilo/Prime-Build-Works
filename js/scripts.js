document.addEventListener('DOMContentLoaded', function() {
    const carruselContainer = document.querySelector('.carrusel-container');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.carrusel-control.prev');
    const nextButton = document.querySelector('.carrusel-control.next');
    let currentSlide = 0;
    const totalSlides = 4;
    
    // Función para actualizar el carrusel
    function updateCarrusel() {
        carruselContainer.style.transform = `translateX(-${currentSlide * 25}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Navegación con indicadores
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            currentSlide = parseInt(this.getAttribute('data-slide'));
            updateCarrusel();
        });
    });
    
    // Botón siguiente
    nextButton.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarrusel();
    });
    
    // Botón anterior
    prevButton.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarrusel();
    });
    
    // Carrusel automático (opcional)
    let autoSlide = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarrusel();
    }, 5000);
    
    // Pausar carrusel automático al interactuar
    carruselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    carruselContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarrusel();
        }, 5000);
    });
});

// Para animar elementos al hacer scroll con diferentes direcciones
function revealOnScroll() {
    const revealLeft = document.querySelectorAll('.reveal-from-left');
    const revealRight = document.querySelectorAll('.reveal-from-right');
    const revealBottom = document.querySelectorAll('.reveal-from-bottom');
    
    const windowHeight = window.innerHeight;
    const triggerPoint = 100; // Pixels antes de que el elemento entre en vista

    // Animación desde la IZQUIERDA
    revealLeft.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - triggerPoint) {
            element.classList.add('active');
        }
    });

    // Animación desde la DERECHA
    revealRight.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - triggerPoint) {
            element.classList.add('active');
        }
    });

    // Animación desde ABAJO
    revealBottom.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - triggerPoint) {
            element.classList.add('active');
        }
    });
}

// Ejecutar al cargar y al hacer scroll
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* aparicion de elementos al hacer scroll */