export class MaxNumberOfCheckInError extends Error {
  constructor() {
    super("Max number of checks-ins reached.");
  }
}
