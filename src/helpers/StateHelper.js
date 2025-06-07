class StateHelper {
  constructor (states) {
    this.states = states
  }

  getName (state) {
    if (state in this.states) {
      return this.states[state]
    } else {
      return false
    }
  }

  getAll () {
    let statesArr = []

    Object.keys(this.states).forEach((state) => {
      statesArr.push({
        key: state,
        label: this.states[state]
      })
    })

    return statesArr
  }

  getByKeys (keys) {
    if (!keys || keys.length < 1) {
      return []
    }

    let discovered = []

    keys.forEach((key) => {
      if (key in this.states) {
        discovered.push({
          key: key,
          label: this.states[key]
        })
      }
    })

    return discovered
  }
}

export default StateHelper
