export default function geoReq() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocaiton API not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (data) => {
        const { latitude, longitude } = data.coords;
        resolve(`[${latitude}, ${longitude}]`);
      },
      (err) => reject(err),
      { enableHighAccuracy: true },
    );
  });
}
