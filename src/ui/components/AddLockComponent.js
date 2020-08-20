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
      site: this.sites.find(it => it.id === this.selectedSite)?.title,
      door: this.inputDoorIdentificator,
      type: this.lockTypes.find(it => it.id === this.selectedLockType)?.type,
      is_enabled: true,
      timeout: this.timeout * 1000,
      relay_in: this.selectedRelayIn > -1 ? this.relays.find(it => it.id === this.selectedRelayIn)?.id : null,
      relay_out: this.selectedRelayOut > -1 ? this.relays.find(it => it.id === this.selectedRelayOut)?.id : null
    }

    try {
      this.addButtonStateLoading = true
      const addedLock = await LocksStore.addLock(addingLock)
      LocksStore.loadLocks()

      this.reset()

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
      /** @type {Required<{ message: string, status: 'success' | 'info' | 'error' }>} */
      const msg = {
        message: '',
        status: 'error'
      }

      switch (err.response?.data?.error?.title) {
        case 'QueryFailedError': {
          if (err.response?.data?.error?.detail.startsWith('SQLITE_CONSTRAINT: UNIQUE constraint failed')) {
            msg.message = this.$vuetify.lang.t('$vuetify.notifications.door_add_failed_exist', `${addingLock.site}-${addingLock.door}`)
          }

          break
        }

        default: {
          msg.message = this.$vuetify.lang.t('$vuetify.notifications.door_add_failed', `${addingLock.site}-${addingLock.door}`, err.message)
        }
      }

      NotificationStore.showMessage(msg)
    } finally {
      this.addButtonStateLoading = false
    }
  }

  reset () {
    this.selectedSite = -1
    this.inputDoorIdentificator = ''
    this.selectedRelayIn = -1
    this.selectedRelayOut = -1
    this.timeout = 3

    if (this.lockTypes.length === 1) {
      this.onLockTypesFilled(this.lockTypes)
    } else {
      this.selectedLockType = -1
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

  get selectedSimpleLockType () {
    return this.selectedLockType <= 0
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
