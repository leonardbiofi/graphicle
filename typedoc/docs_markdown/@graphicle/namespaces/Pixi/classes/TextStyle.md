[**@graphicle/js**](../../../../README.md)

***

[@graphicle/js](../../../../globals.md) / [Pixi](../README.md) / TextStyle

# Class: TextStyle

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:123

A TextStyle Object contains information to decorate a Text objects.

An instance can be shared between multiple Text objects; then changing the style will update all text objects using it.

## Memberof

text

## Example

```ts
import { TextStyle } from 'pixi.js';
const style = new TextStyle({
  fontFamily: ['Helvetica', 'Arial', 'sans-serif'],
  fontSize: 36,
});
```

## Extends

- `EventEmitter`\<\{ `update`: `TextDropShadow`; \}\>

## Constructors

### Constructor

> **new TextStyle**(`style?`): `TextStyle`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:152

#### Parameters

##### style?

`Partial`\<`TextStyleOptions`\>

#### Returns

`TextStyle`

#### Overrides

`EventEmitter<{ update: TextDropShadow; }>.constructor`

## Properties

### \_fill

> **\_fill**: `ConvertedFillStyle`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:130

***

### \_stroke

> **\_stroke**: `ConvertedStrokeStyle`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:132

***

### \_styleKey

> `protected` **\_styleKey**: `string`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:150

***

### defaultDropShadow

> `static` **defaultDropShadow**: `TextDropShadow`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:127

The default drop shadow settings

***

### defaultTextStyle

> `static` **defaultTextStyle**: `TextStyleOptions`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:129

The default text style settings

***

### prefixed

> `static` **prefixed**: `string` \| `boolean`

Defined in: node\_modules/eventemitter3/index.d.ts:9

#### Inherited from

`EventEmitter.prefixed`

## Accessors

### align

#### Get Signature

> **get** **align**(): `TextStyleAlign`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:157

Alignment for multiline text, does not affect single line text.

##### Member

##### Returns

`TextStyleAlign`

#### Set Signature

> **set** **align**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:158

##### Parameters

###### value

`TextStyleAlign`

##### Returns

`void`

***

### breakWords

#### Get Signature

> **get** **breakWords**(): `boolean`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:160

Indicates if lines can be wrapped within words, it needs wordWrap to be set to true.

##### Returns

`boolean`

#### Set Signature

> **set** **breakWords**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:161

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### dropShadow

#### Get Signature

> **get** **dropShadow**(): `TextDropShadow`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:163

Set a drop shadow for the text.

##### Returns

`TextDropShadow`

#### Set Signature

> **set** **dropShadow**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:164

##### Parameters

###### value

`boolean` | `TextDropShadow`

##### Returns

`void`

***

### fill

#### Get Signature

> **get** **fill**(): `FillInput`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:257

The fill style that will be used to color the text.
This can be:
- A color string like 'red', '#00FF00', or 'rgba(255,0,0,0.5)'
- A hex number like 0xff0000 for red
- A FillStyle object with properties like { color: 0xff0000, alpha: 0.5 }
- A FillGradient for gradient fills
- A FillPattern for pattern/texture fills

When using a FillGradient, vertical gradients (angle of 90 degrees) are applied per line of text,
while gradients at any other angle are spread across the entire text body as a whole.

##### Example

```ts
// Vertical gradient applied per line
const verticalGradient = new FillGradient(0, 0, 0, 1)
    .addColorStop(0, 0xff0000)
    .addColorStop(1, 0x0000ff);

const text = new Text({
    text: 'Line 1\nLine 2',
    style: { fill: verticalGradient }
});

To manage the gradient in a global scope, set the textureSpace property of the FillGradient to 'global'.
```

##### Returns

`FillInput`

#### Set Signature

> **set** **fill**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:258

##### Parameters

###### value

`FillInput`

##### Returns

`void`

***

### fontFamily

#### Get Signature

> **get** **fontFamily**(): `string` \| `string`[]

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:166

The font family, can be a single font name, or a list of names where the first is the preferred font.

##### Returns

`string` \| `string`[]

#### Set Signature

> **set** **fontFamily**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:167

##### Parameters

###### value

`string` | `string`[]

##### Returns

`void`

***

### fontSize

#### Get Signature

> **get** **fontSize**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:169

