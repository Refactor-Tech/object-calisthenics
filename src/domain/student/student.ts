import { Video } from "@/domain/video/video";
import { Email } from "@/domain/value-objects/email";
import { WatchedVideos } from "@/domain/student/watched-videos";
import { Fullname } from "@/domain/value-objects/fullname";
import { differenceInDays, differenceInYears } from "date-fns";

export class Student {
  private _fullname: Fullname;
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
    this._fullname = new Fullname(firstName, lastName);
    this.watchedVideos = new WatchedVideos();
  }

  get fullname(): string {
    return this._fullname.value;
  }

  get email(): string {
    return this._email.value;
  }

  get age(): number {
    return differenceInYears(new Date(), this.birthdate);
  }

  watch(video: Video, date: Date): void {
    this.watchedVideos.add(video, date);
  }

  hasAccess(): boolean {
    if (!this.hasWatchedVideos()) {
      return true;
    }
    return this.firstVideoWasWatchedInLessThan90Days();
  }

  private hasWatchedVideos(): boolean {
    return this.watchedVideos.size() > 0;
  }

  private firstVideoWasWatchedInLessThan90Days(): boolean {
    const firstDate = this.watchedVideos.getEarliestDate();
    return differenceInDays(new Date(), firstDate) < 90;
  }
}
