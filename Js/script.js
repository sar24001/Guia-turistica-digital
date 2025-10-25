// Script para interacciones básicas de la página Inicio
document.addEventListener('DOMContentLoaded', function () {
	const navToggle = document.getElementById('navToggle');
	const mainNav = document.getElementById('mainNav');

	if (navToggle && mainNav) {
		navToggle.addEventListener('click', function () {
			const expanded = this.getAttribute('aria-expanded') === 'true';
			this.setAttribute('aria-expanded', String(!expanded));
			mainNav.classList.toggle('open');
		});

		// Close menu when clicking outside (mobile)
		document.addEventListener('click', (e) => {
			if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
				mainNav.classList.remove('open');
				navToggle.setAttribute('aria-expanded', 'false');
			}
		});
	}

	// Año dinámico en el footer
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// Desplazamiento suave para anclas internas
	document.querySelectorAll('a[href^="#"]').forEach(a => {
		a.addEventListener('click', function (e) {
			const targetId = this.getAttribute('href').slice(1);
			if (!targetId) return;
			const target = document.getElementById(targetId);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({behavior:'smooth', block:'start'});
				target.setAttribute('tabindex','-1');
				target.focus({preventScroll:true});
			}
		});
	});

	// Manejo simple del formulario de contacto (si existe)
	const contactForm = document.getElementById('contactForm');
	if (contactForm) {
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault();
			const status = document.getElementById('formStatus');
			if (status) {
				status.textContent = 'Gracias por tu mensaje. Te responderemos pronto.';
			}
			contactForm.reset();
		});
	}

	// Fallback de imágenes: si falla la principal, intenta con data-fallback y luego un placeholder embebido
	const PLACEHOLDER = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
		`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="426" viewBox="0 0 640 426">
		  <defs>
			<linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
			  <stop offset="0%" stop-color="#0b4ea2"/>
			  <stop offset="100%" stop-color="#7fc3e3"/>
			</linearGradient>
		  </defs>
		  <rect width="100%" height="100%" fill="url(#g)"/>
		  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Arial" font-size="24">Imagen no disponible</text>
		</svg>`
	);

	document.querySelectorAll('img[data-fallback]').forEach(img => {
		let triedFallback = false;
		img.addEventListener('error', function handleErr() {
			if (!triedFallback) {
				triedFallback = true;
				const altSrc = img.getAttribute('data-fallback');
				if (altSrc && img.src !== altSrc) { img.src = altSrc; return; }
			}
			if (img.src !== PLACEHOLDER) {
				img.src = PLACEHOLDER;
			} else {
				img.removeEventListener('error', handleErr);
			}
		});
	});
});

