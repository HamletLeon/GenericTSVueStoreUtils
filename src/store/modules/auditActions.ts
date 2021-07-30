import { AuditableRepository } from '@hamletleon/generictsaxiosutils'
import {
  IId,
  PagedCriteria,
  StoreCriteria,
  StoreCriteriaMethods,
} from '@hamletleon/generictypescriptutils'
import { BareActionContext } from 'vuex-typex'
import { SaveableActions, SaveableActionImpl } from './saveableActions'

export interface AuditActions<
  TState,
  TRootState,
  TId,
  TModel extends IId<TId>,
  TPagedCriteria extends PagedCriteria,
  TCreationCriteria,
  TEditionCriteria extends IId<TId>
>
  extends SaveableActions<
    TState,
    TRootState,
    TId,
    TModel,
    TPagedCriteria,
    TCreationCriteria,
    TEditionCriteria
  > {
  disable: (
    ctx: BareActionContext<TState, TRootState>,
    model: StoreCriteria<TId, TModel>
  ) => Promise<void>
}

export function AuditActionsImpl<
  TState,
  TRootState,
  TId,
  TModel extends IId<TId>,
  TPagedCriteria extends PagedCriteria,
  TCreationCriteria,
  TEditionCriteria extends IId<TId>
>(
  repository: AuditableRepository<
    TId,
    TModel,
    TPagedCriteria,
    TCreationCriteria,
    TEditionCriteria
  >
): AuditActions<
  TState,
  TRootState,
  TId,
  TModel,
  TPagedCriteria,
  TCreationCriteria,
  TEditionCriteria
> {
  type AuditActionContext = BareActionContext<TState, TRootState>
  const saveableActionImpl = SaveableActionImpl<
    TState,
    TRootState,
    TId,
    TModel,
    TPagedCriteria,
    TCreationCriteria,
    TEditionCriteria
  >(repository)
  return {
    ...saveableActionImpl,
    async disable(ctx: AuditActionContext, model: StoreCriteria<TId, TModel>) {
      const requestResult = await repository.disable(model.criteria)
      StoreCriteriaMethods.ProcessResponse(model, requestResult)
    },
  }
}
