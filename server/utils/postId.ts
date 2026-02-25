export const toPostString = (id: number) =>
  btoa('s' + String(id).padStart(3, '0') + 's').replaceAll('=', '');

export const fromPostString = (id: string) => {
  try {
    const idStr = atob(id);
    if (idStr.length < 3) return NaN;
    return parseInt(idStr.slice(1, -1), 10);
  } catch {
    return NaN;
  }
};
