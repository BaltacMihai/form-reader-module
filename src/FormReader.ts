import IFormReader from "./FormReader";
import isHTMLDocument from "./utils/isHTMLDocument";

import { TAGS } from "./utils/tags";
import { ATTRIBUTES } from "./utils/attributes";

const { JSDOM } = require("jsdom");

export default class FormReader implements IFormReader {
  private document: Document;

  /**
   * Constructs a new FormReader instance.
   * @param {string} _body - The HTML content to parse.
   * @throws {Error} Throws an error if the provided HTML content is invalid.
   */
  constructor(_body: string) {
    if (isHTMLDocument(_body)) {
      const { window } = new JSDOM(_body);
      this.document = window.document;
    } else {
      throw new Error("Invalid HTML content");
    }
  }

  private getHTMLElement(_tagName: string): HTMLCollectionOf<Element> {
    return this.document.getElementsByTagName(_tagName);
  }

  /**
   * Retrieves the action attribute value of the first form element found in the HTML content.
   * @returns {string|null} The action attribute value, or null if no form element or a valid action is found.
   */
  getAction(): string | null {
    const _form = this.getHTMLElement(TAGS.FORM);

    const _forms: Element[] = Array.from(_form);

    if (_forms.length === 0) return null;

    if (!/\/formResponse$/.test(_forms[0].getAttribute("action") || ""))
      return null;

    return _forms[0].getAttribute(ATTRIBUTES.ACTION) || null;
  }

  /**
   * Retrieves the names of input elements that include the substring "entry" in their name attribute.
   * @returns {(string|null)[]|null} An array of input names, or null if no input elements or matching names are found.
   */
  getInputsName(): (string | null)[] | null {
    const _inputsElements = this.getHTMLElement(TAGS.INPUT);

    const _inputs: Element[] = Array.from(_inputsElements);

    if (_inputs.length === 0) return null;

    const _inputNames = _inputs
      .filter((_input) => {
        const _attributeName: string | null = _input.getAttribute(
          ATTRIBUTES.NAME
        );
        return _attributeName && _attributeName.includes("entry");
      })
      .map((_input) => _input.getAttribute(ATTRIBUTES.NAME));

    if (_inputNames.length === 0) return [];

    return _inputNames;
  }
}
