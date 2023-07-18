export default interface IFormReader {
  getAction: () => string | null;
  getInputsName: () => (string | null)[] | null;
}
