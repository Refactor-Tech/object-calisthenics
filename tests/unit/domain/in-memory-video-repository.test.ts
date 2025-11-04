import { beforeEach, describe, expect, test } from "vitest";
import { Student } from "@/domain/student/student";
import { InMemoryVideoRepository } from "@/domain/video/in-memory-video-repository";
import { Video } from "@/domain/video/video";

let student: Student;

beforeEach(() => {
  student = new Student(
    "john.doe@mail.com",
    new Date(2008, 0, 1),
    "John",
    "Doe",
    "123 Main St",
    "1A",
    "Province",
    "City",
    "State",
    "Country"
  );
});

describe("domain > InMemoryVideoRepository", () => {
  test("student has access within 90 days of first watched video", () => {
    const videoRepository = new InMemoryVideoRepository();
    for (let i = 15; i <= 21; i++) {
      const video = new Video();
      video.setAgeLimit(i);
      videoRepository.add(video);
    }
    const videosList = videoRepository.videosFor(student);
    expect(videosList.length).toBe(3);
  });
});
