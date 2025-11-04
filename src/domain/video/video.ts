export class Video {
  private isVisible: boolean = false;
  private ageLimit!: number;

  publish() {
    this.isVisible = true;
  }

  isPublic(): boolean {
    return this.isVisible;
  }

  getAgeLimit(): number {
    return this.ageLimit;
  }

  setAgeLimit(ageLimit: number): void {
    this.ageLimit = ageLimit;
  }
}
