import {Component, Vue} from 'vue-property-decorator'
import CaseBlock from '@/components/interaction-designer/block-types/Core_CaseBlock.vue'
import caseBlockStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import {namespace, State} from 'vuex-class'
import Vuex from 'vuex'
import {IRootState, store} from '@/store'
import {BaseMountedVueClass, IBaseOptions} from './story-utils/storeSetup'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)

Vue.use(Vuex)

export default {
  title: 'Core/Case Block Styled',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const CaseBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <case-block
      :block="activeBlock"
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`

const BaseOptions: IBaseOptions = {
  components: {CaseBlock, FlowBuilderSidebarEditorContainer},
  template: CaseBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

// default case block state
@Component({
  ...BaseOptions,
})
class DefaultClass extends BaseMountedVueClass {
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, caseBlockStore)
  }
}

export const Default = () => (DefaultClass)

//ExistingDataBlock
@Component({
  ...BaseOptions,
})
class CurrentClass2 extends BaseMountedVueClass {
  async mounted() {
    const {block} = await this.baseMounted(BLOCK_TYPE, caseBlockStore)
    const blockId = block.uuid

    this.setDescription(blockId)
    this.editCaseBlockExit({identifier: block.exits[0].uuid, value: 'A expression'})
    this.setTags(blockId)
  }

  @blockVuexNamespace.Action editCaseBlockExit: any
}

export const ExistingDataBlock = () => (CurrentClass2)
