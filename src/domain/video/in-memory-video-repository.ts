import { Student } from "@/domain/student/student";
import { Video } from "@/domain/video/video";
import { VideoRepository } from "@/domain/video/video-repository.interface";

export class InMemoryVideoRepository implements VideoRepository {
  private videos: Video[] = [];

  async add(video: Video): Promise<void> {
    this.videos.push(video);
  }

  videosFor(student: Student): Video[] {
    const studentAge = student.age;
    return this.videos.filter((video) => {
      return video.getAgeLimit() <= studentAge;
    });
  }
}
