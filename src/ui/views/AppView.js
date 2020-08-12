import { Component, Vue } from 'vue-property-decorator'
import AppBar from '@/ui/components/AppBar.vue'
import NotificationComponent from '@/ui/components/NotificationComponent.vue'
import PreferencesStore from '@/store/PreferencesStore'
import LocksStore from '@/store/LocksStore'
import RelaysStore from '@/store/RelaysStore'
import SitesStore from '@/store/SitesStore'
import NotificationStore from '@/store/NotificationStore'

@Component({
  components: {
    AppBar,
    NotificationComponent
  }
})
export default class AppView extends Vue {
  async created () {
    // set page title
    document.title = this.$vuetify.lang.t(`$vuetify.titles.${this.$route.name}`)
    this.$router.beforeEach((to, _, next) => {
      document.title = this.$vuetify.lang.t(`$vuetify.titles.${to.name}`)

      next()
    })

    await PreferencesStore.loadPreferences()

    if (PreferencesStore.configured) {
      /** @type {Required<{ message: string, status: 'success' | 'info' | 'error' }>} */
      const msg = {
        message: '',
        status: 'success'
      }

      try {
        await Promise.all([
          LocksStore.loadTypes(),
          LocksStore.loadLocks(),
          RelaysStore.loadRelays(),
          SitesStore.loadSites()
        ])

        msg.message = this.$vuetify.lang.t('$vuetify.notifications.locks_sync_success')
        msg.status = 'success'
      } catch (err) {
        msg.message = this.$vuetify.lang.t('$vuetify.notifications.locks_sync_failed')
        msg.status = 'error'
      } finally {
        NotificationStore.showMessage(msg)
      }
    }
  }
}
