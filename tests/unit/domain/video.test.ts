import { describe, expect, test } from "vitest";
import { Video } from "@/domain/video/video";

describe("domain > Video", () => {
  test("change visibility must work", () => {
    const video = new Video();
    expect(video.getVisibility()).toBe(video.PRIVATE);
    video.checkIfVisibilityIsValidAndUpdateIt(video.PUBLIC);
    expect(video.getVisibility()).toBe(video.PUBLIC);
  });

  // test invalid visibility
  test("change visibility with invalid value must throw error", () => {
    const video = new Video();
    expect(() => {
      video.checkIfVisibilityIsValidAndUpdateIt(0);
    }).toThrowError("Invalid visibility value");
  });
});
