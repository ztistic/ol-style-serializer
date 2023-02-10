import Style from "ol/style/Style.js"
import Fill from "ol/style/Fill.js"
import Stroke from "ol/style/Stroke.js"
import Text from "ol/style/Text.js"
import Icon from "ol/style/Icon.js"
import RegularShape from "ol/style/RegularShape.js"
import CircleStyle from "ol/style/Circle.js"

/**
 * @typedef StyleLike
 * @type {object}
 * @property {FillLike} fill
 * @property {StrokeLike} stroke
 * @property {TextLike} text
 * @property {IconLike | CircleStyleLike | RegularShapeLike} image
 */

/**
 * @typedef FillLike
 * @type {object}
 * @property {string} color
 */

/**
 * @typedef StrokeLike
 * @type {object}
 * @property {string} color
 * @property {'butt'|'round'|'square'} lineCap
 * @property {'bevel'|'round'|'miter'} lineJoin
 * @property {number[]} lineDash
 * @property {number} lineDashOffset
 * @property {number} miterLimit
 * @property {number} width
 */

/**
 * @typedef TextLike
 * @type {object}
 * @property {FillLike} backgroundFill
 * @property {StrokeLike} backgroundStroke
 * @property {FillLike} fill
 * @property {StrokeLike} stroke
 * @property {string} font
 * @property {number} maxAngle
 * @property {number} offsetX
 * @property {number} offsetY
 * @property {boolean} overflow
 * @property {'point'|'line'} placement
 * @property {number} scale
 * @property {number} rotation
 * @property {boolean} rotateWithView
 * @property {string} text
 * @property {string} textAlign
 * @property {string} textBaseline
 * @property {string} justify
 * @property {number[]} padding
 */

/**
 * @typedef IconLike
 * @type {object}
 * @property {[number,number]} anchor
 * @property {string} color
 * @property {[number,number]} displacement
 * @property {number} opacity
 * @property {number} scale
 * @property {number} rotation
 * @property {boolean} rotateWithView
 * @property {[width:number, height:number]} size
 * @property {string} src
 * @property {'declutter'|'obstacle'|'none'|undefined} declutterMode
 * @property {'Icon'} _type
 */

/**
 * @typedef RegularShapeLike
 * @type {object}
 * @property {FillLike} fill
 * @property {StrokeLike} stroke
 * @property {number} points
 * @property {number} radius
 * @property {number} radius2
 * @property {number} angle
 * @property {[number,number]} displacement
 * @property {number} rotation
 * @property {boolean} rotateWithView
 * @property {number} scale
 * @property {'declutter'|'obstacle'|'none'|undefined} declutterMode
 * @property {'RegularShape'} _type
 */

/**
 * @typedef CircleStyleLike
 * @type {object}
 * @property {FillLike} fill
 * @property {StrokeLike} stroke
 * @property {number} radius
 * @property {[number,number]} displacement
 * @property {number} scale
 * @property {number} rotation
 * @property {boolean} rotateWithView
 * @property {'declutter'|'obstacle'|'none'|undefined} declutterMode
 * @property {'CircleStyle'} _type
 */


/**
 * Mark the _type on IconLike|RegularShapeLike|CircleStyleLike object
 * to identify the class when deserializing.
 */
const IMAGE_TYPE_ENUM = {
  Icon: 'Icon',
  CircleStyle: 'CircleStyle',
  RegularShape: 'RegularShape'
}

/**
 * serialize ol.style.Fill instance into FillLike object.
 * @param olFill {Fill}
 * @return {FillLike}
 */
export function serializeFill(olFill) {
  if (olFill instanceof Fill) {
    if (olFill.getColor()) {
      return {
        color: olFill.getColor()
      }
    }
  }
}

/**
 * construct ol.style.Fill instance use FillLike object.
 * @param fillLike {FillLike}
 * @return {Fill}
 */
export function constructFill(fillLike) {
  if (fillLike?.color) return tryConstruct(Fill, fillLike)
}

/**
 * serialize ol.style.Stroke instance into StrokeLike object.
 * @param olStroke {Stroke}
 * @return {StrokeLike}
 */
