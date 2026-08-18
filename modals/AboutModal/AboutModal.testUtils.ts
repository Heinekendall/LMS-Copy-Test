import type { CourseData } from "../../api/nb/service/snapshot/courseDataQuery.ts";
import type { TransformedAboutData } from "../../types/types.ts";

type CourseDataOverrides = Partial<Omit<CourseData, "isMaster">> & {
  isMaster?: boolean;
};

export function createAboutModalSnapshot(
  overrides: CourseDataOverrides = {},
): CourseData {
  return {
    id: 217422,
    isbn: "9780357757965",
    coreTextISBN: "9798214120959",
    snapshotId: 217422,
    isMaster: false,
    isReaderOnly: false,
    name: "Chemistry 101",
    courseKey: "COURSE-KEY",
    ...overrides,
  } as CourseData;
}

export function createAboutModalData(
  overrides: Partial<TransformedAboutData> = {},
): TransformedAboutData {
  return {
    courseName: "Chemistry 101",
    sectionName: "Section A",
    courseTitle: "Chemical Principles, 1st Edition",
    startDate: Date.UTC(2025, 0, 1),
    endDate: Date.UTC(2025, 0, 31),
    timeZone: "UTC",
    timeZoneCode: "UTC",
    books: [
      {
        title: "Chemical Principles, 1st Edition",
        subTitle: "1st Edition",
        coverImageUrl: "/cover.jpg",
        coverImageInfo: "Cover image information",
        coverMetadata: "Cover metadata",
        authors: ["Jane&nbsp;Author", "John Writer"],
        authorsInfo: "<p>Jane and John write chemistry textbooks.</p>",
        copyrightStatement: "<p>Copyright statement body.</p>",
        printIsbn: "9780357757965",
        copyrightInfo: "2025 Cengage Learning",
        mtIsbn: "9798214120959",
        mtCopyrightInfo: "2025 Cengage MindTap",
      },
    ],
    aboutCengage: "<p>About Cengage body.</p>",
    aboutPlatform: "<p>MindTap platform body.</p>",
    supportInfo: "<h3>SUPPORT INFORMATION</h3><p>Support body.</p>",
    ...overrides,
  };
}
