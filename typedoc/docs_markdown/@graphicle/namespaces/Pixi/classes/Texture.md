[**@graphicle/js**](../../../../README.md)

***

[@graphicle/js](../../../../globals.md) / [Pixi](../README.md) / Texture

# Class: Texture\<TextureSourceType\>

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:115

A texture stores the information that represents an image or part of an image.

A texture must have a loaded resource passed to it to work. It does not contain any
loading mechanisms.

The Assets class can be used to load a texture from a file. This is the recommended
way as it will handle the loading and caching for you.

```js

const texture = await Assets.load('assets/image.png');

// once Assets has loaded the image it will be available via the from method
const sameTexture = Texture.from('assets/image.png');
// another way to access the texture once loaded
const sameAgainTexture = Asset.get('assets/image.png');

const sprite1 = new Sprite(texture);

```

It cannot be added to the display list directly; instead use it as the texture for a Sprite.
If no frame is provided for a texture, then the whole image is used.

You can directly create a texture from an image and then reuse it multiple times like this :

```js
import { Sprite, Texture } from 'pixi.js';

const texture = await Assets.load('assets/image.png');
const sprite1 = new Sprite(texture);
const sprite2 = new Sprite(texture);
```

If you didn't pass the texture frame to constructor, it enables `noFrame` mode:
it subscribes on baseTexture events, it automatically resizes at the same time as baseTexture.

## Memberof

rendering

## Extends

- `EventEmitter`\<\{ `destroy`: `Texture`; `update`: `Texture`; \}\>

## Type Parameters

### TextureSourceType

`TextureSourceType` *extends* `TextureSource` = `TextureSource`

## Implements

- `BindableTexture`

## Constructors

### Constructor

> **new Texture**\<`TextureSourceType`\>(`options?`): `Texture`\<`TextureSourceType`\>

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:199

#### Parameters

##### options?

`TextureOptions`\<`TextureSourceType`\>

Options for the texture

#### Returns

`Texture`\<`TextureSourceType`\>

#### Overrides

`EventEmitter<{ update: Texture; destroy: Texture; }>.constructor`

## Properties

### \_source

> **\_source**: `TextureSourceType`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:136

***

### defaultAnchor?

> `readonly` `optional` **defaultAnchor**: `object`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:152

Anchor point that is used as default if sprite is created with this texture.
Changing the `defaultAnchor` at a later point of time will not update Sprite's anchor point.

#### x

> **x**: `number`

#### y

> **y**: `number`

#### Default

```ts
{0,0}
```

***

### defaultBorders?

> `readonly` `optional` **defaultBorders**: `TextureBorders`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:161

Default width of the non-scalable border that is used if 9-slice plane is created with this texture.

#### Since

7.2.0

#### See

scene.NineSliceSprite

***

### destroyed

> `readonly` **destroyed**: `boolean`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:135

Has the texture been destroyed?

***

### dynamic

> **dynamic**: `boolean`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:192

Set to true if you plan on modifying the uvs of this texture.
When this is the case, sprites and other objects using the texture will
make sure to listen for changes to the uvs and update their vertices accordingly.

***

### frame

> `readonly` **frame**: `Rectangle`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:166

This is the area of the BaseTexture image to actually copy to the Canvas / WebGL when rendering,
irrespective of the actual frame size or placement (which can be influenced by trimmed texture atlases)

***

### isTexture

> `readonly` **isTexture**: `true` = `true`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:195

is it a texture? yes! used for type checking

***

### label?

> `optional` **label**: `string`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:128

label used for debugging

***

### noFrame

> **noFrame**: `boolean`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:186

Does this Texture have any frame data assigned to it?

This mode is enabled automatically if no frame was passed inside constructor.

In this mode texture is subscribed to baseTexture events, and fires `update` on any change.

Beware, after loading or resize of baseTexture event can fired two times!
If you want more control, subscribe on baseTexture itself.

#### Example

```ts
texture.on('update', () => {});
```

***

### orig

> `readonly` **orig**: `Rectangle`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:168

This is the area of original texture, before it was put in atlas.

***

### rotate

> `readonly` **rotate**: `number`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:144

Indicates whether the texture is rotated inside the atlas
set to 2 to compensate for texture packer rotation
set to 6 to compensate for spine packer rotation
can be used to rotate or mirror sprites
See maths.groupD8 for explanation

***

### trim

> `readonly` **trim**: `Rectangle`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:173

