import { Component, Vue } from 'vue-property-decorator'
import AddLockComponent from '@/ui/components/AddLockComponent.vue'
import LocksTableComponent from '@/ui/components/LocksTableComponent.vue'
import LocksStore from '@/store/LocksStore'
import RelaysStore from '@/store/RelaysStore'
import SitesStore from '@/store/SitesStore'

@Component({
  components: {
    AddLockComponent,
    LocksTableComponent
  }
})
export default class LocksView extends Vue {
  expanded = false

  async created () {
    await Promise.all([
      LocksStore.loadTypes(),
      LocksStore.loadLocks(),
      RelaysStore.loadRelays(),
      SitesStore.loadSites()
    ])
  }
}
