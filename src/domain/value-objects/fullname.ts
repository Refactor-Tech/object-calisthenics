export class Fullname {
  constructor(readonly firstName: string, readonly lastName: string) {}

  get value(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
