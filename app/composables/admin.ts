export const useAdmin = () => {
  const isAdmin = useState<boolean>('admin:is-admin', () => false);
  const setAdmin = (value = true) => {
    isAdmin.value = value;
    localStorage.setItem('admin:is-admin', String(isAdmin.value));
  };
  onMounted(() => {
    isAdmin.value = localStorage.getItem('admin:is-admin') === 'true';
  });
  return { isAdmin: readonly(isAdmin), setAdmin };
};
