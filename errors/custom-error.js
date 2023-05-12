export class CustomErrorAPI extends Error {
  constructor (message, statusCode, success) {
    super (message);
    this.statusCode = statusCode;
    this.success = success;
  }
}
export const createCustomError = (msg, statusCode, success = true) => {
  return new CustomErrorAPI (msg, statusCode, success);
};
