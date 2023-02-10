这个包实现了 Openlayers 中 Style 实例的序列化、反序列化功能，可以将 Style 实例序列化为普通JavaScript对象，进一步序列化为 JSON 格式后，方便存储与传输。

This package can serialize OpenLayers style instance into javascript object, and deserialize javascript object into
OpenLayers style instance.

```js
import { serializeStyle, constructStyle } from 'ol-style-serializer'

const styleLike = {
  fill: {
    color: '#CCC666'
  },
  stroke: {
    color: '#666CCC',
    width: 2
  },
  text: {
    text: 'a style',
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

```