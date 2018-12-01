const R2Adv = require('./R2D2Adventure')

const MAX_X = 100
const MAX_Y = 100
const r2Adv = new R2Adv(MAX_X, MAX_Y)

test('init properties on instantiation', () => {
  expect(r2Adv._MAX).toEqual({x: MAX_X, y: MAX_Y})
  expect(r2Adv._DIRS).toEqual(['East', 'North', 'West', 'South'])
  expect(r2Adv._isLanded).toBe(false)
  expect(r2Adv._posR2).toEqual({x: null, y: null, dir: null})
  expect(r2Adv._posObi).toEqual({x: null, y: null})

  expect(r2Adv.isLanded).toBe(false)
  expect(r2Adv.isReached).toBe(false)
})

test('report before landing', () => {
  expect(r2Adv.report()).toBe(`R2-D2 has not landed yet`)
})

test('landing', () => {
  expect(r2Adv.land()).toBe(r2Adv)

  expect(r2Adv._posR2.x).not.toBeNull()
  expect(r2Adv._posR2.y).not.toBeNull()
  expect(r2Adv._posR2.dir).not.toBeNull()

  expect(r2Adv._posObi.x).not.toBeNull()
  expect(r2Adv._posObi.y).not.toBeNull()

  expect(r2Adv._isLanded).toBe(true)
  expect(r2Adv.isLanded).toBe(true)
})

test('rotate', () => {
  const prev = r2Adv._posR2.dir

  let newDir = (r2Adv._posR2.dir + 1) % 4
  r2Adv.rotate('left')
  expect(r2Adv._posR2.dir).toBe(newDir)

  r2Adv.rotate('right')
  expect(r2Adv._posR2.dir).toBe(prev)

  newDir = (r2Adv._posR2.dir - 1) % 4
  r2Adv.rotate('right')
  expect(r2Adv._posR2.dir).toBe(newDir < 0 ? newDir + 4 : newDir)

})

const rotateTo = dir => {
    while (r2Adv._posR2.dir !== dir) {
      r2Adv.rotate('left')
    }
}

test('move', () => {
  const prevX = r2Adv._posR2.x
  const prevY = r2Adv._posR2.y

  r2Adv.move('string')
  r2Adv.move(null)
  r2Adv.move(0)

  expect(r2Adv._posR2.x).toBe(prevX)
  expect(r2Adv._posR2.y).toBe(prevY)

  rotateTo(0)
  r2Adv.move(MAX_X)
  expect(r2Adv._posR2.x).toBe(prevX)

  rotateTo(1)
  r2Adv.move(MAX_Y)
  expect(r2Adv._posR2.y).toBe(prevY)

  rotateTo(r2Adv._posR2.x > r2Adv._posObi.x ? 2 : 0)
  r2Adv.move(Math.abs(r2Adv._posObi.x - r2Adv._posR2.x))
  expect(r2Adv._posR2.x).toBe(r2Adv._posObi.x)

  rotateTo(r2Adv._posR2.y > r2Adv._posObi.y ? 3 : 1)
  r2Adv.move(Math.abs(r2Adv._posObi.y - r2Adv._posR2.y))
  expect(r2Adv._posR2.y).toBe(r2Adv._posObi.y)

  expect(r2Adv.isReached).toBe(true)
})

test('report after landing', () => {
  const {x: r2X, y: r2Y, dir: r2D} = r2Adv._posR2
  const {x: obX, y: obY} = r2Adv._posObi

  expect(r2Adv.report()).toBe(`R2-D2 is at ${r2X},${r2Y} facing ${r2Adv._DIRS[r2D]} \nObi Wan Kenobi is at ${obX},${obY}`)
})
