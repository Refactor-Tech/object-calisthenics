import { Video } from "@/domain/video/video";
import { Email } from "@/domain/value-objects/email";
import { WatchedVideos } from "@/domain/student/watched-videos";

export class Student {
  private watchedVideos: WatchedVideos;

  constructor(
    readonly _email: Email,
    readonly birthdate: Date,
    readonly firstName: string,
    readonly lastName: string,
    readonly street: string,
    readonly number: string,
    readonly province: string,
    readonly city: string,
    readonly state: string,
    readonly country: string
  ) {
    this.watchedVideos = new WatchedVideos();
  }

  get fullname(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get email(): string {
    return this._email.getValue();
  }

  get age(): number {
    const today = new Date();
    let age = today.getFullYear() - this.birthdate.getFullYear();
    const monthDiff = today.getMonth() - this.birthdate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < this.birthdate.getDate())
    ) {
      age--;
    }
    return age;
  }

  watch(video: Video, date: Date): void {
    this.watchedVideos.add(video, date);
  }

  hasAccess(): boolean {
    if (this.watchedVideos.size() === 0) {
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
