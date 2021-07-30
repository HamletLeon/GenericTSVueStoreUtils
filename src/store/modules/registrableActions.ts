import { BaseActions, BaseActionsImpl } from './baseActions'
import { BareActionContext } from 'vuex-typex'
import {
  IId,
  PagedCriteria,
  StoreCriteria,
  StoreCriteriaMethods,
} from '@hamletleon/generictypescriptutils'
import { RegistrableRepository } from '@hamletleon/generictsaxiosutils'

export interface RegistrableActions<
  TState,
  TRootState,
  TId,
  TModel extends IId<TId>,
  TPagedCriteria extends PagedCriteria,
  TCreationCriteria
> extends BaseActions<TState, TRootState, TId, TModel, TPagedCriteria> {
  create: (
    ctx: BareActionContext<TState, TRootState>,
    model: StoreCriteria<TCreationCriteria, TModel>
  ) => Promise<void>
}

export function RegistrableActionImpl<
  TState,
  TRootState,
  TId,
  TModel extends IId<TId>,
  TPagedCriteria extends PagedCriteria,
  TCreationCriteria
>(
  repository: RegistrableRepository<
    TId,
    TModel,
    TPagedCriteria,
    TCreationCriteria
  >
): RegistrableActions<
  TState,
  TRootState,
  TId,
  TModel,
  TPagedCriteria,
  TCreationCriteria
> {
  type RegistrableContext = BareActionContext<TState, TRootState>
  const baseActionsImpl = BaseActionsImpl<
    TState,
    TRootState,
    TId,
    TModel,
    TPagedCriteria
  >(repository)
  return {
    ...baseActionsImpl,
    async create(
      ctx: RegistrableContext,
      model: StoreCriteria<TCreationCriteria, TModel>
    ) {
      const requestResult = await repository.create(model.criteria)
      StoreCriteriaMethods.ProcessResponse(model, requestResult)
    },
  }
}
