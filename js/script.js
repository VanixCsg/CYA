// ============================================
// NAVEGACIÓN STICKY
// ============================================
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menú móvil
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer click en un link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ============================================
// SCROLL SPY - ACTIVAR LINK ACTUAL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinksItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// ANIMACIÓN DE ENTRADA AL SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item, .stat-item').forEach(el => {
    observer.observe(el);
});

// ============================================
// CONTADOR ANIMADO
// ============================================
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const item = entry.target;
            const target = parseInt(item.dataset.count);
            const numberEl = item.querySelector('.stat-number');
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    numberEl.textContent = target + (target === 98 ? '%' : '+');
                    clearInterval(timer);
                } else {
                    numberEl.textContent = Math.floor(current) + (target === 98 ? '%' : '');
                }
            }, 30);
            statObserver.unobserve(item);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    statObserver.observe(item);
});

// ============================================
// FILTRO DE PORTAFOLIO
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
                setTimeout(() => item.classList.add('visible'), 50);
            } else {
                item.classList.remove('visible');
                setTimeout(() => item.classList.add('hidden'), 300);
            }
        });
    });
});

// ============================================
// LIGHTBOX
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(button) {
    const item = button.closest('.portfolio-item');
    if (!item) return;
    const img = item.querySelector('img');
    const title = item.querySelector('h3')?.textContent || '';
    const tag = item.querySelector('.portfolio-tag')?.textContent || '';

    lightboxImg.src = img.src;
    lightboxCaption.textContent = tag ? `${tag} - ${title}` : title;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

// ============================================
// PREVISUALIZACIÓN DE IMÁGENES
// ============================================
const imageUploadInput = document.getElementById('imageUpload');
const uploadPreview = document.getElementById('uploadPreview');

if (imageUploadInput && uploadPreview) {
    imageUploadInput.addEventListener('change', (event) => {
        uploadPreview.innerHTML = '';
        const files = Array.from(event.target.files);

        if (files.length === 0) {
            uploadPreview.innerHTML = '<p class="upload-empty">No se seleccionaron imágenes.</p>';
            return;
        }

        files.forEach(file => {
            if (!file.type.startsWith('image/')) return;

            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="${file.name}">
                    <button type="button" class="preview-remove" aria-label="Eliminar imagen">&times;</button>
                    <span>${file.name}</span>
                `;
                previewItem.querySelector('.preview-remove').addEventListener('click', () => {
                    previewItem.remove();
                });
                uploadPreview.appendChild(previewItem);
            });
            reader.readAsDataURL(file);
        });
    });
}
// ============================================
// COPIAR CORREO AL PORTAPAPELES
// ============================================
function copiarCorreo() {
    const email = document.querySelector('.email-copy');
    const texto = email.textContent.trim();
    
    navigator.clipboard.writeText(texto).then(() => {
        const tooltip = document.querySelector('.copy-tooltip');
        tooltip.textContent = '✅ ¡Copiado!';
        tooltip.classList.add('show');
        
        setTimeout(() => {
            tooltip.textContent = 'Copiar';
            tooltip.classList.remove('show');
        }, 2000);
    }).catch(err => {
        // Fallback para navegadores antiguos
        const textarea = document.createElement('textarea');
        textarea.value = texto;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        const tooltip = document.querySelector('.copy-tooltip');
        tooltip.textContent = '✅ ¡Copiado!';
        tooltip.classList.add('show');
        
        setTimeout(() => {
            tooltip.textContent = 'Copiar';
            tooltip.classList.remove('show');
        }, 2000);
    });
}

