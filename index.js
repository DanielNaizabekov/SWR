const response = swr(
  'requestName',
  async () => {
    await new Promise(r => setTimeout(r, 2000))

    return {
      data: new Date().getSeconds(),
    }
  },
  (response) => {
    console.log('response', response);
  },
  10
)

console.log('response', response);