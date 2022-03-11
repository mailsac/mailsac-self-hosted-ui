module.exports = {
  async redirects() {
    return [
      {
        source: '/inbox',
        destination: '/',
        permanent: false,
      },
    ]
  },
}