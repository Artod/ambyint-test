class R2D2Adventure {
  constructor(maxX = 100, maxY = 100) {
    this._MAX = {x: maxX, y: maxY}
    this._DIRS = ['East', 'North', 'West', 'South']
    this._isLanded = false
    this._posR2 = {x: null, y: null, dir: null}
    this._posObi = {x: null, y: null}
  }

  get isLanded() {
    return this._isLanded
  }

  get isReached() {
    return this._isLanded &&
      this._posR2.x === this._posObi.x &&
      this._posR2.y === this._posObi.y
  }

  _getRandInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  land() {
    if (this._isLanded)
      return this

    this._posR2.x = this._getRandInt(this._MAX.x)
    this._posR2.y = this._getRandInt(this._MAX.y)
    this._posR2.dir = this._getRandInt(this._DIRS.length)

    this._posObi.x = this._getRandInt(this._MAX.x)
    this._posObi.y = this._getRandInt(this._MAX.y)

    this._isLanded = true

    return this
  }

  move(x = 1) {
    x = parseInt(x) || 0

    const axis = this._posR2.dir % 2 ? 'y' : 'x'
    const step = this._posR2.dir < 2 ? 1 : -1
    const newPos = this._posR2[axis] + step * x

    if (newPos >= this._MAX[axis] || newPos < 0)
      return this

    this._posR2[axis] = newPos

    return this
  }

  rotate(dir = 'left') {
    const step = (dir === 'left' ? 1 : -1)
    const newDir = (this._posR2.dir + step) % 4

    this._posR2.dir = newDir < 0 ? newDir + 4 : newDir

    return this
  }

  report() {
    if (!this._isLanded)
      return `R2-D2 has not landed yet`

    const {x: r2X, y: r2Y, dir: r2D} = this._posR2
    const {x: obX, y: obY} = this._posObi

    return `R2-D2 is at ${r2X},${r2Y} facing ${this._DIRS[r2D]} \nObi Wan Kenobi is at ${obX},${obY}`
  }
}

module.exports = R2D2Adventure
