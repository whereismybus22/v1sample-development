function filterData(data) {
  const institutionData = data.find((entry) => entry.title === "mlrit.whereismybus@gmail.com");
  if (!institutionData) return null;

  const item = institutionData.items.find((item) => item.id === 477);
  if (!item) return null;

  const { lat, lng, speed } = item;
  return { lat, lng, speed };
}