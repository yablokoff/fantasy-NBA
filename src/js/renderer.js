import marked from "marked";


const renderer = new marked.Renderer();


renderer.link = (href, title, text) => {
    return `<a class="link" href=${href} target="_blank" rel="noreferrer" title=${title ? title : ""}>${text}</a>`;
}

export default renderer;
