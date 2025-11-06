import { min } from "date-fns/min";
import { Video } from "@/domain/video/video";

export class WatchedVideos {
  private videos: Map<Video, Date>;

  constructor() {
    this.videos = new Map<Video, Date>();
  }

  add(video: Video, date: Date): void {
    this.videos.set(video, date);
  }

  size(): number {
    return this.videos.size;
  }

  earliestDate(): Date {
    return min([...this.videos.values()]);
  }
}
