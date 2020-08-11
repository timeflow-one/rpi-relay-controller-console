import { Component, Vue } from 'vue-property-decorator'
import AddLockComponent from '@/ui/components/AddLockComponent.vue'
import LocksTableComponent from '@/ui/components/LocksTableComponent.vue'
import PreferencesStore from '@/store/PreferencesStore'
import RelaysStore from '@/store/RelaysStore'
import LocksStore from '@/store/LocksStore'

@Component({
  components: {
    AddLockComponent,
    LocksTableComponent
  }
})
export default class LocksView extends Vue {
  expanded = false

  get hasConnected () {
    return RelaysStore.relays.length > 0 && LocksStore.types.length > 0
  }

  get hasInit () {
    return PreferencesStore.configured
  }
}
