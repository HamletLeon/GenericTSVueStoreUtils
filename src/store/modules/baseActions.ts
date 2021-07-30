import { BaseRepository } from '@hamletleon/generictsaxiosutils/dist/repositories/modules/core/baseRepository'
import {
  ByIdCriteria,
  IId,
  Paged,
  PagedCriteria,
  StoreCriteria,
  StoreCriteriaMethods,
} from '@hamletleon/generictypescriptutils'
import { BareActionContext } from 'vuex-typex'

export interface BaseActions<
  TState,
  TRootState,
  TId,
  TModel extends IId<TId>,
  TPagedCriteria extends PagedCriteria
> {
  getPaged: (
    ctx: BareActionContext<TState, TRootState>,
    model: StoreCriteria<TPagedCriteria, Paged<TModel>>
  ) => Promise<void>
  getById: (
    ctx: BareActionContext<TState, TRootState>,
    model: StoreCriteria<ByIdCriteria<TId>, TModel>
  ) => Promise<void>
}

export function BaseActionsImpl<
  TState,
  TRootState,
  TId,
  TModel extends IId<TId>,
  TPagedCriteria extends PagedCriteria
>(
  /*TODO: base mutations*/ repository: BaseRepository<
    TId,
    TModel,
    TPagedCriteria
  >
): BaseActions<TState, TRootState, TId, TModel, TPagedCriteria> {
  type BaseActionContext = BareActionContext<TState, TRootState>
  return {
    async getPaged(
      ctx: BaseActionContext,
      model: StoreCriteria<TPagedCriteria, Paged<TModel>>
    ) {
      const requestResult = await repository.getPaged(model.criteria)
      StoreCriteriaMethods.ProcessResponse(model, requestResult) // TODO: generic base mutations implementation
    },
    async getById(
      ctx: BaseActionContext,
      model: StoreCriteria<ByIdCriteria<TId>, TModel>
    ) {
      const requestResult = await repository.getById(
        model.criteria.id || ((0 as unknown) as TId),
        model.criteria.criteria
      )
      StoreCriteriaMethods.ProcessResponse(model, requestResult) // TODO: generic base mutations implementation
    },
  }
}
