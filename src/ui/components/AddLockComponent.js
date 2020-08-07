import { Component, Vue, Watch } from 'vue-property-decorator'
import LocksStore from '@/store/LocksStore'
import RelaysStore from '@/store/RelaysStore'

@Component
export default class AddLockComponent extends Vue {
  selectedLockType = -1
  selectedSite = -1
  inputDoorIdentificator = ''
  selectedRelay = -1

  async created () {
    await Promise.all([
      LocksStore.loadTypes(),
      LocksStore.loadLocks(),
      RelaysStore.loadRelays()
    ])
  }

  get sites () {
    return []
  }

  get relays () {
    return RelaysStore.relays
  }

  get lockTypes () {
    return LocksStore.types
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