export function serializeStroke(olStroke) {
  if (olStroke instanceof Stroke) {
    return trimEmptyProperty({
      color: olStroke.getColor(),
      lineCap: olStroke.getLineCap(),
      lineDash: olStroke.getLineDash(),
      lineDashOffset: olStroke.getLineDashOffset(),
      lineJoin: olStroke.getLineJoin(),
      miterLimit: olStroke.getMiterLimit(),
      width: olStroke.getWidth()
    })
  }
}

/**
 * construct ol.style.Stroke instance use StrokeLike object.
 * @param strokeLike {StrokeLike}
 * @return {Stroke}
 */
export function constructStroke(strokeLike) {
  if (strokeLike) return tryConstruct(Stroke, strokeLike)
}

/**
 * serialize ol.style.Text instance into TextLike object.
 * @param olText {Text}
 * @return {TextLike}
 */
export function serializeText(olText) {
  if (olText instanceof Text) {
    return trimEmptyProperty({
      backgroundFill: serializeFill(olText.getBackgroundFill()),
      backgroundStroke: serializeStroke(olText.getBackgroundStroke()),
      fill: serializeFill(olText.getFill()),
      stroke: serializeStroke(olText.getStroke()),
      font: olText.getFont(),
      maxAngle: olText.getMaxAngle(),
      offsetX: olText.getOffsetX(),
      offsetY: olText.getOffsetY(),
      overflow: olText.getOverflow(),
      placement: olText.getPlacement(),
      scale: olText.getScale(),
      rotation: olText.getRotation(),
      rotateWithView: olText.getRotateWithView(),
      text: olText.getText(),
      textAlign: olText.getTextAlign(),
      textBaseline: olText.getTextBaseline(),
      justify: olText.getJustify(),
      padding: olText.getPadding()
    })
  }
}

/**
 * construct ol.style.Text instance use TextLike object.
 * @param textLike {TextLike}
 * @return {Text}
 */
export function constructText(textLike) {
  if (!textLike) return undefined
  
  const {
    backgroundFill,
    backgroundStroke,
    fill,
    stroke,
    ...props
  } = textLike
  
  return tryConstruct(Text, {
    ...props,
    backgroundFill: constructFill(backgroundFill),
    backgroundStroke: constructStroke(backgroundStroke),
    fill: constructFill(fill),
    stroke: constructStroke(stroke)
  })
}

/**
 * serialize ol.style.Icon instance into IconLike object.
 * @param olIcon {Icon}
 * @return {IconLike}
 */
export function serializeIcon(olIcon) {
  if (olIcon instanceof Icon) {
    if (!olIcon.getSrc()) return undefined
    return trimEmptyProperty({
      _type: IMAGE_TYPE_ENUM.Icon,
      anchor: olIcon.getAnchor(),
      color: olIcon.getColor(),
      displacement: olIcon.getDisplacement(),
      opacity: olIcon.getOpacity(),
      scale: olIcon.getScale(),
      rotateWithView: olIcon.getRotateWithView(),
      rotation: olIcon.getRotation(),
      size: olIcon.getSize(),
      src: olIcon.getSrc(),
      declutterMode: olIcon.getDeclutterMode()
    })
  }
}

/**
 * construct ol.style.Icon instance use IconLike object.
 * @param iconLike {IconLike}
 * @return {Icon}
 */
export function constructIcon(iconLike) {
  if (!iconLike) return undefined
  if (!iconLike.src) return undefined
  return tryConstruct(Icon, iconLike)
}

/**
 * serialize ol.style.RegularShape instance into RegularShapeLike object.
 * @param regularShape {RegularShape}
 * @return {RegularShapeLike}
 */
export function serialRegularShape(regularShape) {
  if (regularShape instanceof RegularShape) {
    return trimEmptyProperty({
      _type: IMAGE_TYPE_ENUM.RegularShape,
      //
      fill: serializeFill(regularShape.getFill()),
      stroke: serializeStroke(regularShape.getStroke()),
      //
      points: regularShape.getPoints(),
      radius: regularShape.getRadius(),
      radius2: regularShape.getRadius2(),
      angle: regularShape.getAngle(),
      displacement: regularShape.getDisplacement(),
      rotation: regularShape.getRotation(),
      rotateWithView: regularShape.getRotateWithView(),
      scale: regularShape.getScale(),
      declutterMode: regularShape.getDeclutterMode()
    })
  }
}

/**
 * construct ol.style.RegularShape instance use RegularShapeLike object.
 * @param regularShapeLike {RegularShapeLike}
 * @return {RegularShape}
 */
