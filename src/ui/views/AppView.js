import { Component, Vue } from 'vue-property-decorator'
import AppBar from '@/ui/components/AppBar.vue'
import LocksStore from '@/store/LocksStore'
import RelaysStore from '@/store/RelaysStore'

@Component({
  components: {
    AppBar
  }
})
export default class AppView extends Vue {
  async created () {
    await Promise.all([
      LocksStore.loadTypes(),
      RelaysStore.loadRelays()
    ])
  }
}
