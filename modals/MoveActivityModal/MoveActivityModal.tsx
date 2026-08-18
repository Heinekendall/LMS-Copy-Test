import { isFulfilled } from "@reduxjs/toolkit";
import * as React from "react";
import {
  Button,
  ButtonColor,
  ButtonGroup,
  ButtonGroupAlignment,
  Modal,
  ModalSize,
  Paragraph,
} from "react-magma-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.ts";
import NodeLocationForm from "../../pages/learning-path/NodeLocation/NodeLocationForm.tsx";
import { useNodeLocationState } from "../../pages/learning-path/NodeLocation/useNodeLocationState.ts";
import {
  WorkflowActions,
  WorkflowSelectors,
} from "../../store/workflow/workflow.ts";
import type { ModalProps } from "../../types/modalTypes.ts";

type MoveActivityModalData = {
  activityId: number;
};

export default function MoveActivityModal({ data, onClose }: ModalProps) {
  const { activityId } = data as MoveActivityModalData;
  const dispatch = useAppDispatch();
  const nodes = useAppSelector(WorkflowSelectors.getNodes);
  const rootTopicId = useAppSelector(WorkflowSelectors.getRootTopicId);

  const activity = nodes.activities[activityId];
  const [isSaving, setIsSaving] = React.useState(false);

  const {
    folderOptions,
    handleFolderChange,
    isUnchanged,
    placementOptions,
    selectedFolder,
    selectedOrder,
    setSelectedOrder,
  } = useNodeLocationState({ node: activity, nodes, rootTopicId });

  const handleSave = async () => {
    if (!activity) return;

    setIsSaving(true);
    try {
      const result = await dispatch(
        WorkflowActions.saveActivity({
          id: activity.id,
          parentId: selectedFolder,
          order: selectedOrder,
        }),
      );

      if (isFulfilled(result)) {
        onClose(true);
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (!activity || rootTopicId == null) {
    return null;
  }

  return (
    <Modal
      header="Choose Activity's Location"
      isOpen
      onClose={() => onClose(false)}
      size={ModalSize.medium}
      headerLevel={1}
    >
      <NodeLocationForm
        folderOptions={folderOptions}
        intro={
          <Paragraph noTopMargin>
            Choose location for{" "}
            <span dangerouslySetInnerHTML={{ __html: activity.name }} />
          </Paragraph>
        }
        placementOptions={placementOptions}
        selectedFolder={selectedFolder}
        selectedOrder={selectedOrder}
        onFolderChange={handleFolderChange}
        onOrderChange={setSelectedOrder}
        actions={
          <ButtonGroup alignment={ButtonGroupAlignment.right}>
            <Button
              color={ButtonColor.secondary}
              onClick={() => onClose(false)}
            >
              CANCEL
            </Button>
            <Button
              disabled={isUnchanged}
              isLoading={isSaving}
              onClick={handleSave}
            >
              SAVE
            </Button>
          </ButtonGroup>
        }
      />
    </Modal>
  );
}