export function constructRegularShape(regularShapeLike) {
  if (!regularShapeLike) return undefined
  
  const { fill, stroke, ...props } = regularShapeLike
  
  return tryConstruct(RegularShape, {
    ...props,
    fill: constructFill(fill),
    stroke: constructStroke(stroke)
  })
}

/**
 * serialize ol.style.CircleStyle instance into CircleStyleLike object.
 * @param circleStyle {CircleStyle}
 * @return {CircleStyleLike}
 */
export function serialCircleShape(circleStyle) {
  if (circleStyle instanceof CircleStyle) {
    return trimEmptyProperty({
      _type: IMAGE_TYPE_ENUM.CircleStyle,
      //
      fill: serializeFill(circleStyle.getFill()),
      stroke: serializeStroke(circleStyle.getStroke()),
      //
      radius: circleStyle.getRadius(),
      displacement: circleStyle.getDisplacement(),
      scale: circleStyle.getScale(),
      rotation: circleStyle.getRotation(),
      rotateWithView: circleStyle.getRotateWithView(),
      declutterMode: circleStyle.getDeclutterMode()
    })
  }
}

/**
 * construct ol.style.CircleStyle instance use CircleStyleLike object.
 * @param circleStyleLike {CircleStyleLike}
 * @return {CircleStyle}
 */
export function constructCircleStyle(circleStyleLike) {
  if (!circleStyleLike) return undefined
  
  const { fill, stroke, ...props } = circleStyleLike
  
  return tryConstruct(CircleStyle, {
    ...props,
    fill: constructFill(fill),
    stroke: constructStroke(stroke)
  })
}

/**
 * serialize ol.style.Image sub class instance into ImageLike object.
 * CircleStyle is RegularShape's sub class, handle CircleStyle first.
 * @param olImage {Icon|RegularShape|CircleStyle}
 * @return {IconLike|RegularShapeLike|CircleStyleLike}
 */
export function serializeImage(olImage) {
  if (olImage instanceof Icon) {
    return serializeIcon(olImage)
  }
  if (olImage instanceof CircleStyle) {
    return serialCircleShape(olImage)
  }
  if (olImage instanceof RegularShape) {
    return serialRegularShape(olImage)
  }
}

/**
 * construct ol.style.Image sub class instance use ImageLike object.
 * @param imageLike {IconLike|RegularShapeLike|CircleStyleLike}
 * @return {Icon|RegularShape|CircleStyle}
 */
export function constructImage(imageLike) {
  if (!imageLike) return undefined
  switch (imageLike._type) {
    case IMAGE_TYPE_ENUM.Icon:
      return constructIcon(imageLike)
    case IMAGE_TYPE_ENUM.CircleStyle:
      return constructCircleStyle(imageLike)
    case IMAGE_TYPE_ENUM.RegularShape:
      return constructRegularShape(imageLike)
    default:
      return constructIcon(imageLike)
  }
}

/**
 * serialize ol.style.Style instance into StyleLike object.
 * @param olStyle {Style}
 * @return {StyleLike}
 */
export function serializeStyle(olStyle) {
  if (olStyle instanceof Style) {
    return trimEmptyProperty({
      image: serializeImage(olStyle.getImage()),
      fill: serializeFill(olStyle.getFill()),
      stroke: serializeStroke(olStyle.getStroke()),
      text: serializeText(olStyle.getText())
    })
  }
}

/**
 * construct ol.style.Style instance use StyleLike object.
 * return undefined on construction failure.
 * @param styleLike {StyleLike}
 * @return {Style}
 */
export function constructStyle(styleLike) {
  if (!styleLike) return undefined
  const { image, fill, stroke, text } = styleLike
  return tryConstruct(Style, {
    fill: constructFill(fill),
    stroke: constructStroke(stroke),
    text: constructText(text),
    image: constructImage(image),
  })
}

/**
 * remove the null/undefined-valued 1 depth property from an object.
 */
function trimEmptyProperty(obj) {
  return obj && Object.keys(obj)
    .filter((key) => obj[key] !== null && obj[key] !== undefined)
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {})
}

/**
 * ignore the error and return undefined when construct failed.
 */
function tryConstruct(constructor, options) {
  try {
    return options ? new constructor(trimEmptyProperty(options)) : new constructor()
  } catch (e) {
  }
}