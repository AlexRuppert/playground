import { Mutation, State, Getter } from 'vuex-simple'

export class DerDieDasGame {
  @State()
  public _counter: number

  constructor(nb: number = 0) {
    this._counter = nb
  }
  @Getter()
  public get counter() {
    return this._counter
  }

  @Mutation()
  public increment() {
    this._counter++
  }

  @Mutation()
  public incrementBy(nb: number) {
    this._counter += nb
  }

  public async asyncIncrement() {
    await new Promise(r => setTimeout(r, 200))
    // call mutation function like you would any other function
    this.increment()
  }
}
