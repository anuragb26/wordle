import { useState, useCallback } from "react";

type useModalReturnProps = [modalState: boolean, toggleModal: () => void];

const useModal = (): useModalReturnProps => {
  const [modalState, setModalState] = useState<boolean>(false);
  const toggleModal = useCallback(
    () => setModalState((modalState) => !modalState),
    [setModalState]
  );
  return [modalState, toggleModal];
};

export default useModal;
