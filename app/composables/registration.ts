import { useModal } from 'vue-final-modal';
import ModalRegistration from '~/components/ModalRegistration.vue';

type ClickSource = 'post-buttons' | 'post-image' | 'subscription' | 'registration-cta' | 'author-follow' | 'author-more' | 'navbar';

export const useRegistration = () => {
  const { open, close } = useModal({
    component: ModalRegistration,
    attrs: {
      onConfirm() {
        umTrackEvent('registration.confirm');
        window.location.assign('/register');
      },
      onClose() {
        close();
      },
    },
  });
  const trackedOpen = (source: ClickSource) => {
    umTrackEvent(`registration.open`, { clicked: source });
    open();
  }
  return { trackedOpen, close };
};
