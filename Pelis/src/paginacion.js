import cargarTitulos from './cargarTitulos';
import fetchBusqueda from './fetchBusqueda';

const anterior = document.getElementById('pagina-anterior');
const siguiente = document.getElementById('pagina-siguiente');

siguiente.addEventListener('click', async (e) => {
	e.preventDefault();

	const paginaActual = parseInt(document.getElementById('populares').dataset.pagina);

	try {
		console.log('Pagina actual:', paginaActual);
		const resultados = await fetchBusqueda(paginaActual + 1);
		document.getElementById('populares').setAttribute('data-pagina', paginaActual + 1);

		cargarTitulos(resultados);
		window.scrollTo(0, 0);
	} catch (e) {
		console.log(e);
	}
});

anterior.addEventListener('click', async (e) => {
	e.preventDefault();

	const paginaActual = parseInt(document.getElementById('populares').dataset.pagina);

	if (paginaActual > 1) {
		try {
			const resultados = await fetchBusqueda(paginaActual - 1);
			document.getElementById('populares').setAttribute('data-pagina', paginaActual - 1);

			cargarTitulos(resultados);
			window.scrollTo(0, 0);
		} catch (e) {
			console.log(e);
		}
	}
});
