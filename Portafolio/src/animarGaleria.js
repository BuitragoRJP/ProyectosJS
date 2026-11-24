const galeria = document.getElementById('trabajos');

const observer = new IntersectionObserver(
	(entries) => {
		if (entries[0].isIntersecting) {
			observer.unobserve(galeria);
			const trabajos = galeria.querySelectorAll('.trabajos__imagenes a');
			trabajos.forEach((trabajo, index) => {
				setTimeout(() => {
					trabajo.classList.add('trabajos__trabajo--visible');
				}, index * 200);
			});
		}
	},
	{
		rootMargin: '0px 0px 0px 0px',
		threshold: 0.1,
	}
);

observer.observe(galeria);
