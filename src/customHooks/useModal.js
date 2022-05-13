import { useState } from "react";

const useModal = () => {
  const [modalState, setModalState] = useState(false);
  const toggleModal = () => setModalState((modalState) => !modalState);
  return [modalState, toggleModal];
};

export default useModal;
