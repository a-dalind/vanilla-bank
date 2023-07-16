export class Layout {
    // constructor(props) {}
    constructor({router, children}) {
        this.router = router;
        this.children = children;
    }
    render() {
        const headerHtml = `<header>
                                Header
                                <a href="/">Home</a>
                                <a href="/auth">Auth</a>
                                <a href="/about-us">About us</a>
                            </header>`

        return `
            ${headerHtml}
            <main>
                ${this.children}
            </main>
        `
    }
}
