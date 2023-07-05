import { Renderer } from 'marked';

export const renderer = new Renderer();

renderer.link = (href, title, text) => {
    return `<a class="link" href=${href} target="_blank" rel="noreferrer" title=${title ? title : ''}>${text}</a>`;
};
