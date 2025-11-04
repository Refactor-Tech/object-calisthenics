export class Email {
  constructor(private readonly value: string) {
    this.validateEmail(value);
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
  }

  getValue(): string {
    return this.value;
  }
}
