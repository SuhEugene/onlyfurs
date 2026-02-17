export const useAdmin = () => {
  const isAdmin = useState<boolean>('admin:is-admin', () => false);
  const setAdmin = () => {
    isAdmin.value = true;
    localStorage.setItem('admin:is-admin', 'true');
  };
  onMounted(() => {
    isAdmin.value = localStorage.getItem('admin:is-admin') === 'true';
  });
  return { isAdmin: readonly(isAdmin), setAdmin };
};
