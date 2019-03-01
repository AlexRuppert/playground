import Vue from 'vue'
import Vuex from 'vuex'
import { createVuexStore } from 'vuex-simple'
import { Module, State } from 'vuex-simple'
import { DerDieDasGame } from './modules/der-die-das-game'

Vue.use(Vuex)

export class Store {
  @Module()
  public derDieDasGame = new DerDieDasGame()

  @State()
  public version = '1.0.0'
}
const instance = new Store()
export default createVuexStore(instance, {
  strict: false,
  modules: {},
  plugins: [],
})
