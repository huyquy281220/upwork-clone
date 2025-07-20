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
  | { type: "editEducation"; id: string }
  | { type: "title" }
  | { type: "availability" }
  | { type: "skills" }
  | { type: "hourlyRate" }
  | { type: "overview" }
  | { type: "edit-title" }
  | { type: "edit-description" }
  | { type: "edit-scope" }
  | { type: "edit-budget" }
  | { type: "edit-skills" }
  | { type: "image-upload" }
  | { type: "freelancer-details" }
  | { type: "verify-email" }
  | { type: "country" }
  | { type: "edit-account-info" };

export const useModalManager = () => {
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
  });

  const openModal = useCallback(
    <T extends Exclude<ModalState["type"], null>>(
      modalType: T,
      id?: string
    ) => {
      if (modalType === "editEducation") {
        setModalState({ type: modalType, id: id ?? "" });
      } else {
        setModalState({ type: modalType });
      }
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

  const getModalId = useCallback(() => {
    if (modalState.type === "editEducation") {
      return modalState.id;
    }
    return null;
  }, [modalState]);

  return {
    modalState,
    openModal,
    closeModal,
    isModalOpen,
    getModalId,
  };
};
