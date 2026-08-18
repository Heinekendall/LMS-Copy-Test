import { DateTime } from "luxon";
import * as React from "react";
import { renderToString } from "react-dom/server";

import type { CourseData } from "../../api/nb/service/snapshot/courseDataQuery.ts";
import type { TransformedAboutData } from "../../types/types.ts";
import { AND, COURSE_INFO_INCOMPLETE } from "./AboutModal.constants.ts";
import type { AboutContentItem } from "./AboutModalContent/AboutModalContent.tsx";

function toMillis(value: string | number) {
  return typeof value === "string" ? parseInt(value, 10) : value;
}

export function formatCourseDuration(
  startDate: string | number,
  endDate: string | number,
  timeZone: string,
  timeZoneCode: string,
  locale: string,
) {
  if (startDate && endDate && timeZone && timeZoneCode) {
    const formattedStartDate = DateTime.fromMillis(toMillis(startDate), {
      zone: timeZone,
    })
      .setLocale(locale)
      .toLocaleString(DateTime.DATE_SHORT);
    const formatterEndDate = DateTime.fromMillis(toMillis(endDate), {
      zone: timeZone,
    })
      .setLocale(locale)
      .toLocaleString(DateTime.DATE_SHORT);

    return `${formattedStartDate} - ${formatterEndDate}  (${timeZoneCode})`;
  }
  return COURSE_INFO_INCOMPLETE;
}

export function concatAuthorNames(authors: string[]): string {
  return authors
    .map((name, idx) => {
      const isTheLastButNotTheOnlyOne = idx === authors.length - 1 && idx !== 0;
      const resultName = name.replace("&nbsp;", " ");

      return isTheLastButNotTheOnlyOne ? `${AND} ${resultName}` : resultName;
    })
    .join(", ");
}

export function getCopyRightMessage(
  content: AboutContentItem,
): string | React.ReactElement {
  if (content.copyRight) {
    const isContentString = typeof content.body === "string";
    const copyRight = <span className="copy-right">{content.copyRight}</span>;
    return isContentString ? renderToString(copyRight) : copyRight;
  }
  return "";
}

function addParam(parameters: string, name: string, value?: number | string) {
  if (!value) {
    return parameters;
  }

  return `${parameters}&${name}=${encodeURIComponent(value)}`;
}

export function getSupportUrlParams(snapshot?: CourseData, ssoToken?: string) {
  let params = "";

  params = addParam(params, "token", ssoToken);

  if (!snapshot) {
    return params;
  }

  if (snapshot.isReaderOnly) {
    params = addParam(params, "rmssoisbn", snapshot.isbn);
    params = addParam(params, "rmsnapshotid", snapshot.snapshotId);
  } else {
    params = addParam(params, "cmcoursename", snapshot.name);
    params = addParam(params, "cmcoursekey", snapshot.courseKey);
  }

  return params;
}

export function getAboutContentLength(
  snapshot: CourseData,
  bookInfo: TransformedAboutData["books"][0],
) {
  let totalLength = 5;
  if (!bookInfo.coverImageUrl) {
    totalLength--;
  }
  if (snapshot.isMaster) {
    totalLength--;
  }

  return totalLength;
}
