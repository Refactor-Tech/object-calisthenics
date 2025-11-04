import { Video } from "@/domain/video/video";

export class Student {
  private email!: string;
  private watchedVideos: Map<Video, Date>;

  constructor(
    email: string,
    readonly bd: Date,
    readonly fName: string,
    readonly lName: string,
    readonly street: string,
    readonly number: string,
    readonly province: string,
    readonly city: string,
    readonly state: string,
    readonly country: string
  ) {
    this.setEmail(email);
    this.watchedVideos = new Map<Video, Date>();
  }

  getFullName(): string {
    return `${this.fName} ${this.lName}`;
  }

  private setEmail(email: string): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }

  getBd(): Date {
    return this.bd;
  }

  watch(video: any, date: Date): void {
    this.watchedVideos.set(video, date);
  }

  hasAccess(): boolean {
    if (this.watchedVideos.size === 0) {
      return true;
    }
    return this.firstVideoWasWatchedInLessThan90Days();
  }

  private firstVideoWasWatchedInLessThan90Days(): boolean {
    const sortedVideos = Array.from(this.watchedVideos.entries()).sort(
      (a, b) => a[1].getTime() - b[1].getTime()
    );
    const firstDate = sortedVideos[0][1];
    const today = new Date();

    const diffTime = today.getTime() - firstDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays < 90;
  }
}
