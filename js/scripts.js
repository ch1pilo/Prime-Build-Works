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

// Contadores animados para el banner de estadísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Velocidad de la animación
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 1);
        } else {
            counter.innerText = target;
        }
    });
}
// Carrusel de testimonios (opcional - para futura implementación)
function initTestimonialsCarousel() {
    // Puedes implementar un carrusel aquí si quieres que los testimonios roten
    console.log('Testimonials carousel ready for implementation');
}

// Efectos hover mejorados para tarjetas
function enhanceCardInteractions() {
    const cards = document.querySelectorAll('.value-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Inicializar todas las funcionalidades cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialsCarousel();
    enhanceCardInteractions();
    
    // Reiniciar contadores al hacer scroll (para demostración)
    let counted = false;
    window.addEventListener('scroll', function() {
        const statsSection = document.querySelector('.stats-banner');
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition && !counted) {
            animateCounters();
            counted = true;
        }
    });
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


/*menu de hamburguesa */

// === 1. SELECCIONAR ELEMENTOS ===
const botonMenu = document.getElementById('mobile-menu');
const menu = document.querySelector('.nav');
const enlacesMenu = document.querySelectorAll('.nav-link');

// === 2. FUNCIÓN PRINCIPAL ===
function toggleMenu() {
    // Alterna entre abierto/cerrado
    botonMenu.classList.toggle('active');
    menu.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Bloquea/desbloquea scroll
}

// === 3. EVENTOS ===

// A. Click en el botón hamburguesa
botonMenu.addEventListener('click', function(e) {
    e.stopPropagation(); // Evita que el click se propague
    toggleMenu();
});

// B. Cerrar menú al hacer clic en un enlace
enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', () => {
        botonMenu.classList.remove('active');
        menu.classList.remove('active');
                document.body.classList.remove('no-scroll');
    });
});

// C. Cerrar menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !botonMenu.contains(e.target)) {
        botonMenu.classList.remove('active');
        menu.classList.remove('active');
                document.body.classList.remove('no-scroll');
    }
});

// D. Cerrar menú al redimensionar (si vuelve a desktop)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        botonMenu.classList.remove('active');
        menu.classList.remove('active');
                document.body.classList.remove('no-scroll');
    }
});

