import { Component, Vue } from 'vue-property-decorator'
import AddLockComponent from '@/ui/components/AddLockComponent.vue'
import LocksTableComponent from '@/ui/components/LocksTableComponent.vue'

@Component({
  components: {
    AddLockComponent,
    LocksTableComponent
  }
})
export default class LocksView extends Vue {

}
