import {
  constructFill,
  constructStroke,
  constructStyle,
  constructText,
  serializeFill,
  serializeStroke,
  serializeStyle,
  serializeText
} from './index.js'

const styleLike = {
  fill: {
    color: '#CCC666'
  },
  stroke: {
    color: '#666CCC',
    width: 2
  },
  text: {
    text: 'style text foo',
    fill: {
      color: '#FFF'
    },
    stroke: {
      color: '#333',
      width: 1
    }
  }
}

// 反序列化 javascript 对象为 ol.style.Style 实例
// deserialize javascript object into ol.style.Style instance
const olStyle = constructStyle(styleLike)

// 序列化 ol.style.Style 实例为 javascript 对象
// serialize ol.style.Style instance into javascript object
const styleLikeObj = serializeStyle(olStyle)

console.log('ol.style.Style', olStyle)
console.log('StyleLike', styleLikeObj)

const olFill = constructFill(styleLike.fill)

console.log('ol.style.Fill', olFill)
console.log('FillLike', serializeFill(olFill))

const olStroke = constructStroke(styleLike.stroke)

console.log('ol.style.Stroke', olStroke)
console.log('StrokeLike', serializeStroke(olStroke))

const olText = constructText(styleLike.text)

console.log('ol.style.Text', olText)
console.log('TextLike', serializeText(olText))
