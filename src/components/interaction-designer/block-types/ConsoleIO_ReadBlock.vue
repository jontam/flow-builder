<template>
  <div class="console-io-read-block">
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

      <hr>

      <!--Specific config-->
      <block-format-string-editor
        :block="block"
        @commitFormatStringChange="setFormatString" />

      <div>
        <h6>{{ 'flow-builder.destination-variable' | trans }}</h6>
        <div
          v-for="(variableStringFormat,i) in destinationVariablesFields"
          :key="i"
          class="form-group">
          <validation-message
            #input-control="{ isValid }"
            :message-key="`block/${block.uuid}/config/destination_variables/${i}`">
            <text-editor
              :label="''"
              :placeholder="'flow-builder.destination-variable-placeholder' | trans"
              :valid-state="isValid"
              value=""
              @keydown="filterVariableName"
              @input="updatedestinationVariables($event, i)" />
          </validation-message>
        </div>
      </div>

      <hr>

      <block-output-branching-config
        :block="block"
        :has-exit-per-choice="false" />

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

import {IFlow} from '@floip/flow-runner'
import {IReadBlock} from '@floip/flow-runner/src/model/block/IReadBlock'
import TextEditor from '@/components/common/TextEditor.vue'
import ReadStore, {BLOCK_TYPE} from '@/store/flow/block-types/ConsoleIO_ReadBlockStore'
import Lang from '@/lib/filters/lang'
import Categorization from '@/components/interaction-designer/block-editors/Categorization.vue'
import {createDefaultBlockTypeInstallerFor} from '@/store/builder'
import {mixins} from 'vue-class-component'
import ValidationMessage from '@/components/common/ValidationMessage.vue'
import BlockOutputBranchingConfig from '@/components/interaction-designer/block-editors/BlockOutputBranchingConfig.vue'
import ResourceEditor from '../resource-editors/ResourceEditor.vue'
import BlockNameEditor from '../block-editors/NameEditor.vue'
import BlockLabelEditor from '../block-editors/LabelEditor.vue'
import BlockSemanticLabelEditor from '../block-editors/SemanticLabelEditor.vue'
import BlockFormatStringEditor from '../block-editors/FormatStringEditor.vue'
import FirstBlockEditorButton from '../flow-editors/FirstBlockEditorButton.vue'
import BlockId from '../block-editors/BlockId.vue'
import GenericContactPropertyEditor from '../block-editors/GenericContactPropertyEditor.vue'

const blockVuexNamespace = namespace(`flow/${BLOCK_TYPE}`)
const builderVuexNamespace = namespace('builder')

@Component({
  components: {
    GenericContactPropertyEditor,
    ResourceEditor,
    BlockNameEditor,
    BlockLabelEditor,
    BlockSemanticLabelEditor,
    BlockFormatStringEditor,
    FirstBlockEditorButton,
    TextEditor,
    BlockId,
    ValidationMessage,
    Categorization,
    BlockOutputBranchingConfig,
  },
})
class ConsoleIO_ReadBlock extends mixins(Lang) {
  @Prop() readonly declare block: IReadBlock

  @Prop() readonly declare flow: IFlow

  showSemanticLabel = false

  filterVariableName(e: any) {
    if (e.key.match(/\W+|Enter/g)) {
      e.preventDefault()
    }
  }

  updatedestinationVariables(value: string, i: number) {
    this.editDestinationVariable({variableName: value, keyIndex: i})
  }

  @blockVuexNamespace.Action declare setFormatString: (newFormatString: string) => Promise<string>

  @blockVuexNamespace.Action declare editDestinationVariable: ({
    variableName,
    keyIndex,
  }: { variableName: string, keyIndex: number }) => Promise<string[]>

  @blockVuexNamespace.Getter declare destinationVariablesFields: () => Promise<string[]>

  @builderVuexNamespace.Getter declare isEditable: boolean
}

export default ConsoleIO_ReadBlock
export const install = createDefaultBlockTypeInstallerFor(BLOCK_TYPE, ReadStore)
</script>
