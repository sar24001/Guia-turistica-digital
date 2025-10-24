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
});

