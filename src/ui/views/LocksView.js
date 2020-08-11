import { Component, Vue } from 'vue-property-decorator'
import AddLockComponent from '@/ui/components/AddLockComponent.vue'
import LocksTableComponent from '@/ui/components/LocksTableComponent.vue'
import PreferencesStore from '@/store/PreferencesStore'

@Component({
  components: {
    AddLockComponent,
    LocksTableComponent
  }
})
export default class LocksView extends Vue {
  expanded = false

  get hasInit () {
    return PreferencesStore.configured
  }
}
