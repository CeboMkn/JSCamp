export function Link ({href, children, ...restProps}) {
    const handleClick = (e) => {
        e.preventDefault()
        window.history.pushState({}, '', href)
        window.dispatchEvent(new PopStateEvent('popstate'))
    }

    return (
        <a href={href} {...restProps} onClick={handleClick}>
            {children}
        </a>
    )
}