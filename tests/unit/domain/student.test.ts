import { Student } from "@/domain/student/student";
import { Email } from "@/domain/value-objects/email";
import { Video } from "@/domain/video/video";
import { beforeEach, describe, it, expect, test } from "vitest";

describe("domain > Student", () => {
  let student: Student;

  beforeEach(() => {
    student = new Student(
      new Email("john.doe@mail.com"),
      new Date(2000, 0, 1),
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

  test("student without watched videos has access", () => {
    expect(student.hasAccess()).toBeTruthy();
  });

  test("student with first watched video in less than 90 days has access", () => {
    const date89DaysAgo = new Date();
    date89DaysAgo.setDate(date89DaysAgo.getDate() - 89);
    student.watch(new Video(), date89DaysAgo);
    expect(student.hasAccess()).toBeTruthy();
  });

  test("student with first watched video in less than 90 days but other videos watched has access", () => {
    const date89DaysAgo = new Date();
    date89DaysAgo.setDate(date89DaysAgo.getDate() - 89);
    const date30DaysAgo = new Date();
    date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);
    student.watch(new Video(), date89DaysAgo);
    student.watch(new Video(), date30DaysAgo);
    expect(student.hasAccess()).toBeTruthy();
  });

  test("student with first watched video in 90 days does not have access", () => {
    const date90DaysAgo = new Date();
    date90DaysAgo.setDate(date90DaysAgo.getDate() - 90);
    student.watch(new Video(), date90DaysAgo);
    expect(student.hasAccess()).toBeFalsy();
  });

  test("student with first watched video in 90 days but other videos watched less than 90 days ago does not have access", () => {
    const date90DaysAgo = new Date();
    date90DaysAgo.setDate(date90DaysAgo.getDate() - 90);
    const date89DaysAgo = new Date();
    date89DaysAgo.setDate(date89DaysAgo.getDate() - 89);
    student.watch(new Video(), date90DaysAgo);
    student.watch(new Video(), date89DaysAgo);
    expect(student.hasAccess()).toBeFalsy();
  });

  test("student with last watched video within 90 days but first watched video over 90 days ago does not have access", () => {
    const date91DaysAgo = new Date();
    date91DaysAgo.setDate(date91DaysAgo.getDate() - 91);
    const date10DaysAgo = new Date();
    date10DaysAgo.setDate(date10DaysAgo.getDate() - 10);
    student.watch(new Video(), date91DaysAgo);
    student.watch(new Video(), date10DaysAgo);
    expect(student.hasAccess()).toBeFalsy();
  });

  it("should return full name", () => {
    expect(student.fullname).toBe("John Doe");
  });

  it("should return email", () => {
    expect(student.email).toBe("john.doe@mail.com");
  });

  it("should throw error for invalid email", () => {
    expect(
      () =>
        new Student(
          new Email("invalid-email"),
          new Date(2000, 0, 1),
          "John",
          "Doe",
          "123 Main St",
          "1A",
          "Province",
          "City",
          "State",
          "Country"
        )
    ).toThrow("Invalid email format");
  });
});
