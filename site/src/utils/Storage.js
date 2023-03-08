import get from "lodash/get"

/**
 * Petit interface sessionStorage clé/valeur
 *
 * new Storage('scrollPosition')
 */

class Storage {
  items = {}
  key = null

  constructor(key) {
    this.key = key

    if (typeof sessionStorage !== "undefined") {
      this.items = JSON.parse(sessionStorage.getItem(this.key)) || {}
    }
  }

  get() {
    return this.items
  }

  getKey(key) {
    return get(this.items, key, 0)
  }

  set(key, value) {
    this.items = Object.assign(this.items, {
      [`${key}`]: value,
    })

    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(this.key, JSON.stringify(this.items))
    }
  }

  log() {
    console.log({
      key: this.key,
      items: this.items,
    })
  }
}

export default Storage
