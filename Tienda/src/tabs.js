
export default class Tabs {
    constructor(idElemento) {
        this.tabs = document.getElementById(idElemento);
        this.nav = this.tabs.querySelector(".tabs");

        this.nav.addEventListener("click", (e) => {
            e.preventDefault();

            // Solo reaccionamos a los botones de las tabs
            if (e.target.classList.contains("tabs__button")) {
                // Tab que queremos mostrar
                const tab = e.target.dataset.tab;

                // Quitamos la clase activa de la tab y del botón anteriores
                this.tabs.querySelector(".tab--active")?.classList.remove("tab--active");
                this.tabs.querySelector(".tabs__button--active")?.classList.remove("tabs__button--active");

                // Activamos la nueva tab y su botón
                this.tabs.querySelector(`#${tab}`).classList.add("tab--active");
                e.target.classList.add("tabs__button--active");
            }
        });
    }
}
