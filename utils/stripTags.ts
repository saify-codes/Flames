export default function stripHTMLTags(html: string) {
    return html.replace(/<[^>]*>/g, '');
}
