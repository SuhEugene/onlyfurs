import { useModal } from "vue-final-modal";
import ModalRegistration from "~/components/ModalRegistration.vue";

export const useRegistration = () => {
  const { open, close } = useModal({
    component: ModalRegistration,
    attrs: {
      onConfirm() {
        window.location.assign('/register');
      },
      onClose() {
        close();
      }
    },
  });
  return { open, close };
}