This is the trimmed area of original texture, before it was put in atlas
Please call `updateUvs()` after you change coordinates of `trim` manually.

***

### uid

> `readonly` **uid**: `number`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:130

unique id for this texture

***

### uvs

> `readonly` **uvs**: `UVs`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:146

A uvs object based on the given frame and the texture source

***

### EMPTY

> `static` **EMPTY**: `Texture`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:225

an Empty Texture used internally by the engine

***

### from()

> `static` **from**: (`id`, `skipCache?`) => `Texture`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:126

Helper function that creates a returns Texture based on the source you provide.
The source should be loaded and ready to go. If not its best to grab the asset using Assets.

#### Parameters

##### id

`TextureSourceLike`

String or Source to create texture from

##### skipCache?

`boolean`

Skip adding the texture to the cache

#### Returns

`Texture`

The texture based on the Id provided

***

### prefixed

> `static` **prefixed**: `string` \| `boolean`

Defined in: node\_modules/eventemitter3/index.d.ts:9

#### Inherited from

`EventEmitter.prefixed`

***

### WHITE

> `static` **WHITE**: `Texture`\<`BufferImageSource`\>

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:227

a White texture used internally by the engine

## Accessors

### baseTexture

#### Get Signature

> **get** **baseTexture**(): `TextureSource`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:223

##### Deprecated

since 8.0.0

##### Returns

`TextureSource`

***

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:208

The height of the Texture in pixels.

##### Returns

`number`

***

### source

#### Get Signature

> **get** **source**(): `TextureSourceType`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:202

the underlying source of the texture (equivalent of baseTexture in v7)

##### Returns

`TextureSourceType`

#### Set Signature

> **set** **source**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:200

##### Parameters

###### value

`TextureSourceType`

##### Returns

`void`

#### Implementation of

`BindableTexture.source`

***

### textureMatrix

#### Get Signature

> **get** **textureMatrix**(): `TextureMatrix`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:204

returns a TextureMatrix instance for this texture. By default, that object is not created because its heavy.

##### Returns

`TextureMatrix`

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:206

The width of the Texture in pixels.

##### Returns

`number`

## Methods

### addListener()

> **addListener**\<`T`\>(`event`, `fn`, `context?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:45

#### Type Parameters

##### T

`T` *extends* `"destroy"` \| `"update"`

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

### destroy()

> **destroy**(`destroySource?`): `void`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:215

Destroys this texture

#### Parameters

##### destroySource?

`boolean`

Destroy the source when the texture is destroyed.

#### Returns

`void`

***

### emit()

> **emit**\<`T`\>(`event`, ...`args`): `boolean`

Defined in: node\_modules/eventemitter3/index.d.ts:32

Calls each of the listeners registered for a given event.

#### Type Parameters

##### T

`T` *extends* `"destroy"` \| `"update"`

#### Parameters

##### event

`T`

##### args

...`ArgumentMap`\<\{ `destroy`: `Texture`; `update`: `Texture`; \}\>\[`Extract`\<`T`, `"destroy"` \| `"update"`\>\]

#### Returns

`boolean`

#### Inherited from

`EventEmitter.emit`

***

### eventNames()

> **eventNames**(): (`"destroy"` \| `"update"`)[]

Defined in: node\_modules/eventemitter3/index.d.ts:15

Return an array listing the events for which the emitter has registered
listeners.

#### Returns

(`"destroy"` \| `"update"`)[]

#### Inherited from

`EventEmitter.eventNames`

***

### listenerCount()

> **listenerCount**(`event`): `number`

Defined in: node\_modules/eventemitter3/index.d.ts:27

Return the number of listeners listening to a given event.

#### Parameters

##### event

`"destroy"` | `"update"`

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

`T` *extends* `"destroy"` \| `"update"`

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

`T` *extends* `"destroy"` \| `"update"`

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

`T` *extends* `"destroy"` \| `"update"`

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

`T` *extends* `"destroy"` \| `"update"`

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

`"destroy"` | `"update"`

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

`T` *extends* `"destroy"` \| `"update"`

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

### update()

> **update**(): `void`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:221

Call this if you have modified the `texture outside` of the constructor.

If you have modified this texture's source, you must separately call `texture.source.update()` to see those changes.

#### Returns

`void`

***

### updateUvs()

> **updateUvs**(): `void`

Defined in: node\_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.d.ts:210

Call this function when you have modified the frame of this texture.

#### Returns

`void`
