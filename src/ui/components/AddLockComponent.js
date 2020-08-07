import { Component, Vue, Watch } from 'vue-property-decorator'
import LocksStore from '@/store/LocksStore'
import RelaysStore from '@/store/RelaysStore'

@Component
export default class AddLockComponent extends Vue {
  selectedLockType = -1
  selectedSite = -1
  inputDoorIdentificator = ''
  selectedRelay = -1
  timeout = 3

  created () {
    this.onLockTypesFilled(this.lockTypes)
  }

  get sites () {
    return []
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
