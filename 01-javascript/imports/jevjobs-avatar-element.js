class DevJobsAvatar extends HTMLElement {
    constructor() {
        super(); // Llamar al constructor de HTML

        this.attachShadow({ mode: 'open' }) // Los estilos de fuera no afecten a este elemento
    }

    createUrl(service, username) {
        return `https://unavatar.io/${service}/${username}`
    }

    render() {

        // recuperar atributos de mi elemento
        const service = this.getAttribute('service') ?? 'github'
        const username = this.getAttribute('username')
        const size = this.getAttribute('size')

        const url = this.createUrl(service, username)

        // Modo shadow poner shadowroot
        this.shadowRoot.innerHTML = `
        
        <style>
        img {
            width: ${size}px;
            height: ${size}px;
            border-radius: 100%;
            display: block;
            object-fit: cover;
            }
        /* Estilos personalizados, no afectan afuera */
        </style>

        <img
            src="${url}"
            alt="Avatar de CeboMkn"
            class="avatar"
            />
        `
    }

    // Indicarle cuando llamar a esta clase 
    // connectedCallback (cunado se llame a este elemento)
    connectedCallback() {
        this.render()
    }

}

customElements.define('devjobs-avatar', DevJobsAvatar)