const select = document.getElementById('sect_aplicar')

select?.addEventListener('click', (e) => {
    const element = e.target
    if (element.classList.contains('btn_active')) {

        element.textContent = '¡Aplicado!'
        element.disabled = true
        element.style.backgroundColor = 'green'
    }
})


