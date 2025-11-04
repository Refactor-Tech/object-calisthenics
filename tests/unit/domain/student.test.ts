import { Student } from "@/domain/student/student";
import { beforeEach, describe, it, expect, test } from "vitest";

let student: Student;

beforeEach(() => {
  student = new Student(
    "john.doe@mail.com",
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

describe("domain > Student", () => {
  test("student without watched videos has access", () => {
    expect(student.hasAccess()).toBeTruthy();
  });

  test("student with first watched video in less than 90 days has access", () => {
    const date89DaysAgo = new Date();
    date89DaysAgo.setDate(date89DaysAgo.getDate() - 89);
    student.watch("video2", date89DaysAgo);
    expect(student.hasAccess()).toBeTruthy();
  });

  test("student with first watched video in less than 90 days but other videos watched has access", () => {
    const date89DaysAgo = new Date();
    date89DaysAgo.setDate(date89DaysAgo.getDate() - 89);
    const date30DaysAgo = new Date();
    date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);
    student.watch("video1", date89DaysAgo);
    student.watch("video2", date30DaysAgo);
    expect(student.hasAccess()).toBeTruthy();
  });

  test("student with first watched video in 90 days does not have access", () => {
    const date90DaysAgo = new Date();
    date90DaysAgo.setDate(date90DaysAgo.getDate() - 90);
    student.watch("video1", date90DaysAgo);
    expect(student.hasAccess()).toBeFalsy();
  });

  test("student with first watched video in 90 days but other videos watched less than 90 days ago does not have access", () => {
    const date90DaysAgo = new Date();
    date90DaysAgo.setDate(date90DaysAgo.getDate() - 90);
    const date89DaysAgo = new Date();
    date89DaysAgo.setDate(date89DaysAgo.getDate() - 89);
    student.watch("video1", date90DaysAgo);
    student.watch("video2", date89DaysAgo);
    expect(student.hasAccess()).toBeFalsy();
  });

  test("student with last watched video within 90 days but first watched video over 90 days ago does not have access", () => {
    const date91DaysAgo = new Date();
    date91DaysAgo.setDate(date91DaysAgo.getDate() - 91);
    const date10DaysAgo = new Date();
    date10DaysAgo.setDate(date10DaysAgo.getDate() - 10);
    student.watch("video1", date91DaysAgo);
    student.watch("video2", date10DaysAgo);
    expect(student.hasAccess()).toBeFalsy();
  });

  // test full name
  it("should return full name", () => {
    expect(student.getFullName()).toBe("John Doe");
  });

  // test get email
  it("should return email", () => {
    expect(student.getEmail()).toBe("john.doe@mail.com");
  });

  // test email validation
  it("should throw error for invalid email", () => {
    expect(
      () =>
        new Student(
          "invalid-email",
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
