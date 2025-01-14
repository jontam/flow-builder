import {
  IContext,
  IResource,
  IResourceValue,
  IResourceValue as IResourceDefinitionVariantOverModes,
  SupportedContentType,
  SupportedMode,
} from '@floip/flow-runner'
import {ValidationException} from '@floip/flow-runner/src/domain/exceptions/ValidationException'
import {cloneDeep, defaults, difference, find, findIndex, first, isEmpty, isEqual, keyBy, map, pick, without} from 'lodash'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IFlowsState} from '@/store/flow/index'
import {IRootState} from '@/store'

export const getters: GetterTree<IFlowsState, IRootState> = {
  resourcesByUuid: ({resources}) => keyBy(resources, 'uuid'),
}

export const mutations: MutationTree<IFlowsState> = {
  resource_add({resources}, {resource}: { resource: IResource }) {
    resources.push(resource)
  },

  // currently unused - see todo
  resource_delete({resources}, {resourceId}: { resourceId: string }) {
    // TODO - we need an action that can clean resources and then call this to actuall remove. We need logic to truly check resources are unused
    const resourceIndex = findIndex(resources, (resource) => resource.uuid === resourceId)
    resources.splice(resourceIndex, 1)
  },

  resource_createVariant(state, {resourceId, variant}: { resourceId: string, variant: IResourceDefinitionVariantOverModes }) {
    // append to resource
    findResourceWith(resourceId, state as unknown as IContext)
      .values
      .push(cloneDeep(variant))
  },

  resource_setValue(
    state,
    {resourceId, filter, value}: { resourceId: string, filter: IResourceDefinitionVariantOverModesFilter, value: string },
  ) {
    findResourceVariantOverModesWith(resourceId, filter, state as unknown as IContext)
      .value = value || ''
  },

  // @note -- modes in this case does not tighten filter, but rather exists solely for update operation
  resource_setModes(
    state,
    {resourceId, filter, modes}:
      { resourceId: string, filter: IResourceDefinitionVariantOverModesFilter } & { modes: SupportedMode[] },
  ) {
    if (isEmpty(modes)) {
      // todo: create type that requires both resourceId & modes with (N>1) entries
      throw new ValidationException('`mode` is required to assign mode on `IResourceDefinitionVariantOverModes`.')
    }

    // todo: this should likely validate whether or not we're intersecting with other variants with this operation
    //       eg. variants: [{modes: [a, b]}, {modes: [c]}] => variants[0].modes = [c]

    findResourceVariantOverModesWith(resourceId, filter, state as unknown as IContext)
      .modes = modes
  },
}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async resource_createWith(_context, {props}: { props: { uuid: string } & Partial<IResource> }): Promise<IResource> {
    return {
      ...defaults(
        props,
        {values: []},
      ),
    }
  },

  resource_setOrCreateValueModeSpecific(
    {commit, dispatch, state},
    {resourceId, filter, value}: { resourceId: IResource['uuid'], filter: IResourceDefinitionVariantOverModes, value: string },
  ) {
    try {
      // @note - `find()` raises when absent; this verifies its presence
      findResourceVariantOverModesWith(resourceId, filter, state as unknown as IContext)
      dispatch('resource_setValueModeSpecific', {resourceId, filter, value})
    } catch (e) {
      if (!(e instanceof ValidationException)) {
        throw e
      }

      commit('resource_createVariant', {resourceId, variant: Object.assign(cloneDeep(filter), {value})})
    }
  },

  resource_setValueModeSpecific(
    {commit, state},
    {
      resourceId,
      filter,
      value,
    }: { resourceId: string, filter: IResourceDefinitionVariantOverModes } & { value: string, mode: SupportedMode },
  ) {
    // find resource variant over modes
    const
      mode = first(filter.modes)
    const variant = findResourceVariantOverModesWith(resourceId, filter, state as unknown as IContext)

    // need to disambiguate b/c value is spread over multiple modes

    if (variant.modes.length > 1) {
      // remove mode from existing variant
      commit('resource_setModes', {
        resourceId,
        filter: variant,
        modes: without(variant.modes, mode),
      })

      // generate new variant-over-modes with single targeted mode

      //
      commit('resource_createVariant', {
        resourceId,
        variant: Object.assign(
          cloneDeep(variant),
          {modes: [mode], value},
        ),
      })

      // specialized case, we're done here

      return
    }

    commit('resource_setValue', {resourceId, filter: variant, value})
  },
}

