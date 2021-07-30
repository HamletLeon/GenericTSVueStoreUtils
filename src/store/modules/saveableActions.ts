import { SaveableRepository } from '@hamletleon/generictsaxiosutils'
import {
  IId,
  PagedCriteria,
  StoreCriteria,
  StoreCriteriaMethods,
} from '@hamletleon/generictypescriptutils'
import { BareActionContext } from 'vuex-typex'
import { RegistrableActions, RegistrableActionImpl } from './registrableActions'

export interface SaveableActions<
  TState,
  TRootState,
  TId,
  TModel extends IId<TId>,
  TPagedCriteria extends PagedCriteria,
  TCreationCriteria,
  TEditionCriteria extends IId<TId>
>
  extends RegistrableActions<
    TState,
    TRootState,
    TId,
    TModel,
    TPagedCriteria,
    TCreationCriteria
  > {
  edit: (
    ctx: BareActionContext<TState, TRootState>,
    model: StoreCriteria<TEditionCriteria, TModel>
  ) => Promise<void>
}

export function SaveableActionImpl<
  TState,
  TRootState,
  TId,
  TModel extends IId<TId>,
  TPagedCriteria extends PagedCriteria,
  TCreationCriteria,
  TEditionCriteria extends IId<TId>
>(
  repository: SaveableRepository<
    TId,
    TModel,
    TPagedCriteria,
    TCreationCriteria,
    TEditionCriteria
  >
): SaveableActions<
  TState,
  TRootState,
  TId,
  TModel,
  TPagedCriteria,
  TCreationCriteria,
  TEditionCriteria
> {
  type SaveableContext = BareActionContext<TState, TRootState>
  const registrableActionImpl = RegistrableActionImpl<
    TState,
    TRootState,
    TId,
    TModel,
    TPagedCriteria,
    TCreationCriteria
  >(repository)
  return {
    ...registrableActionImpl,
    async edit(
      ctx: SaveableContext,
      model: StoreCriteria<TEditionCriteria, TModel>
    ) {
      const requestResult = await repository.edit(model.criteria)
      StoreCriteriaMethods.ProcessResponse(model, requestResult)
    },
  }
}
