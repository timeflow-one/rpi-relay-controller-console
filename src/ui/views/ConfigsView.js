import { Component, Vue } from 'vue-property-decorator'
import PreferencesStore from '@/store/PreferencesStore'
import NotificationStore from '@/store/NotificationStore'

@Component
export default class ConfigsView extends Vue {
  checkTokenProgress = false

  /** @type {string | null} */
  _token = null

  created () {
    this._token = PreferencesStore.token
  }

  async save () {
    PreferencesStore.setToken(this._token)
    await PreferencesStore.save()

    NotificationStore.showMessage({
      message: this.$vuetify.lang.t('$vuetify.notifications.settings_saved'),
      status: 'success'
    })
  }

  get saveButtonEnabled () {
    return PreferencesStore.tokenAvailable && PreferencesStore.token !== this._token
  }

  /**
   * @param {string} value
   */
  async onTokenChanged (value) {
    if (value.length > 0) {
      try {
        this.checkTokenProgress = true
        await PreferencesStore.checkToken(value)

        NotificationStore.showMessage({
          message: this.$vuetify.lang.t('$vuetify.notifications.token_valid'),
          status: 'success'
        })

        PreferencesStore.setTokenAvailable(true)
      } catch (err) {
        switch (err.response?.data?.error?.title) {
          default: {
            NotificationStore.showMessage({
              message: this.$vuetify.lang.t('$vuetify.notifications.token_error_checking'),
              status: 'error'
            })

            PreferencesStore.setTokenAvailable(false)
          }
        }
      } finally {
        this.checkTokenProgress = false
      }
    }
  }
}
