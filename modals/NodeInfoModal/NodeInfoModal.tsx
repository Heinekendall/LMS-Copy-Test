import { DateTime } from "luxon";
import * as React from "react";
import {
  Modal,
  ModalSize,
  Paragraph,
  TypographyVisualStyle,
  VisuallyHidden,
} from "react-magma-dom";
import { LockIcon, PasswordIcon } from "react-magma-icons";

import type { ActivityNode } from "../../api/nb/service/nextbook/nodesQuery.ts";
import { useAppSelector } from "../../hooks/reduxHooks.ts";
import focusManager from "../../services/focusManager.ts";
import { FeatureFlagsSelectors } from "../../store/featureFlags.ts";
import type { ModalProps } from "../../types/modalTypes.ts";
import type { NodeMetadata } from "../../types/types.ts";
import * as activityUtils from "../../utilities/activityUtils.ts";
import { NodeInfoList, NodeInfoListItem } from "./NodeInfoModal.styled.ts";

export default function NodeInfoModal(props: ModalProps) {
  const { activity, metadata } = props.data as {
    activity: ActivityNode;
    metadata: NodeMetadata["metadata"];
  };
  const featureFlags = useAppSelector(FeatureFlagsSelectors.getFeatureFlags);

  const isLocked = React.useMemo(
    () => !!activity.startDate && activity.startDate > new Date().getTime(),
    [activity.startDate],
  );
  const startDate = React.useMemo(
    () =>
      activity.startDate ? DateTime.fromMillis(activity.startDate) : undefined,
    [activity.startDate],
  );

  const isPasswordRequired =
    featureFlags.PasswordProtectionEnabled && activity.isPasswordProtected;

  const onClose = () => {
    props.onClose();
    focusManager.restore("open-activity-info-modal");
  };

  return (
    <Modal
      header="Activity Detail"
      isOpen
      onClose={onClose}
      size={ModalSize.small}
    >
      <Paragraph noTopMargin visualStyle={TypographyVisualStyle.headingXSmall}>
        <span dangerouslySetInnerHTML={{ __html: activity.name }} />
      </Paragraph>

      {activity.description.length > 0 && (
        <Paragraph noTopMargin visualStyle={TypographyVisualStyle.bodySmall}>
          <span dangerouslySetInnerHTML={{ __html: activity.description }} />
        </Paragraph>
      )}

      <NodeInfoList>
        {isLocked && (
          <NodeInfoListItem>
            <LockIcon size={16} />
            Unlocks {startDate!.toFormat("MMM d")} @{" "}
            {startDate!.toFormat("h:mm a ZZZZ")}
          </NodeInfoListItem>
        )}

        {isPasswordRequired && (
          <NodeInfoListItem>
            <PasswordIcon size={24} /> password required
          </NodeInfoListItem>
        )}

        {!isLocked && activity.scorable && (
          <>
            {!!metadata.submissionCount && (
              <NodeInfoListItem>
                {`${metadata.submissionCount}/${metadata.totalStudentCount}`}{" "}
                submitted
              </NodeInfoListItem>
            )}
            <NodeInfoListItem>
              {activityUtils.getPercentageSubmitted(
                metadata.submissionCount ?? 0,
                metadata.totalStudentCount ?? 0,
              )}{" "}
              submitted
            </NodeInfoListItem>
            <NodeInfoListItem>
              {!metadata.classAvg && (
                <VisuallyHidden>Average score not available</VisuallyHidden>
              )}
              <span aria-hidden={!metadata.classAvg}>
                {metadata.classAvg ?? "- -"} avg score
              </span>
            </NodeInfoListItem>
          </>
        )}

        {activity.scorable && (
          <NodeInfoListItem>
            <VisuallyHidden>Max score</VisuallyHidden>
            {activityUtils.getScore(activity.maxScore ?? 0)} points
          </NodeInfoListItem>
        )}
      </NodeInfoList>
    </Modal>
  );
}
