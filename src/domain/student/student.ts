import { Video } from "@/domain/video/video";
import { Email } from "@/domain/value-objects/email";
import { WatchedVideos } from "@/domain/student/WatchedVideos";

export class Student {
  private watchedVideos: WatchedVideos;

  constructor(
    readonly email: Email,
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
    this.watchedVideos = new WatchedVideos();
  }

  getFullName(): string {
    return `${this.fName} ${this.lName}`;
  }

  getEmail(): string {
    return this.email.getValue();
  }

  getBd(): Date {
    return this.bd;
  }

  watch(video: Video, date: Date): void {
    this.watchedVideos.add(video, date);
  }

  hasAccess(): boolean {
    if (this.watchedVideos.isEmpty()) {
      return true;
    }
    return this.firstVideoWasWatchedInLessThan90Days();
  }

  private firstVideoWasWatchedInLessThan90Days(): boolean {
    const firstDate = this.watchedVideos.getEarliestDate();
    const today = new Date();

    const diffTime = today.getTime() - firstDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays < 90;
  }
}
