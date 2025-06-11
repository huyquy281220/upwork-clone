// import {
//   ChangeHourlyRateData,
//   EducationData,
//   LanguageData,
// } from "@/types/modals";
import { useCallback, useState } from "react";

type ModalState =
  | { type: null }
  | { type: "addLanguage" }
  | { type: "editLanguage" }
  | { type: "addEducation" }
  | { type: "editEducation" }
  | { type: "title" }
  | { type: "profileOverview" }
  | { type: "availability" };

export const useModalManager = () => {
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
  });

  const openModal = useCallback(
    <T extends Exclude<ModalState["type"], null>>(modalType: T) => {
      setModalState({ type: modalType });
    },
    []
  );

  const closeModal = useCallback(() => {
    setModalState({ type: null });
  }, []);

  const isModalOpen = useCallback(
    (modalType: Exclude<ModalState["type"], null>) => {
      return modalState.type === modalType;
    },
    [modalState.type]
  );

  return {
    modalState,
    openModal,
    closeModal,
    isModalOpen,
  };
};
