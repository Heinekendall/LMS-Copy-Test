import * as React from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ModalsActions, ModalsSelectors } from "../../store/modals";
import ModalsMap from "./ModalsMap.tsx";

function ModalContainer() {
  const dispatch = useAppDispatch();
  const modalsStack = useAppSelector(ModalsSelectors.getModalsStack);

  const onClose = React.useCallback(
    (value?: unknown) => {
      dispatch(ModalsActions.closeModal(value));
    },
    [dispatch],
  );

  return (
    <>
      {modalsStack.map(({ data, id, type }) => (
        <ModalsMap key={id} type={type} data={data} onClose={onClose} />
      ))}
    </>
  );
}

export default ModalContainer;
