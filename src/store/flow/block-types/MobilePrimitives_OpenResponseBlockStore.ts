import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlockExit} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {IOpenResponseBlock} from '@floip/flow-runner/src/model/block/IOpenResponseBlock'
import {defaultsDeep} from 'lodash'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'MobilePrimitives.OpenResponse'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async setMaxDurationSeconds({commit, rootGetters}, newDuration: number) {
    const activeBlock = rootGetters['builder/activeBlock']
    commit('flow/block_updateConfigByKey', {
      blockId: activeBlock.uuid,
      key: 'ivr',
      value: {
        max_duration_seconds: newDuration,
      },
    }, {root: true})
    return newDuration
  },
  async setMaxResponseCharacters({commit, rootGetters}, newLength: number) {
    const activeBlock = rootGetters['builder/activeBlock']
    const value = {
      max_response_characters: newLength,
    }
    commit('flow/block_updateConfigByKey', {
      blockId: activeBlock.uuid,
      key: 'text',
      value,
    }, {root: true})
    return value
  },
  async createWith({dispatch, commit}, {props}: { props: { uuid: string } & Partial<IOpenResponseBlock> }) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          name: 'Default',
        }) as IBlockExit,
      }, {root: true}),
      await dispatch('flow/block_createBlockExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          name: 'Error',
        }) as IBlockExit,
      }, {root: true}),
    ]

    const blankResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    commit('flow/resource_add', {resource: blankResource}, {root: true})

    return defaultsDeep(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semantic_label: '',
      exits,
      config: {
        prompt: blankResource.uuid,
      },
      tags: [],
    })
  },
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
