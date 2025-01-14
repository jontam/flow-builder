<template>
  <div class="core-case-block">
    <h3 class="no-room-above">
      {{ 'flow-builder.edit-block-type' | trans({block_type: trans(`flow-builder.${block.type}`)}) }}
    </h3>

    <fieldset :disabled="!isEditable">
      <block-label-editor
        :block="block"
        @gearClicked="showSemanticLabel = !showSemanticLabel" />
      <block-semantic-label-editor
        v-if="showSemanticLabel"
        :block="block" />
      <block-name-editor :block="block" />

      <div
        v-for="(exit,i) in exits"
        class="form-group">
        <validation-message
          #input-control="{ isValid }"
          :message-key="`block/${block.uuid}/exits/${i}/test`">
          <expression-input
            class="d-flex m-0"
            :label="i+1"
            :placeholder="'flow-builder.enter-expression' | trans"
            :valid-state="isValid"
            :current-expression="exit.test"
            :expression-identifier="exit.uuid"
            @commitExpressionChange="editCaseBlockExit" />
        </validation-message>
      </div>

      <slot name="extras" />

      <categorization :block="block" />

      <generic-contact-property-editor :block="block" />

      <hr>

      <first-block-editor-button
        :flow="flow"
        :block-id="block.uuid" />

    </fieldset>

    <block-id :block="block" />
  </div>
</template>

<script lang="ts">
import {namespace} from 'vuex-class'
import {Component, Prop} from 'vue-property-decorator'
import {ICaseBlock} from '@floip/flow-runner/src/model/block/ICaseBlock'
import {IBlockExit, IFlow} from '@floip/flow-runner'
import ExpressionInput from '@/components/common/ExpressionInput.vue'
import CaseStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_CaseBlockStore'
import Lang from '@/lib/filters/lang'
import Categorization from '@/components/interaction-designer/block-editors/Categorization.vue'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import GenericContactPropertyEditor from '../block-editors/GenericContactPropertyEditor.vue'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    GenericContactPropertyEditor,
    ExpressionInput,
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    FirstBlockEditorButton,
    BlockId,
    ValidationMessage,
    Categorization,
  },
})
class Core_CaseBlock extends mixins(Lang) {
  @Prop() readonly block!: ICaseBlock

  @Prop() readonly flow!: IFlow

  showSemanticLabel = false

  get exits(): IBlockExit[] {
    return this.block.exits
  }

  @blockVuexNamespace.Action editCaseBlockExit!: ({exitId, value}: { exitId: string, value: string }) => Promise<IBlockExit>

  @builderVuexNamespace.Getter isEditable !: boolean
}

export default Core_CaseBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, CaseStore)
</script>
