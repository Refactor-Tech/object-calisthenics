export class Video {
  public readonly PUBLIC = 1;
  public readonly PRIVATE = 2;

  private visibility: number = this.PRIVATE;
  private ageLimit!: number;

  publish() {
    this.visibility = this.PUBLIC;
  }

  getVisibility(): number {
    return this.visibility;
  }

  getAgeLimit(): number {
    return this.ageLimit;
  }

  setAgeLimit(ageLimit: number): void {
    this.ageLimit = ageLimit;
  }
}
