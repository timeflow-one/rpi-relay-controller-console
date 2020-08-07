import { Component, Vue, Watch } from 'vue-property-decorator'
import LocksStore from '@/store/LocksStore'
import RelaysStore from '@/store/RelaysStore'
import { BackendProvider } from '@/api/providers/BackendProvider'
import SitesStore from '@/store/SitesStore'

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
    try {
      this.addButtonStateLoading = true
      await LocksStore.addLock({
        // @ts-ignore
        site: this.sites.find(it => it.id === this.selectedSite).name,
        door: this.inputDoorIdentificator,
        // @ts-ignore
        type: this.lockTypes.find(it => it.id === this.selectedLockType).type,
        is_enabled: true,
        timeout: this.timeout * 1000,
        relay_in: this.relays.find(it => it.id === this.selectedRelayIn)?.id,
        relay_out: this.relays.find(it => it.id === this.selectedRelayOut)?.id
      })
    } catch (err) {
      // TODO (2020.08.07): Add alert with message
      throw new Error('Not implemented')
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
