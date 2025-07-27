import { useModal } from "vue-final-modal";
import ModalRegistration from "~/components/ModalRegistration.vue";

export const useRegistration = () => {
  const { open, close } = useModal({
    component: ModalRegistration,
    attrs: {
      onConfirm() { close() },
    },
  });
  return { open, close };
}
