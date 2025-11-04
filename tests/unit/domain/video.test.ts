import { describe, expect, test } from "vitest";
import { Video } from "@/domain/video/video";

describe("domain > Video", () => {
  test("video starts as private", () => {
    const video = new Video();
    expect(video.isPublic()).toBeFalsy();
  });
  test("make a video public", () => {
    const video = new Video();
    video.publish();
    expect(video.isPublic()).toBeTruthy();
  });
});
