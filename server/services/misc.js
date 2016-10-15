export const isObject = (obj) => obj === Object(obj)

export const contains = (list, elem) => list.indexOf(elem) > -1

export const hasProps = (obj, ...props) =>
  obj && [...props].every(prop => contains(Object.keys(obj), prop))