export type IResourceDefinitionVariantOverModesFilter = Partial<IResourceDefinitionVariantOverModes>
export type IResourceDefinitionVariantOverModesFilterAsKey = Omit<IResourceDefinitionVariantOverModes, 'value'>

export type IResourceDefinitionVariantOverModesFilterWithResourceId =
  Partial<IResourceDefinitionVariantOverModes> & { resourceId: string }

export function findResourceWith(uuid: string, {resources}: IContext): IResource {
  const resource = find(resources, {uuid})
  if (resource == null) {
    throw new ValidationException(`Unable to find resource on context: ${uuid} in ${map(resources, 'uuid')}`)
  }

  return resource
}

export function findResourceVariantOverModesWith(
  uuid: string,
  filter: IResourceDefinitionVariantOverModesFilter,
  {resources}: IContext,
): IResourceDefinitionVariantOverModes {
  return findResourceVariantOverModesOn(
    findResourceWith(uuid, {resources} as IContext),
    filter,
  )
}

export function findResourceVariantOverModesOn(
  resource: IResource,
  filter: IResourceDefinitionVariantOverModesFilter,
): IResourceValue {
  // b/c we do explicit partial matching on modes
  // why do we do partial matching on modes?

  // todo: is there a way that we could do an inclusive+additive search here?
  // todo: the goal here would be to be able to do something like:
  //       resource: {values: [
  //             {modes: [...flow.modes], contentType: contentType, ...}
  //       ]}
  //      the equivalent of the above— This would provide us the ability to then toggle

  const keysForComparison = without(Object.keys(filter), 'modes')
  const filterWithComparatorKeys = pick(filter, keysForComparison)
  const variant = find<IResourceDefinitionVariantOverModes>(
    resource.values,
    (v) => isEqual(filterWithComparatorKeys, pick(v, keysForComparison))
      && difference(filter.modes, v.modes).length === 0,
  )

  if (variant == null) {
    throw new ValidationException(`Unable to find resource variant (over modes) on context: (
      ${resource.uuid},
      ${JSON.stringify(filter)}) in
        ${JSON.stringify(map(resource.values, (v) => pick(v, keysForComparison)))}`)
  }

  return variant
}

export function findOrGenerateStubbedVariantFor(
  resourceId: string,
  filter: IResourceDefinitionVariantOverModesFilterAsKey,
  {resources}: IContext,
): IResourceDefinitionVariantOverModes {
  return findOrGenerateStubbedVariantOn(
    findResourceWith(resourceId, {resources} as unknown as IContext),
    filter,
  )
}

export function findOrGenerateStubbedVariantOn(
  resource: IResource,
  filter: IResourceDefinitionVariantOverModesFilterAsKey,
): IResourceDefinitionVariantOverModes {
  try {
    return findResourceVariantOverModesOn(resource, filter)
  } catch (e) {
    if (!(e instanceof ValidationException)) {
      throw e
    }

    return Object.assign(cloneDeep(filter), {value: ''})
  }
}

export function discoverContentTypesFor(mode: SupportedMode, resource?: IResource): SupportedContentType[] | undefined {
  const {TEXT, AUDIO, IMAGE, VIDEO} = SupportedContentType

  // @note -- contentType order inadvertently determines render order on UI.
  const defaultModeMappings: { [key in SupportedMode]?: SupportedContentType[] } = {
    // voice
    [SupportedMode.IVR]: [AUDIO],
    [SupportedMode.SMS]: [TEXT],
    [SupportedMode.USSD]: [TEXT],
    // clipboard
    [SupportedMode.OFFLINE]: [TEXT, IMAGE, VIDEO],
    // social
    [SupportedMode.RICH_MESSAGING]: [TEXT, IMAGE, VIDEO],
  }

  if (!resource || !resource.values.length) {
    return defaultModeMappings[mode]
  }
  let contentTypeOverrides: { [key in SupportedMode]?: string[] } = {}
  // TODO - think harder about this - what happens when a mode has a non standard content type - e.g. ivr on a log block
  // What happens in a future localised resource world on things like LogBlock? Do we need a log resource value for every language?
  contentTypeOverrides = resource.values.reduce((contentTypeOverrides, value) => {
    value.modes.reduce((contentTypeOverrides, resourceMode) => {
      if (!contentTypeOverrides[resourceMode]) {
        contentTypeOverrides[resourceMode] = []
      }
      contentTypeOverrides[resourceMode]!.push(value.content_type)
      return contentTypeOverrides
    }, contentTypeOverrides)
    return contentTypeOverrides
  }, contentTypeOverrides)
  return Object.assign(defaultModeMappings, contentTypeOverrides)[mode]
}
