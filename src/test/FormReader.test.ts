import FormReader from "../FormReader";

describe("Form Reader", () => {
  it("throws an error for invalid HTML content", () => {
    expect(() => new FormReader("Invalid HTML Content")).toThrow(
      "Invalid HTML content"
    );
  });

  it("returns null when no form element is present", () => {
    const html = "<body></body>";
    const formReader = new FormReader(html);
    expect(formReader.getAction()).toBe(null);
  });

  it("returns null when form element has no proper action link", () => {
    const html = `<body>
      <form action="https//goodForm" target="_self" method="POST">
      </form>
    </body>`;
    const formReader = new FormReader(html);
    expect(formReader.getAction()).toBe(null);
  });

  it("returns the action link of the first form element", () => {
    const html = `<body>
      <form action="https//goodForm/formResponse" target="_self" method="POST">
      </form>
    </body>`;
    const formReader = new FormReader(html);
    expect(formReader.getAction()).toBe("https//goodForm/formResponse");
  });

  it("returns null when no input elements with 'entry' in name attribute are present", () => {
    const html = `<body>
      <form action="https//goodForm/formResponse" target="_self" method="POST">
      </form>
    </body>`;
    const formReader = new FormReader(html);
    expect(formReader.getInputsName()).toBe(null);
  });

  it("returns an array of input names with 'entry' in name attribute", () => {
    const html = `<body>
      <form ction="https:form/formResponse" onsubmit="submitted=true;" class="astro-JSZCZD5G">
        <div class="labeled-input astro-TMEYJMBC">
          <label class="astro-TMEYJMBC">First &amp; Last Name</label>
          <input type="text" name="entry.1" class="astro-TMEYJMBC">
        </div>
        <div class="labeled-input astro-TMEYJMBC">
          <label class="astro-TMEYJMBC">Company</label>
          <input type="text" name="entry.2" class="astro-TMEYJMBC">
        </div>
        <div class="labeled-input astro-TMEYJMBC">
          <label class="astro-TMEYJMBC">Email</label>
          <input type="email" name="entry.3" class="astro-TMEYJMBC">
        </div>
        <div class="labeled-input astro-TMEYJMBC">
          <label class="astro-TMEYJMBC">Message</label>
          <input name="entry.4" class="textarea astro-TMEYJMBC"></input>
        </div>
        <button type="submit" class="btn astro-JSZCZD5G" id="btn">Submit</button>
      </form>
    </body>`;
    const formReader = new FormReader(html);
    expect(formReader.getInputsName()).toStrictEqual([
      "entry.1",
      "entry.2",
      "entry.3",
      "entry.4",
    ]);
  });

  it("returns null when input elements are not present", () => {
    const html = `<body>
      <form action="https://goodForm/formResponse" target="_self" method="POST">
      </form>
    </body>`;
    const formReader = new FormReader(html);
    expect(formReader.getInputsName()).toBe(null);
  });

  it("returns an empty array when no input elements with 'entry' in name attribute are present", () => {
    const html = `<body>
      <form action="https:form/formResponse" method="post" target="hidden_iframe" onsubmit="submitted=true;" class="astro-JSZCZD5G">
        <div class="labeled-input astro-TMEYJMBC">
          <label class="astro-TMEYJMBC">First &amp; Last Name</label>
          <input type="text" name="fullname" class="astro-TMEYJMBC">
        </div>
        <div class="labeled-input astro-TMEYJMBC">
          <label class="astro-TMEYJMBC">Company</label>
          <input type="text" name="company" class="astro-TMEYJMBC">
        </div>
        <div class="labeled-input astro-TMEYJMBC">
          <label class="astro-TMEYJMBC">Email</label>
          <input type="email" name="email" class="astro-TMEYJMBC">
        </div>
        <div class="labeled-input astro-TMEYJMBC">
          <label class="astro-TMEYJMBC">Message</label>
          <input name="message" class="textarea astro-TMEYJMBC"></input>
        </div>
        <button type="submit" class="btn astro-JSZCZD5G" id="btn">Submit</button>
      </form>
    </body>`;
    const formReader = new FormReader(html);
    expect(formReader.getInputsName()).toStrictEqual([]);
  });
});
