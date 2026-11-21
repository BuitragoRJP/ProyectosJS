const fetchGeneros = async (filtro = 'movie') => {
	const tipo = filtro === 'movie' ? 'movie' : 'tv';
	const url = `https://api.themoviedb.org/3/genre/${tipo}/list?api_key=de2015f8133a43bd67ab44e677595240&language=es-MX`;

	try {
		const resultados = await fetch(url);
		const datos = await resultados.json();
		return datos.genres;
	} catch (e) {
		console.log(e);
	}
};

export default fetchGeneros;
