export const useAdmin = () => {
  const adminToken = useState<string | null>('admin:adminToken', () => null);
  const setAdmin = (value: string | null) => {
    adminToken.value = value;
    if (!value) return localStorage.removeItem('admin:adminToken');
    localStorage.setItem('admin:adminToken', value);
  };
  onMounted(() => {
    adminToken.value = localStorage.getItem('admin:adminToken');
  });
  return {
    isAdmin: computed(() => Boolean(adminToken.value)),
    adminToken: readonly(adminToken),
    setAdmin,
  };
};
