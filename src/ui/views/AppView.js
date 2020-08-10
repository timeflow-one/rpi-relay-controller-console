import { Component, Vue } from 'vue-property-decorator'
import AppBar from '@/ui/components/AppBar.vue'
import NotificationComponent from '@/ui/components/NotificationComponent.vue'
import PreferencesStore from '@/store/PreferencesStore'

@Component({
  components: {
    AppBar,
    NotificationComponent
  }
})
export default class AppView extends Vue {
  async created () {
    await PreferencesStore.loadPreferences()
  }
}
