import { Component, Vue } from 'vue-property-decorator'
import PreferencesStore from '@/store/PreferencesStore'
import NotificationStore from '@/store/NotificationStore'

@Component
export default class ConfigsView extends Vue {
  checkTokenProgress = false

  /** @type {string | null} */
  _token = null

  _tokenValid = false

  created () {
    this._token = PreferencesStore.token
  }

  async save () {
    PreferencesStore.setToken(this._token)
    PreferencesStore.setConfigured(this._tokenValid)
    await PreferencesStore.save()

    NotificationStore.showMessage({
      message: this.$vuetify.lang.t('$vuetify.notifications.settings_saved'),
      status: 'success'
    })

    const lockRoute = this.$router.options.routes?.find(it => it.name === 'locks')
    location.replace(String(lockRoute?.path))
  }

  get saveButtonEnabled () {
    return PreferencesStore.configured && PreferencesStore.token !== this._token
  }

  /**
   * @param {string} value
   */
  async onTokenChanged (value) {
    if (value.length > 0) {
      /** @type {Required<{ message: string, status: 'success' | 'info' | 'error' }>} */
      const msg = {
        message: '',
        status: 'success'
      }

      try {
        this.checkTokenProgress = true
        await PreferencesStore.checkToken(value)

        msg.message = this.$vuetify.lang.t('$vuetify.notifications.token_valid')
        msg.status = 'success'

        this._tokenValid = true
      } catch (err) {
        switch (err.response?.data?.error?.title) {
          default: {
            msg.message = this.$vuetify.lang.t('$vuetify.notifications.token_error_checking')
            msg.status = 'error'

            this._tokenValid = false
          }
        }
      } finally {
        NotificationStore.showMessage(msg)

        this.checkTokenProgress = false
      }
    }
  }
}
