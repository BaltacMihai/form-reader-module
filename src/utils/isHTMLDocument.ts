export default function isHTMLDocument(body: string): boolean {
  const htmlRegex = /<(?:\s*[^>]+)*>/i;
  return htmlRegex.test(body);
}
