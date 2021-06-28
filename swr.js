// stale while revalidate with localstorage

const MONTH = 2629800;

function swr (key, fetcher, callback, age = MONTH) {
  const swrData = getData();
  let cachedData = swrData[key];

  if (cachedData) {
    const diff = Date.now() / 1000 - cachedData.updateDate;

    if (diff > age) {
      cachedData = {};
    }
  }

  fetcher().then(response => {
    setData(key, response);
    callback(response);
  });

  return cachedData?.data;
}

function getData() {
  return JSON.parse( localStorage.getItem('swr') ) || {};
}

function setData(key, data) {
  const swrData = getData();

  swrData[key] = {
    data,
    updateDate: Date.now() / 1000,
  };
  localStorage.setItem('swr', JSON.stringify(swrData));
}
