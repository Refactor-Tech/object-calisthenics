export class Email {
  constructor(private readonly _value: string) {
    this.validateEmail(_value);
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
  }

  get value(): string {
    return this._value;
  }
}
