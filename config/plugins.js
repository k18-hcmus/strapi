module.exports = ({ env }) => ({
  upload: {
    providerOptions: {
      localServer: {
        maxage: 300000
      }
    }
  },
  email: {
    provider: 'sendmail',
    settings: {
      defaultFrom: env('EMAIL', 'brothergang2021@gmail.com'),
      defaultReplyTo: env('EMAIL', 'brothergang2021@gmail.com')
    }
  }
})
