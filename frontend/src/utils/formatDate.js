export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const now = new Date();

  const diffTime = now - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Hari ini";
  }

  if (diffDays === 1) {
    return "1 hari lalu";
  }

  return `${diffDays} hari lalu`;
};
