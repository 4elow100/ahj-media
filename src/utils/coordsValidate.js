export default function coordsValidate(data) {
  const cleanedData = String(data).replace(/\[|\]/g, '').trim();

  if (!/^[0-9.,\-\s]+$/.test(cleanedData)) {
    throw new Error('Координаты должны быть перечислены через запятую и содержать только цифры');
  }

  const coordsList = cleanedData.split(',');

  if (coordsList.length !== 2) {
    throw new Error('Неверное количество координат');
  }

  const latitude = parseFloat(coordsList[0].trim());
  const longitude = parseFloat(coordsList[1].trim());

  if (latitude < -90 || latitude > 90) {
    throw new Error('Широта должна быть от -90 до 90');
  }
  if (longitude < -180 || longitude > 180) {
    throw new Error('Долгота должна быть от -180 до 180');
  }

  return { latitude, longitude };
}
