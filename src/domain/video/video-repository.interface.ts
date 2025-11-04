import { Student } from "@/domain/student/student";
import { Video } from "@/domain/video/video";

export interface VideoRepository {
  add(video: Video): Promise<void>;
  videosFor(student: Student): Video[];
}
