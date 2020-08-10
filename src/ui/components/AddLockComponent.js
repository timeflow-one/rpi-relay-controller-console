import { Component, Vue, Watch } from 'vue-property-decorator'
import LocksStore from '@/store/LocksStore'
import RelaysStore from '@/store/RelaysStore'
import { BackendProvider } from '@/api/providers/BackendProvider'
import SitesStore from '@/store/SitesStore'
import NotificationStore from '@/store/NotificationStore'

@Component
export default class AddLockComponent extends Vue {
  apiProvider = new BackendProvider()
  selectedSite = -1
  selectedLockType = -1
  inputDoorIdentificator = ''
  selectedRelayIn = -1
  selectedRelayOut = -1
  timeout = 3
  addButtonStateLoading = false

  created () {
    this.onLockTypesFilled(this.lockTypes)
  }

  async addLock () {
    const addingLock = {
      site: this.sites.filter(it => it.id === this.selectedSite)[0].name,
      door: this.inputDoorIdentificator,
      type: this.lockTypes.filter(it => it.id === this.selectedLockType)[0].type,
      is_enabled: true,
      timeout: this.timeout * 1000,
      relay_in: this.relays.find(it => it.id === this.selectedRelayIn)?.id,
      relay_out: this.relays.find(it => it.id === this.selectedRelayOut)?.id
    }

    try {
      this.addButtonStateLoading = true
      const addedLock = await LocksStore.addLock(addingLock)
      LocksStore.loadLocks()

      NotificationStore.showMessage({
        message: this.$vuetify.lang.t(
          '$vuetify.notifications.door_added',
          addedLock.data.data.destination
            .split(String(process.env.VUE_APP_DOOR_SEPARATOR))
            .join('-')
        ),
        status: 'success'
      })
    } catch (err) {
      console.error(err)

      NotificationStore.showMessage({
        message: this.$vuetify.lang.t(
          '$vuetify.notifications.door_add_failed',
          `${addingLock.site}-${addingLock.door}`, err.message
        ),
        status: 'error'
      })
    } finally {
      this.addButtonStateLoading = false
    }
  }

  get sites () {
    return SitesStore.sites
  }

  get relays () {
    return RelaysStore.relays
  }

  get lockTypes () {
    return LocksStore.types.map(it => ({
      id: it.id,
      type: it.type,
      text: this.$vuetify.lang.t(`$vuetify.locks.type.${it.type}`)
    }))
  }

  get addButtonDisabled () {
    return this.selectedLockType < 0 || this.selectedSite < 0 || this.inputDoorIdentificator === '' || this.selectedRelayIn < 0
  }

  /**
   * @param {Array<import('@/models/LockTypeModel').LockTypeModel>} values
   */
  @Watch('lockTypes')
  onLockTypesFilled (values) {
    if (values.length === 1) {
      this.selectedLockType = values[0].id
    }
  }
}
