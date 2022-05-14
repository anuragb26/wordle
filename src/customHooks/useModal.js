import { useState, useCallback } from "react";

const useModal = () => {
  const [modalState, setModalState] = useState(false);
  const toggleModal = useCallback(
    () => setModalState((modalState) => !modalState),
    [setModalState]
  );
  return [modalState, toggleModal];
};

export default useModal;
