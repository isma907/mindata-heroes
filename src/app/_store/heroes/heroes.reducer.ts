import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { HeroesStore } from '../../_interfaces/hero.interface';
import * as heroesActions from './heroes.actions';

const initialState: HeroesStore = {
  list: [],
};

const _heroesReducer = createReducer(
  initialState,
  on(heroesActions.loadHeroes, (state: HeroesStore): HeroesStore => {
    const newVal = { ...state };
    return newVal;
  }),

  on(
    heroesActions.loadHeroesSuccess,
    (state: HeroesStore, action): HeroesStore => {
      const newVal = { ...state };
      newVal.list = action.payload;
      return newVal;
    },
  ),

  on(heroesActions.addHero, (state: HeroesStore, action): HeroesStore => {
    const newVal = { ...state };
    newVal.list = [...newVal.list];
    newVal.list.unshift(action.hero);
    return newVal;
  }),

  on(heroesActions.updateHero, (state: HeroesStore, action): HeroesStore => {
    const { hero } = action;
    return {
      ...state,
      list: state.list.map((item) => {
        if (item._id === hero._id) {
          return { ...hero };
        } else {
          return item;
        }
      }),
    };
  }),

  on(heroesActions.removeHero, (state: HeroesStore, action): HeroesStore => {
    const { hero } = action;
    const newVal = { ...state };
    newVal.list = newVal.list.filter((item) => item._id !== hero._id);
    return newVal;
  }),
);

export const heroesReducer: ActionReducer<HeroesStore, Action> = (
  state = initialState,
  action: Action,
) => {
  return _heroesReducer(state, action);
};