The font size (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em')

##### Returns

`number`

#### Set Signature

> **set** **fontSize**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:170

##### Parameters

###### value

`string` | `number`

##### Returns

`void`

***

### fontStyle

#### Get Signature

> **get** **fontStyle**(): `TextStyleFontStyle`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:175

The font style.

##### Member

##### Returns

`TextStyleFontStyle`

#### Set Signature

> **set** **fontStyle**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:176

##### Parameters

###### value

`TextStyleFontStyle`

##### Returns

`void`

***

### fontVariant

#### Get Signature

> **get** **fontVariant**(): `TextStyleFontVariant`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:181

The font variant.

##### Member

##### Returns

`TextStyleFontVariant`

#### Set Signature

> **set** **fontVariant**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:182

##### Parameters

###### value

`TextStyleFontVariant`

##### Returns

`void`

***

### fontWeight

#### Get Signature

> **get** **fontWeight**(): `TextStyleFontWeight`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:187

The font weight.

##### Member

##### Returns

`TextStyleFontWeight`

#### Set Signature

> **set** **fontWeight**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:188

##### Parameters

###### value

`TextStyleFontWeight`

##### Returns

`void`

***

### leading

#### Get Signature

> **get** **leading**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:190

The space between lines.

##### Returns

`number`

#### Set Signature

> **set** **leading**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:191

##### Parameters

###### value

`number`

##### Returns

`void`

***

### letterSpacing

#### Get Signature

> **get** **letterSpacing**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:193

The amount of spacing between letters, default is 0.

##### Returns

`number`

#### Set Signature

> **set** **letterSpacing**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:194

##### Parameters

###### value

`number`

##### Returns

`void`

***

### lineHeight

#### Get Signature

> **get** **lineHeight**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:196

The line height, a number that represents the vertical space that a letter uses.

##### Returns

`number`

#### Set Signature

> **set** **lineHeight**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:197

##### Parameters

###### value

`number`

##### Returns

`void`

***

### padding

#### Get Signature

> **get** **padding**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:202

Occasionally some fonts are cropped. Adding some padding will prevent this from happening
by adding padding to all sides of the text.

##### Returns

`number`

#### Set Signature

> **set** **padding**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:203

##### Parameters

###### value

`number`

##### Returns

`void`

***

### stroke

#### Get Signature

> **get** **stroke**(): `StrokeInput`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:260

A fillstyle that will be used on the text stroke, e.g., 'blue', '#FCFF00'.

##### Returns

`StrokeInput`

#### Set Signature

> **set** **stroke**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:261

##### Parameters

###### value

`StrokeInput`

##### Returns

`void`

***

### styleKey

#### Get Signature

> **get** **styleKey**(): `string`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:266

##### Returns

`string`

***

### textBaseline

#### Get Signature

> **get** **textBaseline**(): `TextStyleTextBaseline`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:211

The baseline of the text that is rendered.

##### Member

##### Returns

`TextStyleTextBaseline`

#### Set Signature

> **set** **textBaseline**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:212

##### Parameters

###### value

`TextStyleTextBaseline`

##### Returns

`void`

***

### trim

#### Get Signature

> **get** **trim**(): `boolean`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:205

Trim transparent borders. This is an expensive operation so only use this if you have to!

##### Returns

`boolean`

#### Set Signature

> **set** **trim**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:206

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### whiteSpace

#### Get Signature

> **get** **whiteSpace**(): `TextStyleWhiteSpace`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:224

How newlines and spaces should be handled.
Default is 'pre' (preserve, preserve).

 value       | New lines     |   Spaces
 ---         | ---           |   ---
'normal'     | Collapse      |   Collapse
'pre'        | Preserve      |   Preserve
'pre-line'   | Preserve      |   Collapse

##### Member

##### Returns

`TextStyleWhiteSpace`

#### Set Signature

> **set** **whiteSpace**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:225

##### Parameters

###### value

`TextStyleWhiteSpace`

##### Returns

`void`

***

### wordWrap

#### Get Signature

> **get** **wordWrap**(): `boolean`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:227

Indicates if word wrap should be used.

##### Returns

`boolean`

#### Set Signature

> **set** **wordWrap**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:228

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### wordWrapWidth

#### Get Signature

> **get** **wordWrapWidth**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:230

The width at which text will wrap, it needs wordWrap to be set to true.

##### Returns

`number`

#### Set Signature

> **set** **wordWrapWidth**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:231

##### Parameters

###### value

`number`

##### Returns

`void`

## Methods

### \_generateKey()

> `protected` **\_generateKey**(): `string`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:262

#### Returns

`string`

***

### addListener()

> **addListener**\<`T`\>(`event`, `fn`, `context?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:45

#### Type Parameters

##### T

`T` *extends* `"update"`

#### Parameters

##### event

`T`

##### fn

(...`args`) => `void`

##### context?

`any`

#### Returns

`this`

#### Inherited from

`EventEmitter.addListener`

***

### clone()

> **clone**(): `TextStyle`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:271

Creates a new TextStyle object with the same values as this one.

#### Returns

`TextStyle`

New cloned TextStyle object

***

### destroy()

> **destroy**(`options?`): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:279

Destroys this text style.

#### Parameters

##### options?

`TypeOrBool`\<`TextureDestroyOptions`\>

Options parameter. A boolean will act as if all options
 have been set to that value

#### Returns

`void`

***

### emit()

> **emit**\<`T`\>(`event`, ...`args`): `boolean`

Defined in: node\_modules/eventemitter3/index.d.ts:32

Calls each of the listeners registered for a given event.

#### Type Parameters

##### T

`T` *extends* `"update"`

#### Parameters

##### event

`T`

##### args

...`ArgumentMap`\<\{ `update`: `TextDropShadow`; \}\>\[`Extract`\<`T`, `"update"`\>\]

#### Returns

`boolean`

#### Inherited from

`EventEmitter.emit`

***

### eventNames()

> **eventNames**(): `"update"`[]

Defined in: node\_modules/eventemitter3/index.d.ts:15

Return an array listing the events for which the emitter has registered
listeners.

#### Returns

`"update"`[]

#### Inherited from

`EventEmitter.eventNames`

***

### listenerCount()

> **listenerCount**(`event`): `number`

Defined in: node\_modules/eventemitter3/index.d.ts:27

Return the number of listeners listening to a given event.

#### Parameters

##### event

`"update"`

#### Returns

`number`

#### Inherited from

`EventEmitter.listenerCount`

***

### listeners()

> **listeners**\<`T`\>(`event`): (...`args`) => `void`[]

Defined in: node\_modules/eventemitter3/index.d.ts:20

Return the listeners registered for a given event.

#### Type Parameters

##### T

`T` *extends* `"update"`

#### Parameters

##### event

`T`

#### Returns

(...`args`) => `void`[]

#### Inherited from

`EventEmitter.listeners`

***

### off()

> **off**\<`T`\>(`event`, `fn?`, `context?`, `once?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:69

#### Type Parameters

##### T

`T` *extends* `"update"`

#### Parameters

##### event

`T`

##### fn?

(...`args`) => `void`

##### context?

`any`

##### once?

`boolean`

#### Returns

`this`

#### Inherited from

`EventEmitter.off`

***

### on()

> **on**\<`T`\>(`event`, `fn`, `context?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:40

Add a listener for a given event.

#### Type Parameters

##### T

`T` *extends* `"update"`

#### Parameters

##### event

`T`

##### fn

(...`args`) => `void`

##### context?

`any`

#### Returns

`this`

#### Inherited from

`EventEmitter.on`

***

### once()

> **once**\<`T`\>(`event`, `fn`, `context?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:54

Add a one-time listener for a given event.

#### Type Parameters

##### T

`T` *extends* `"update"`

#### Parameters

##### event

`T`

##### fn

(...`args`) => `void`

##### context?

`any`

#### Returns

`this`

#### Inherited from

`EventEmitter.once`

***

### removeAllListeners()

> **removeAllListeners**(`event?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:79

Remove all listeners, or those of the specified event.

#### Parameters

##### event?

`"update"`

#### Returns

`this`

#### Inherited from

`EventEmitter.removeAllListeners`

***

### removeListener()

> **removeListener**\<`T`\>(`event`, `fn?`, `context?`, `once?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:63

Remove the listeners of a given event.

#### Type Parameters

##### T

`T` *extends* `"update"`

#### Parameters

##### event

`T`

##### fn?

(...`args`) => `void`

##### context?

`any`

##### once?

`boolean`

#### Returns

`this`

#### Inherited from

`EventEmitter.removeListener`

***

### reset()

> **reset**(): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:265

Resets all properties to the default values

#### Returns

`void`

***

### update()

> **update**(): `void`

Defined in: node\_modules/pixi.js/lib/scene/text/TextStyle.d.ts:263

#### Returns

`void`
