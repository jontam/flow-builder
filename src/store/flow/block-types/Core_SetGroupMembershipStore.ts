import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlockExit, ISetGroupMembershipBlockConfig} from '@floip/flow-runner'
import {IdGeneratorUuidV4} from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import {defaultsDeep} from 'lodash'
import {IFlowsState} from '../index'

export interface IGroupOption {
  id: string,
  name: string,
}

export const ADD_KEY = 'add'
export const REMOVE_KEY = 'remove'

export const BLOCK_TYPE = 'Core.SetGroupMembership'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async createWith({dispatch}, {props}: { props: { uuid: string } & Partial<ISetGroupMembershipBlockConfig> }) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: await (new IdGeneratorUuidV4()).generate(),
          name: 'Default',
        }) as IBlockExit,
      }, {root: true}),
    ]

    return defaultsDeep(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semantic_label: '',
      config: {
        group_key: '',
        group_name: '',
        is_member: null,
      },
      exits,
      tags: [],
    })
  },

  async setIsMember({commit, rootGetters}, action) {
    const activeBlock = rootGetters['builder/activeBlock']
    let isMember = false
    if (action) {
      isMember = action.id === ADD_KEY
    }

    commit('flow/block_updateConfigByPath', {
      blockId: activeBlock.uuid,
      path: 'is_member',
      value: isMember,
    }, {root: true})
  },
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}
