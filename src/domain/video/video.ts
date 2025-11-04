export class Video {
  public readonly PUBLIC = 1;
  public readonly PRIVATE = 2;

  private visibility: number = this.PRIVATE;
  private ageLimit!: number;

  getVisibility(): number {
    return this.visibility;
  }

  checkIfVisibilityIsValidAndUpdateIt(visibility: number): void {
    if ([this.PUBLIC, this.PRIVATE].includes(visibility)) {
      this.visibility = visibility;
    } else {
      throw new Error("Invalid visibility value");
    }
  }

  getAgeLimit(): number {
    return this.ageLimit;
  }

  setAgeLimit(ageLimit: number): void {
    this.ageLimit = ageLimit;
  }
}
