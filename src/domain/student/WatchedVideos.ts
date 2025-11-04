import { Video } from "../video/video";

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

  isEmpty(): boolean {
    return this.videos.size === 0;
  }

  getEarliestDate(): Date {
    const sortedVideos = Array.from(this.videos.entries()).sort(
      (a, b) => a[1].getTime() - b[1].getTime()
    );
    return sortedVideos[0][1];
  }
}
