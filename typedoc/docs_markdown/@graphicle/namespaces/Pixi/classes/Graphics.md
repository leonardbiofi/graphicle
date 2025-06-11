[**@graphicle/js**](../../../../README.md)

***

[@graphicle/js](../../../../globals.md) / [Pixi](../README.md) / Graphics

# Class: Graphics

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:30

The Graphics class is primarily used to render primitive shapes such as lines, circles and
rectangles to the display, and to color and fill them.  However, you can also use a Graphics
object to build a list of primitives to use as a mask, or as a complex hitArea.

## Memberof

scene

## Extends

- `Graphics`.`ViewContainer`

## Implements

- `Instruction`

## Constructors

### Constructor

> **new Graphics**(`options?`): `Graphics`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:47

#### Parameters

##### options?

Options for the Graphics.

`GraphicsContext` | `GraphicsOptions`

#### Returns

`Graphics`

#### Inherited from

`PixiMixins.Graphics.constructor`

## Properties

### \_accessibleActive?

> `optional` **\_accessibleActive**: `boolean`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:70

#### Inherited from

`ViewContainer._accessibleActive`

***

### \_accessibleDiv?

> `optional` **\_accessibleDiv**: `null` \| `AccessibleHTMLElement`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:71

#### Inherited from

`ViewContainer._accessibleDiv`

***

### \_bounds

> `protected` **\_bounds**: `Bounds`

Defined in: node\_modules/pixi.js/lib/scene/view/ViewContainer.d.ts:30

#### Inherited from

`ViewContainer._bounds`

***

### \_boundsDirty

> `protected` **\_boundsDirty**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/view/ViewContainer.d.ts:31

#### Inherited from

`ViewContainer._boundsDirty`

***

### \_filterEffect?

> `optional` **\_filterEffect**: `FilterEffect`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:22

#### Inherited from

`ViewContainer._filterEffect`

***

### \_internalEventMode

> **\_internalEventMode**: `EventMode`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:144

#### Inherited from

`ViewContainer._internalEventMode`

***

### \_localBoundsCacheData

> **\_localBoundsCacheData**: `LocalBoundsCacheData`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/measureMixin.d.ts:15

#### Inherited from

`ViewContainer._localBoundsCacheData`

***

### \_localBoundsCacheId

> **\_localBoundsCacheId**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/measureMixin.d.ts:16

#### Inherited from

`ViewContainer._localBoundsCacheId`

***

### \_maskEffect?

> `optional` **\_maskEffect**: `MaskEffect`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:20

#### Inherited from

`ViewContainer._maskEffect`

***

### \_maskOptions?

> `optional` **\_maskOptions**: `MaskOptions`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:21

#### Inherited from

`ViewContainer._maskOptions`

***

### \_onRender

> **\_onRender**: `null` \| (`renderer`) => `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/onRenderMixin.d.ts:7

#### Inherited from

`ViewContainer._onRender`

***

### \_renderId?

> `optional` **\_renderId**: `number`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:72

#### Inherited from

`ViewContainer._renderId`

***

### \_zIndex

> **\_zIndex**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:8

#### Inherited from

`ViewContainer._zIndex`

***

### accessible?

> `optional` **accessible**: `boolean`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:30

Flag for if the object is accessible. If true AccessibilityManager will overlay a
shadow div with attributes set

#### Default

```ts
false
```

#### Inherited from

`ViewContainer.accessible`

***

### accessibleChildren?

> `optional` **accessibleChildren**: `boolean`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:63

Setting to false will prevent any children inside this container to
be accessible. Defaults to true.

#### Default

```ts
true
```

#### Inherited from

`ViewContainer.accessibleChildren`

***

### accessibleHint?

> `optional` **accessibleHint**: `null` \| `string`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:38

Sets the aria-label attribute of the shadow div

#### Inherited from

`ViewContainer.accessibleHint`

***

### accessiblePointerEvents?

> `optional` **accessiblePointerEvents**: `PointerEvents`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:57

#### Inherited from

`ViewContainer.accessiblePointerEvents`

***

### accessibleText?

> `optional` **accessibleText**: `null` \| `string`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:56

Sets the text content of the shadow div

#### Inherited from

`ViewContainer.accessibleText`

***

### accessibleTitle?

> `optional` **accessibleTitle**: `null` \| `string`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:36

Sets the title attribute of the shadow div
If accessibleTitle AND accessibleHint has not been this will default to 'container [tabIndex]'

#### Member

#### Inherited from

`ViewContainer.accessibleTitle`

***

### accessibleType?

> `optional` **accessibleType**: keyof HTMLElementTagNameMap

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:48

Specify the type of div the accessible layer is. Screen readers treat the element differently
depending on this type. Defaults to button.

#### Default

```ts
'button'
```

#### Inherited from

`ViewContainer.accessibleType`

***

### boundsArea

> **boundsArea**: `Rectangle`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:446

An optional bounds area for this container. Setting this rectangle will stop the renderer
from recursively measuring the bounds of each children and instead use this single boundArea.
This is great for optimisation! If for example you have a 1000 spinning particles and you know they all sit
within a specific bounds, then setting it will mean the renderer will not need to measure the
1000 children to find the bounds. Instead it will just use the bounds you set.

#### Inherited from

`ViewContainer.boundsArea`

***

### ~~cacheAsBitmap~~

> **cacheAsBitmap**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/cacheAsTextureMixin.d.ts:27

Legacy property for backwards compatibility with PixiJS v7 and below.
Use `cacheAsTexture` instead.

#### Deprecated

Since PixiJS v8

#### Memberof

scene.Container#

#### Inherited from

`ViewContainer.cacheAsBitmap`

***

### cacheAsTexture()

> **cacheAsTexture**: (`val`) => `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/cacheAsTextureMixin.d.ts:14

Caches this container as a texture. This allows the container to be rendered as a single texture,
which can improve performance for complex static containers.

#### Parameters

##### val

If true, enables caching with default options. If false, disables caching.
Can also pass options object to configure caching behavior.

`boolean` | `CacheAsTextureOptions`

#### Returns

`void`

#### Memberof

scene.Container#

#### Inherited from

`ViewContainer.cacheAsTexture`

***

### children

> `readonly` **children**: `ContainerChild`[]

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:308

The array of children of this container.

#### Inherited from

`ViewContainer.children`

***

### cullable?

> `optional` **cullable**: `boolean`

Defined in: node\_modules/pixi.js/lib/culling/cullingMixin.d.ts:17

Should this object be rendered if the bounds of this object are out of frame?

Culling has no effect on whether updateTransform is called.

#### Default

```ts
false
```

#### Memberof

scene.Container#

#### Inherited from

`ViewContainer.cullable`

***

### cullableChildren?

> `optional` **cullableChildren**: `boolean`

Defined in: node\_modules/pixi.js/lib/culling/cullingMixin.d.ts:25

Determines if the children to the container can be culled
Setting this to false allows PixiJS to bypass a recursive culling function
Which can help to optimize very complex scenes

#### Default

```ts
true
```

#### Memberof

scene.Container#

#### Inherited from

`ViewContainer.cullableChildren`

***

### cullArea?

> `optional` **cullArea**: `Rectangle`

Defined in: node\_modules/pixi.js/lib/culling/cullingMixin.d.ts:9

If set, this shape is used for culling instead of the bounds of this object.
It can improve the culling performance of objects with many children.
The culling area is defined in local space.

#### Memberof

scene.Container#

#### Inherited from

`ViewContainer.cullArea`

***

### cursor?

> `optional` **cursor**: `string`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:61

The cursor preferred when the mouse pointer is hovering over.

#### Inherited from

`ViewContainer.cursor`

***

### depthOfChildModified()

> **depthOfChildModified**: () => `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:10

#### Returns

`void`

#### Inherited from

`ViewContainer.depthOfChildModified`

***

### destroyed

> **destroyed**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:350

If the object has been destroyed via destroy(). If true, it should not be used.

#### Inherited from

`ViewContainer.destroyed`

***

### effects?

> `optional` **effects**: `Effect`[]

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:24

#### Inherited from

`ViewContainer.effects`

***

### eventMode?

> `optional` **eventMode**: `EventMode`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:63

The mode of interaction for this object

#### Inherited from

`ViewContainer.eventMode`

***

### filterArea?

> `optional` **filterArea**: `Rectangle`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:23

#### Inherited from

`ViewContainer.filterArea`

***

### filters

> **filters**: `Filter` \| `Filter`[]

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:10

#### Inherited from

`ViewContainer.filters`

***

### groupAlpha

> **groupAlpha**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:411

#### Inherited from

`ViewContainer.groupAlpha`

***

### groupColor

> **groupColor**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:412

#### Inherited from

`ViewContainer.groupColor`

***

### groupColorAlpha

> **groupColorAlpha**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:413

#### Inherited from

`ViewContainer.groupColorAlpha`

***

### groupTransform

> `readonly` **groupTransform**: `Matrix`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:347

The group transform is a transform relative to the render group it belongs too.
If this container is render group then this will be an identity matrix. other wise it
will be the same as the relativeGroupTransform.
Use this value when actually rendering things to the screen

#### Inherited from

`ViewContainer.groupTransform`

***

### hitArea?

> `optional` **hitArea**: `null` \| `IHitArea`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:69

The hit-area specifies the area for which pointer events should be captured by this event target.

#### Inherited from

`ViewContainer.hitArea`

***

### interactive?

> `optional` **interactive**: `boolean`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:65

Whether this event target should fire UI events.

#### Inherited from

`ViewContainer.interactive`

***

### interactiveChildren?

> `optional` **interactiveChildren**: `boolean`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:67

Whether this event target has any children that need UI events. This can be used optimize event propagation.

#### Inherited from

`ViewContainer.interactiveChildren`

***

### isCachedAsTexture

> `readonly` **isCachedAsTexture**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/cacheAsTextureMixin.d.ts:33

Whether this container is currently cached as a texture.

#### Memberof

scene.Container#

#### Inherited from

`ViewContainer.isCachedAsTexture`

***

### isInteractive()

> **isInteractive**: () => `boolean`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:146

Returns true if the Container has interactive 'static' or 'dynamic'

#### Returns

`boolean`

#### Inherited from

`ViewContainer.isInteractive`

***

### label

> **label**: `string`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/findMixin.d.ts:3

#### Inherited from

`ViewContainer.label`

***

### layerParentId

> **layerParentId**: `string`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:459

#### Inherited from

`ViewContainer.layerParentId`

***

### localAlpha

> **localAlpha**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:410

#### Inherited from

`ViewContainer.localAlpha`

***

### localColor

> **localColor**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:409

#### Inherited from

`ViewContainer.localColor`

***

### localTransform

> `readonly` **localTransform**: `Matrix`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:332

Current transform of the object based on local factors: position, scale, other stuff.

#### Inherited from

`ViewContainer.localTransform`

***

### mask

> **mask**: `Mask`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:8

#### Inherited from

`ViewContainer.mask`

***

### ~~name~~

> **name**: `string`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/findMixin.d.ts:10

#### Deprecated

since 8.0.0

#### See

Container#label

#### Inherited from

`ViewContainer.name`

***

### onclick?

> `optional` **onclick**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:71

Handler for 'click' event

#### Inherited from

`ViewContainer.onclick`

***

### onglobalmousemove?

> `optional` **onglobalmousemove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:81

Handler for 'globalmousemove' event

#### Inherited from

`ViewContainer.onglobalmousemove`

***

### onglobalpointermove?

> `optional` **onglobalpointermove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:101

Handler for 'globalpointermove' event

#### Inherited from

`ViewContainer.onglobalpointermove`

***

### onglobaltouchmove?

> `optional` **onglobaltouchmove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:131

Handler for 'globaltouchmove' event

#### Inherited from

`ViewContainer.onglobaltouchmove`

***

### onmousedown?

> `optional` **onmousedown**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:73

Handler for 'mousedown' event

#### Inherited from

`ViewContainer.onmousedown`

***

### onmouseenter?

> `optional` **onmouseenter**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:75

Handler for 'mouseenter' event

#### Inherited from

`ViewContainer.onmouseenter`

***

### onmouseleave?

> `optional` **onmouseleave**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:77

Handler for 'mouseleave' event

#### Inherited from

`ViewContainer.onmouseleave`

***

### onmousemove?

> `optional` **onmousemove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:79

Handler for 'mousemove' event

#### Inherited from

`ViewContainer.onmousemove`

***

### onmouseout?

> `optional` **onmouseout**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:83

Handler for 'mouseout' event

#### Inherited from

`ViewContainer.onmouseout`

***

### onmouseover?

> `optional` **onmouseover**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:85

Handler for 'mouseover' event

#### Inherited from

`ViewContainer.onmouseover`

***

### onmouseup?

> `optional` **onmouseup**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:87

Handler for 'mouseup' event

#### Inherited from

`ViewContainer.onmouseup`

***

### onmouseupoutside?

> `optional` **onmouseupoutside**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:89

Handler for 'mouseupoutside' event

#### Inherited from

`ViewContainer.onmouseupoutside`

***

### onpointercancel?

> `optional` **onpointercancel**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:91

Handler for 'pointercancel' event

#### Inherited from

`ViewContainer.onpointercancel`

***

### onpointerdown?

> `optional` **onpointerdown**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:93

Handler for 'pointerdown' event

#### Inherited from

`ViewContainer.onpointerdown`

***

### onpointerenter?

> `optional` **onpointerenter**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:95

Handler for 'pointerenter' event

#### Inherited from

`ViewContainer.onpointerenter`

***

### onpointerleave?

> `optional` **onpointerleave**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:97

Handler for 'pointerleave' event

#### Inherited from

`ViewContainer.onpointerleave`

***

### onpointermove?

> `optional` **onpointermove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:99

Handler for 'pointermove' event

#### Inherited from

`ViewContainer.onpointermove`

***

### onpointerout?

> `optional` **onpointerout**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:103

Handler for 'pointerout' event

#### Inherited from

`ViewContainer.onpointerout`

***

### onpointerover?

> `optional` **onpointerover**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:105

Handler for 'pointerover' event

#### Inherited from

`ViewContainer.onpointerover`

***

### onpointertap?

> `optional` **onpointertap**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:107

Handler for 'pointertap' event

#### Inherited from

`ViewContainer.onpointertap`

***

### onpointerup?

> `optional` **onpointerup**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:109

Handler for 'pointerup' event

#### Inherited from

`ViewContainer.onpointerup`

***

### onpointerupoutside?

> `optional` **onpointerupoutside**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:111

Handler for 'pointerupoutside' event

#### Inherited from

`ViewContainer.onpointerupoutside`

***

### onRender()

> **onRender**: (`renderer`) => `null` \| `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/onRenderMixin.d.ts:4

#### Parameters

##### renderer

`Renderer`

#### Returns

`null` \| `void`

#### Inherited from

`ViewContainer.onRender`

***

### onrightclick?

> `optional` **onrightclick**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:113

Handler for 'rightclick' event

#### Inherited from

`ViewContainer.onrightclick`

***

### onrightdown?

> `optional` **onrightdown**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:115

Handler for 'rightdown' event

#### Inherited from

`ViewContainer.onrightdown`

***

### onrightup?

> `optional` **onrightup**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:117

Handler for 'rightup' event

#### Inherited from

`ViewContainer.onrightup`

***

### onrightupoutside?

> `optional` **onrightupoutside**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:119

Handler for 'rightupoutside' event

#### Inherited from

`ViewContainer.onrightupoutside`

***

### ontap?

> `optional` **ontap**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:121

Handler for 'tap' event

#### Inherited from

`ViewContainer.ontap`

***

### ontouchcancel?

> `optional` **ontouchcancel**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:123

Handler for 'touchcancel' event

#### Inherited from

`ViewContainer.ontouchcancel`

***

### ontouchend?

> `optional` **ontouchend**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:125

Handler for 'touchend' event

#### Inherited from

`ViewContainer.ontouchend`

***

### ontouchendoutside?

> `optional` **ontouchendoutside**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:127

Handler for 'touchendoutside' event

#### Inherited from

`ViewContainer.ontouchendoutside`

***

### ontouchmove?

> `optional` **ontouchmove**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:129

Handler for 'touchmove' event

#### Inherited from

`ViewContainer.ontouchmove`

***

### ontouchstart?

> `optional` **ontouchstart**: `null` \| `FederatedEventHandler`\<`FederatedPointerEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:133

Handler for 'touchstart' event

#### Inherited from

`ViewContainer.ontouchstart`

***

### onwheel?

> `optional` **onwheel**: `null` \| `FederatedEventHandler`\<`FederatedWheelEvent`\>

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:135

Handler for 'wheel' event

#### Inherited from

`ViewContainer.onwheel`

***

### parent

> **parent**: [`Container`](Container.md)

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:310

The display object container that contains this display object.

#### Inherited from

`ViewContainer.parent`

***

### parentRenderLayer

> `readonly` **parentRenderLayer**: `IRenderLayer`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:322

The RenderLayer this container belongs to, if any.
If it belongs to a RenderLayer, it will be rendered from the RenderLayer's position in the scene.

#### Inherited from

`ViewContainer.parentRenderLayer`

***

### relativeGroupTransform

> `readonly` **relativeGroupTransform**: `Matrix`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:339

The relative group transform is a transform relative to the render group it belongs too. It will include all parent
transforms and up to the render group (think of it as kind of like a stage - but the stage can be nested).
If this container is is self a render group matrix will be relative to its parent render group

#### Inherited from

`ViewContainer.relativeGroupTransform`

***

### setMask()

> **setMask**: (`options`) => `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:9

#### Parameters

##### options

`Partial`\<`MaskOptionsAndMask`\>

#### Returns

`void`

#### Inherited from

`ViewContainer.setMask`

***

### sortableChildren

> **sortableChildren**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:5

#### Inherited from

`ViewContainer.sortableChildren`

***

### sortChildren()

> **sortChildren**: () => `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:9

#### Returns

`void`

#### Inherited from

`ViewContainer.sortChildren`

***

### sortDirty

> **sortDirty**: `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:4

#### Inherited from

`ViewContainer.sortDirty`

***

### tabIndex?

> `optional` **tabIndex**: `number`

Defined in: node\_modules/pixi.js/lib/accessibility/accessibilityTarget.d.ts:42

#### Default

```ts
0
```

#### Inherited from

`ViewContainer.tabIndex`

***

### uid

> `readonly` **uid**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:289

unique id for this container

#### Inherited from

`ViewContainer.uid`

***

### updateCacheTexture()

> **updateCacheTexture**: () => `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/cacheAsTextureMixin.d.ts:20

Updates the cached texture of this container. This will flag the container's cached texture
to be redrawn on the next render.

#### Returns

`void`

#### Memberof

scene.Container#

#### Inherited from

`ViewContainer.updateCacheTexture`

***

### zIndex

> **zIndex**: `number`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/sortMixin.d.ts:3

#### Inherited from

`ViewContainer.zIndex`

***

### prefixed

> `static` **prefixed**: `string` \| `boolean`

Defined in: node\_modules/eventemitter3/index.d.ts:9

## Accessors

### \_didChangeId

#### Get Signature

> **get** **\_didChangeId**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:466

##### Returns

`number`

#### Inherited from

`ViewContainer._didChangeId`

***

### alpha

#### Get Signature

> **get** **alpha**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:616

The opacity of the object.

##### Returns

`number`

#### Set Signature

> **set** **alpha**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:614

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

`ViewContainer.alpha`

***

### angle

#### Get Signature

> **get** **angle**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:538

The angle of the object in degrees.
'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.

##### Returns

`number`

#### Set Signature

> **set** **angle**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:539

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

`ViewContainer.angle`

***

### blendMode

#### Get Signature

> **get** **blendMode**(): `BLEND_MODES`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:630

The blend mode to be applied to the sprite. Apply a value of `'normal'` to reset the blend mode.

##### Default

```ts
'normal'
```

##### Returns

`BLEND_MODES`

#### Set Signature

> **set** **blendMode**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:625

##### Parameters

###### value

`BLEND_MODES`

##### Returns

`void`

#### Inherited from

`ViewContainer.blendMode`

***

### bounds

#### Get Signature

> **get** **bounds**(): `Bounds`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:54

The local bounds of the graphic.

##### Returns

`Bounds`

#### Inherited from

`ViewContainer.bounds`

***

### context

#### Get Signature

> **get** **context**(): `GraphicsContext`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:49

##### Returns

`GraphicsContext`

#### Set Signature

> **set** **context**(`context`): `void`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:48

##### Parameters

###### context

`GraphicsContext`

##### Returns

`void`

***

### fillStyle

#### Get Signature

> **get** **fillStyle**(): `ConvertedFillStyle`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:441

The fill style to use.

##### Returns

`ConvertedFillStyle`

#### Set Signature

> **set** **fillStyle**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:442

##### Parameters

###### value

`FillInput`

##### Returns

`void`

***

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:573

The height of the Container, setting this will actually modify the scale to achieve the value set.

##### Memberof

scene.Container#

##### Returns

`number`

#### Set Signature

> **set** **height**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:574

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

`ViewContainer.height`

***

### isRenderable

#### Get Signature

> **get** **isRenderable**(): `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:642

Whether or not the object should be rendered.

##### Returns

`boolean`

#### Inherited from

`ViewContainer.isRenderable`

***

### isRenderGroup

#### Get Signature

> **get** **isRenderGroup**(): `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:494

Returns true if this container is a render group.
This means that it will be rendered as a separate pass, with its own set of instructions

##### Returns

`boolean`

#### Set Signature

> **set** **isRenderGroup**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:489

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

`ViewContainer.isRenderGroup`

***

### pivot

#### Get Signature

> **get** **pivot**(): `ObservablePoint`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:547

The center of rotation, scaling, and skewing for this display object in its local space. The `position`
is the projection of `pivot` in the parent's local space.

By default, the pivot is the origin (0, 0).

##### Since

4.0.0

##### Returns

`ObservablePoint`

#### Set Signature

> **set** **pivot**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:548

##### Parameters

###### value

`number` | `PointData`

##### Returns

`void`

#### Inherited from

`ViewContainer.pivot`

***

### position

#### Get Signature

> **get** **position**(): `ObservablePoint`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:526

The coordinate of the object relative to the local coordinates of the parent.

##### Since

4.0.0

##### Returns

`ObservablePoint`

#### Set Signature

> **set** **position**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:527

##### Parameters

###### value

`PointData`

##### Returns

`void`

#### Inherited from

`ViewContainer.position`

***

### renderable

#### Get Signature

> **get** **renderable**(): `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:639

Can this object be rendered, if false the object will not be drawn but the transform will still be updated.

##### Returns

`boolean`

#### Set Signature

> **set** **renderable**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:640

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

`ViewContainer.renderable`

***

### rotation

#### Get Signature

> **get** **rotation**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:532

The rotation of the object in radians.
'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.

##### Returns

`number`

#### Set Signature

> **set** **rotation**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:533

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

`ViewContainer.rotation`

***

### roundPixels

#### Get Signature

> **get** **roundPixels**(): `boolean`

Defined in: node\_modules/pixi.js/lib/scene/view/ViewContainer.d.ts:43

Whether or not to round the x/y position of the sprite.

##### Returns

`boolean`

#### Set Signature

> **set** **roundPixels**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/view/ViewContainer.d.ts:44

Whether or not to round the x/y position of the object.

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

`ViewContainer.roundPixels`

***

### scale

#### Get Signature

> **get** **scale**(): `ObservablePoint`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:561

The scale factors of this object along the local coordinate axes.

The default scale is (1, 1).

##### Since

4.0.0

##### Returns

`ObservablePoint`

#### Set Signature

> **set** **scale**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:562

##### Parameters

###### value

`number` | `PointData`

##### Returns

`void`

#### Inherited from

`ViewContainer.scale`

***

### skew

#### Get Signature

> **get** **skew**(): `ObservablePoint`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:553

The skew factor for the object in radians.

##### Since

4.0.0

##### Returns

`ObservablePoint`

#### Set Signature

> **set** **skew**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:554

##### Parameters

###### value

`PointData`

##### Returns

`void`

#### Inherited from

`ViewContainer.skew`

***

### strokeStyle

#### Get Signature

> **get** **strokeStyle**(): `ConvertedStrokeStyle`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:447

The stroke style to use.

##### Returns

`ConvertedStrokeStyle`

#### Set Signature

> **set** **strokeStyle**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:448

##### Parameters

###### value

`StrokeStyle`

##### Returns

`void`

***

### tint

#### Get Signature

> **get** **tint**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:624

The tint applied to the sprite. This is a hex value.

A value of 0xFFFFFF will remove any tint effect.

##### Default

```ts
0xFFFFFF
```

##### Returns

`number`

#### Set Signature

> **set** **tint**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:617

##### Parameters

###### value

`ColorSource`

##### Returns

`void`

#### Inherited from

`ViewContainer.tint`

***

### visible

#### Get Signature

> **get** **visible**(): `boolean`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:632

The visibility of the object. If false the object will not be drawn, and the transform will not be updated.

##### Returns

`boolean`

#### Set Signature

> **set** **visible**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:633

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

`ViewContainer.visible`

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:567

The width of the Container, setting this will actually modify the scale to achieve the value set.

##### Memberof

scene.Container#

##### Returns

`number`

#### Set Signature

> **set** **width**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:568

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

`ViewContainer.width`

***

### worldTransform

#### Get Signature

> **get** **worldTransform**(): `Matrix`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:509

Current transform of the object based on world (parent) factors.

##### Returns

`Matrix`

#### Inherited from

`ViewContainer.worldTransform`

***

### x

#### Get Signature

> **get** **x**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:514

The position of the container on the x axis relative to the local coordinates of the parent.
An alias to position.x

##### Returns

`number`

#### Set Signature

> **set** **x**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:515

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

`ViewContainer.x`

***

### y

#### Get Signature

> **get** **y**(): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:520

The position of the container on the y axis relative to the local coordinates of the parent.
An alias to position.y

##### Returns

`number`

#### Set Signature

> **set** **y**(`value`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:521

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

`ViewContainer.y`

## Methods

### \_getGlobalBoundsRecursive()

> **\_getGlobalBoundsRecursive**(`factorRenderLayers`, `bounds`, `currentLayer`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/getFastGlobalBoundsMixin.d.ts:30

Recursively calculates the global bounds for the container and its children.
This method is used internally by getFastGlobalBounds to traverse the scene graph.

#### Parameters

##### factorRenderLayers

`boolean`

A flag indicating whether to consider render layers in the calculation.

##### bounds

`Bounds`

The bounds object to update with the calculated values.

##### currentLayer

`IRenderLayer`

The current render layer being processed.

#### Returns

`void`

#### Memberof

scene.Container#

#### Inherited from

`ViewContainer._getGlobalBoundsRecursive`

***

### \_markStructureAsChanged()

> **\_markStructureAsChanged**(): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:25

#### Returns

`void`

#### Inherited from

`ViewContainer._markStructureAsChanged`

***

### \_setHeight()

> **\_setHeight**(`height`, `localHeight`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/measureMixin.d.ts:18

#### Parameters

##### height

`number`

##### localHeight

`number`

#### Returns

`void`

#### Inherited from

`ViewContainer._setHeight`

***

### \_setWidth()

> **\_setWidth**(`width`, `localWidth`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/measureMixin.d.ts:17

#### Parameters

##### width

`number`

##### localWidth

`number`

#### Returns

`void`

#### Inherited from

`ViewContainer._setWidth`

***

### addChild()

> **addChild**\<`U`\>(...`children`): `U`\[`0`\]

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:480

Adds one or more children to the container.

Multiple items can be added like so: `myContainer.addChild(thingOne, thingTwo, thingThree)`

#### Type Parameters

##### U

`U` *extends* (`ContainerChild` \| `IRenderLayer`)[]

#### Parameters

##### children

...`U`

The Container(s) to add to the container

#### Returns

`U`\[`0`\]

- The first child that was added.

#### Inherited from

`ViewContainer.addChild`

***

### addChildAt()

> **addChildAt**\<`U`\>(`child`, `index`): `U`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:12

#### Type Parameters

##### U

`U` *extends* `ContainerChild` \| `IRenderLayer`

#### Parameters

##### child

`U`

##### index

`number`

#### Returns

`U`

#### Inherited from

`ViewContainer.addChildAt`

***

### addEffect()

> **addEffect**(`effect`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:26

#### Parameters

##### effect

`Effect`

#### Returns

`void`

#### Inherited from

`ViewContainer.addEffect`

***

### addEventListener()

#### Call Signature

> **addEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:147

##### Type Parameters

###### K

`K` *extends* keyof FederatedEventMap \| keyof GlobalFederatedEventMap

##### Parameters

###### type

`K`

###### listener

(`e`) => `any`

###### options?

`AddListenerOptions`

##### Returns

`void`

##### Inherited from

`ViewContainer.addEventListener`

#### Call Signature

> **addEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:148

##### Parameters

###### type

`string`

###### listener

`EventListenerOrEventListenerObject`

###### options?

`AddListenerOptions`

##### Returns

`void`

##### Inherited from

`ViewContainer.addEventListener`

***

### addListener()

> **addListener**\<`T`\>(`event`, `fn`, `context?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:45

#### Type Parameters

##### T

`T` *extends* keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent

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

`ViewContainer.addListener`

***

### arc()

> **arc**(`x`, `y`, `radius`, `startAngle`, `endAngle`, `counterclockwise?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:158

Adds an arc to the current path, which is centered at (x, y) with the specified radius,
starting and ending angles, and direction.

#### Parameters

##### x

`number`

The x-coordinate of the arc's center.

##### y

`number`

The y-coordinate of the arc's center.

##### radius

`number`

The arc's radius.

##### startAngle

`number`

The starting angle, in radians.

##### endAngle

`number`

The ending angle, in radians.

##### counterclockwise?

`boolean`

(Optional) Specifies whether the arc is drawn counterclockwise (true) or clockwise
(false). Defaults to false.

#### Returns

`this`

The instance of the current GraphicsContext for method chaining.

***

### arcTo()

> **arcTo**(`x1`, `y1`, `x2`, `y2`, `radius`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:169

Adds an arc to the current path with the given control points and radius, connected to the previous point
by a straight line if necessary.

#### Parameters

##### x1

`number`

The x-coordinate of the first control point.

##### y1

`number`

The y-coordinate of the first control point.

##### x2

`number`

The x-coordinate of the second control point.

##### y2

`number`

The y-coordinate of the second control point.

##### radius

`number`

The arc's radius.

#### Returns

`this`

The instance of the current GraphicsContext for method chaining.

***

### arcToSvg()

> **arcToSvg**(`rx`, `ry`, `xAxisRotation`, `largeArcFlag`, `sweepFlag`, `x`, `y`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:182

Adds an SVG-style arc to the path, allowing for elliptical arcs based on the SVG spec.

#### Parameters

##### rx

`number`

The x-radius of the ellipse.

##### ry

`number`

The y-radius of the ellipse.

##### xAxisRotation

`number`

The rotation of the ellipse's x-axis relative
to the x-axis of the coordinate system, in degrees.

##### largeArcFlag

`number`

Determines if the arc should be greater than or less than 180 degrees.

##### sweepFlag

`number`

Determines if the arc should be swept in a positive angle direction.

##### x

`number`

The x-coordinate of the arc's end point.

##### y

`number`

The y-coordinate of the arc's end point.

#### Returns

`this`

The instance of the current object for chaining.

***

### ~~beginFill()~~

> **beginFill**(`color`, `alpha?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:470

#### Parameters

##### color

`ColorSource`

##### alpha?

`number`

#### Returns

`this`

#### Deprecated

since 8.0.0 Use [Graphics#fill](#fill) instead

***

### beginPath()

> **beginPath**(): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:139

Resets the current path. Any previous path and its commands are discarded and a new path is
started. This is typically called before beginning a new shape or series of drawing commands.

#### Returns

`this`

The instance of the current GraphicsContext for method chaining.

***

### bezierCurveTo()

> **bezierCurveTo**(`cp1x`, `cp1y`, `cp2x`, `cp2y`, `x`, `y`, `smoothness?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:196

Adds a cubic Bezier curve to the path.
It requires three points: the first two are control points and the third one is the end point.
The starting point is the last point in the current path.

#### Parameters

##### cp1x

`number`

The x-coordinate of the first control point.

##### cp1y

`number`

The y-coordinate of the first control point.

##### cp2x

`number`

The x-coordinate of the second control point.

##### cp2y

`number`

The y-coordinate of the second control point.

##### x

`number`

The x-coordinate of the end point.

##### y

`number`

The y-coordinate of the end point.

##### smoothness?

`number`

Optional parameter to adjust the smoothness of the curve.

#### Returns

`this`

The instance of the current object for chaining.

***

### chamferRect()

> **chamferRect**(`x`, `y`, `width`, `height`, `chamfer`, `transform?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:339

Draw Rectangle with chamfer corners. These are angled corners.

#### Parameters

##### x

`number`

Upper left corner of rect

##### y

`number`

Upper right corner of rect

##### width

`number`

Width of rect

##### height

`number`

Height of rect

##### chamfer

`number`

non-zero real number, size of corner cutout

##### transform?

`Matrix`

#### Returns

`this`

***

### circle()

> **circle**(`x`, `y`, `radius`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:220

Draws a circle shape. This method adds a new circle path to the current drawing.

#### Parameters

##### x

`number`

The x-coordinate of the center of the circle.

##### y

`number`

The y-coordinate of the center of the circle.

##### radius

`number`

The radius of the circle.

#### Returns

`this`

The instance of the current object for chaining.

***

### clear()

> **clear**(): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:436

Clears all drawing commands from the graphics context, effectively resetting it. This includes clearing the path,
and optionally resetting transformations to the identity matrix.

#### Returns

`this`

The instance of the current GraphicsContext for method chaining.

***

### clone()

> **clone**(`deep?`): `Graphics`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:457

Creates a new Graphics object.
Note that only the context of the object is cloned, not its transform (position,scale,etc)

#### Parameters

##### deep?

`boolean`

Whether to create a deep clone of the graphics object. If false, the context
will be shared between the two objects (default false). If true, the context will be
cloned (recommended if you need to modify the context in any way).

#### Returns

`Graphics`

- A clone of the graphics object

***

### closePath()

> **closePath**(): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:202

Closes the current path by drawing a straight line back to the start.
If the shape is already closed or there are no points in the path, this method does nothing.

#### Returns

`this`

The instance of the current object for chaining.

***

### collectRenderables()

> **collectRenderables**(`instructionSet`, `renderer`, `currentLayer`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/collectRenderablesMixin.d.ts:19

Collects all renderables from the container and its children, adding them to the instruction set.
This method decides whether to use a simple or advanced collection method based on the container's properties.

#### Parameters

##### instructionSet

`InstructionSet`

The set of instructions to which the renderables will be added.

##### renderer

`Renderer`

The renderer responsible for rendering the scene.

##### currentLayer

`IRenderLayer`

The current render layer being processed.

#### Returns

`void`

#### Memberof

scene.Container#

#### Inherited from

`ViewContainer.collectRenderables`

***

### collectRenderablesSimple()

> **collectRenderablesSimple**(`instructionSet`, `renderer`, `currentLayer`): `void`

Defined in: node\_modules/pixi.js/lib/scene/view/ViewContainer.d.ts:56

Collects renderables using a simple method, suitable for containers marked as simple.
This method iterates over the container's children and adds their renderables to the instruction set.

#### Parameters

##### instructionSet

`InstructionSet`

The set of instructions to which the renderables will be added.

##### renderer

`Renderer`

The renderer responsible for rendering the scene.

##### currentLayer

`IRenderLayer`

The current render layer being processed.

#### Returns

`void`

#### Memberof

scene.Container#

#### Inherited from

`ViewContainer.collectRenderablesSimple`

***

### collectRenderablesWithEffects()

> **collectRenderablesWithEffects**(`instructionSet`, `renderer`, `currentLayer`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/collectRenderablesMixin.d.ts:37

Collects renderables using an advanced method, suitable for containers with complex processing needs.
This method handles additional effects and transformations that may be applied to the renderables.

#### Parameters

##### instructionSet

`InstructionSet`

The set of instructions to which the renderables will be added.

##### renderer

`Renderer`

The renderer responsible for rendering the scene.

##### currentLayer

`IRenderLayer`

The current render layer being processed.

#### Returns

`void`

#### Memberof

scene.Container#

#### Inherited from

`ViewContainer.collectRenderablesWithEffects`

***

### containsPoint()

> **containsPoint**(`point`): `boolean`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:64

Checks if the object contains the given point.

#### Parameters

##### point

`PointData`

The point to check

#### Returns

`boolean`

#### Inherited from

`ViewContainer.containsPoint`

***

### cut()

> **cut**(): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:145

Applies a cutout to the last drawn shape. This is used to create holes or complex shapes by
subtracting a path from the previously drawn path. If a hole is not completely in a shape, it will
fail to cut correctly!

#### Returns

`this`

***

### destroy()

> **destroy**(`options?`): `void`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:80

Destroys this graphics renderable and optionally its context.

#### Parameters

##### options?

`DestroyOptions`

Options parameter. A boolean will act as if all options

If the context was created by this graphics and `destroy(false)` or `destroy()` is called
then the context will still be destroyed.

If you want to explicitly not destroy this context that this graphics created,
then you should pass destroy({ context: false })

If the context was passed in as an argument to the constructor then it will not be destroyed

#### Returns

`void`

#### Inherited from

`ViewContainer.destroy`

***

### disableRenderGroup()

> **disableRenderGroup**(): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:502

This will disable the render group for this container.

#### Returns

`void`

#### Inherited from

`ViewContainer.disableRenderGroup`

***

### dispatchEvent()

> **dispatchEvent**(`e`): `boolean`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:151

#### Parameters

##### e

`FederatedEvent`

#### Returns

`boolean`

#### Inherited from

`ViewContainer.dispatchEvent`

***

### ~~drawCircle()~~

> **drawCircle**(...`args`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:479

#### Parameters

##### args

...\[`number`, `number`, `number`\]

#### Returns

`this`

#### Deprecated

since 8.0.0 Use [Graphics#circle](#circle) instead

***

### ~~drawEllipse()~~

> **drawEllipse**(...`args`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:484

#### Parameters

##### args

...\[`number`, `number`, `number`, `number`\]

#### Returns

`this`

#### Deprecated

since 8.0.0 Use [Graphics#ellipse](#ellipse) instead

***

### ~~drawPolygon()~~

> **drawPolygon**(...`args`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:489

#### Parameters

##### args

...\[`number`[] \| `PointData`[], `boolean`\]

#### Returns

`this`

#### Deprecated

since 8.0.0 Use [Graphics#poly](#poly) instead

***

### ~~drawRect()~~

> **drawRect**(...`args`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:494

#### Parameters

##### args

...\[`number`, `number`, `number`, `number`\]

#### Returns

`this`

#### Deprecated

since 8.0.0 Use [Graphics#rect](#rect) instead

***

### ~~drawRoundedRect()~~

> **drawRoundedRect**(...`args`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:499

#### Parameters

##### args

...\[`number`, `number`, `number`, `number`, `number`\]

#### Returns

`this`

#### Deprecated

since 8.0.0 Use [Graphics#roundRect](#roundrect) instead

***

### ~~drawStar()~~

> **drawStar**(...`args`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:504

#### Parameters

##### args

...\[`number`, `number`, `number`, `number`, `number`, `number`\]

#### Returns

`this`

#### Deprecated

since 8.0.0 Use [Graphics#star](#star) instead

***

### ellipse()

> **ellipse**(`x`, `y`, `radiusX`, `radiusY`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:212

Draws an ellipse at the specified location and with the given x and y radii.
An optional transformation can be applied, allowing for rotation, scaling, and translation.

#### Parameters

##### x

`number`

The x-coordinate of the center of the ellipse.

##### y

`number`

The y-coordinate of the center of the ellipse.

##### radiusX

`number`

The horizontal radius of the ellipse.

##### radiusY

`number`

The vertical radius of the ellipse.

#### Returns

`this`

The instance of the current object for chaining.

***

### emit()

> **emit**\<`T`\>(`event`, ...`args`): `boolean`

Defined in: node\_modules/eventemitter3/index.d.ts:32

Calls each of the listeners registered for a given event.

#### Type Parameters

##### T

`T` *extends* keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent

#### Parameters

##### event

`T`

##### args

...`ArgumentMap`\<`ContainerEvents`\<`ContainerChild`\> & `AnyEvent`\>\[`Extract`\<`T`, keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent\>\]

#### Returns

`boolean`

#### Inherited from

`ViewContainer.emit`

***

### enableRenderGroup()

> **enableRenderGroup**(): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:500

Calling this enables a render group for this container.
This means it will be rendered as a separate set of instructions.
The transform of the container will also be handled on the GPU rather than the CPU.

#### Returns

`void`

#### Inherited from

`ViewContainer.enableRenderGroup`

***

### ~~endFill()~~

> **endFill**(): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:474

#### Returns

`this`

#### Deprecated

since 8.0.0 Use [Graphics#fill](#fill) instead

***

### eventNames()

> **eventNames**(): (keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent)[]

Defined in: node\_modules/eventemitter3/index.d.ts:15

Return an array listing the events for which the emitter has registered
listeners.

#### Returns

(keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent)[]

#### Inherited from

`ViewContainer.eventNames`

***

### fill()

#### Call Signature

> **fill**(`style?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:105

Fills the current or given path with the current fill style. This method can optionally take
a color and alpha for a simple fill, or a more complex FillStyle object for advanced fills.

##### Parameters

###### style?

`FillInput`

(Optional) The style to fill the path with. Can be a color, gradient, pattern, or a
complex style object. If omitted, uses the current fill style.

##### Returns

`this`

The instance of the current GraphicsContext for method chaining.

#### Call Signature

> **fill**(`color`, `alpha?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:107

##### Parameters

###### color

`ColorSource`

###### alpha?

`number`

##### Returns

`this`

##### Deprecated

8.0.0

***

### filletRect()

> **filletRect**(`x`, `y`, `width`, `height`, `fillet`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:329

Draw Rectangle with fillet corners. This is much like rounded rectangle
however it support negative numbers as well for the corner radius.

#### Parameters

##### x

`number`

Upper left corner of rect

##### y

`number`

Upper right corner of rect

##### width

`number`

Width of rect

##### height

`number`

Height of rect

##### fillet

`number`

accept negative or positive values

#### Returns

`this`

***

### getBounds()

> **getBounds**(`skipUpdate?`, `bounds?`): `Bounds`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/measureMixin.d.ts:14

#### Parameters

##### skipUpdate?

`boolean`

##### bounds?

`Bounds`

#### Returns

`Bounds`

#### Inherited from

`ViewContainer.getBounds`

***

### getChildAt()

> **getChildAt**\<`U`\>(`index`): `U`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:9

#### Type Parameters

##### U

`U` *extends* `ContainerChild` \| `IRenderLayer`

#### Parameters

##### index

`number`

#### Returns

`U`

#### Inherited from

`ViewContainer.getChildAt`

***

### getChildByLabel()

> **getChildByLabel**(`label`, `deep?`): `null` \| [`Container`](Container.md)\<`ContainerChild`\>

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/findMixin.d.ts:12

#### Parameters

##### label

`string` | `RegExp`

##### deep?

`boolean`

#### Returns

`null` \| [`Container`](Container.md)\<`ContainerChild`\>

#### Inherited from

`ViewContainer.getChildByLabel`

***

### getChildByName()

> **getChildByName**(`label`, `deep?`): `null` \| [`Container`](Container.md)\<`ContainerChild`\>

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/findMixin.d.ts:11

#### Parameters

##### label

`string` | `RegExp`

##### deep?

`boolean`

#### Returns

`null` \| [`Container`](Container.md)\<`ContainerChild`\>

#### Inherited from

`ViewContainer.getChildByName`

***

### getChildIndex()

> **getChildIndex**(`child`): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:11

#### Parameters

##### child

`ContainerChild` | `IRenderLayer`

#### Returns

`number`

#### Inherited from

`ViewContainer.getChildIndex`

***

### getChildrenByLabel()

> **getChildrenByLabel**(`label`, `deep?`, `out?`): [`Container`](Container.md)\<`ContainerChild`\>[]

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/findMixin.d.ts:13

#### Parameters

##### label

`string` | `RegExp`

##### deep?

`boolean`

##### out?

[`Container`](Container.md)\<`ContainerChild`\>[]

#### Returns

[`Container`](Container.md)\<`ContainerChild`\>[]

#### Inherited from

`ViewContainer.getChildrenByLabel`

***

### getFastGlobalBounds()

> **getFastGlobalBounds**(`factorRenderLayers?`, `bounds?`): `Bounds`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/getFastGlobalBoundsMixin.d.ts:21

Computes an approximate global bounding box for the container and its children.
This method is optimized for speed by using axis-aligned bounding boxes (AABBs),
and uses the last render results from when it updated the transforms. This function does not update them.
which may result in slightly larger bounds but never smaller than the actual bounds.

for accurate (but less performant) results use `container.getGlobalBounds`

#### Parameters

##### factorRenderLayers?

`boolean`

A flag indicating whether to consider render layers in the calculation.

##### bounds?

`Bounds`

The output bounds object to store the result. If not provided, a new one is created.

#### Returns

`Bounds`

The computed bounds.

#### Memberof

scene.Container#

#### Inherited from

`ViewContainer.getFastGlobalBounds`

***

### getGlobalAlpha()

> **getGlobalAlpha**(`skipUpdate`): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/getGlobalMixin.d.ts:5

#### Parameters

##### skipUpdate

`boolean`

#### Returns

`number`

#### Inherited from

`ViewContainer.getGlobalAlpha`

***

### getGlobalPosition()

> **getGlobalPosition**(`point?`, `skipUpdate?`): `Point`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/toLocalGlobalMixin.d.ts:5

#### Parameters

##### point?

`Point`

##### skipUpdate?

`boolean`

#### Returns

`Point`

#### Inherited from

`ViewContainer.getGlobalPosition`

***

### getGlobalTint()

> **getGlobalTint**(`skipUpdate?`): `number`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/getGlobalMixin.d.ts:7

#### Parameters

##### skipUpdate?

`boolean`

#### Returns

`number`

#### Inherited from

`ViewContainer.getGlobalTint`

***

### getGlobalTransform()

> **getGlobalTransform**(`matrix`, `skipUpdate`): `Matrix`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/getGlobalMixin.d.ts:6

#### Parameters

##### matrix

`Matrix`

##### skipUpdate

`boolean`

#### Returns

`Matrix`

#### Inherited from

`ViewContainer.getGlobalTransform`

***

### getLocalBounds()

> **getLocalBounds**(`bounds?`): `Bounds`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/measureMixin.d.ts:13

#### Parameters

##### bounds?

`Bounds`

#### Returns

`Bounds`

#### Inherited from

`ViewContainer.getLocalBounds`

***

### getSize()

> **getSize**(`out?`): `Size`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:582

Retrieves the size of the container as a [Size]Size object.
This is faster than get the width and height separately.

#### Parameters

##### out?

`Size`

Optional object to store the size in.

#### Returns

`Size`

- The size of the container.

#### Memberof

scene.Container#

#### Inherited from

`ViewContainer.getSize`

***

### getTransform()

> **getTransform**(): `Matrix`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:374

Returns the current transformation matrix of the graphics context.

#### Returns

`Matrix`

The current transformation matrix.

***

### ~~lineStyle()~~

> **lineStyle**(`width?`, `color?`, `alpha?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:464

#### Parameters

##### width?

`number`

##### color?

`ColorSource`

##### alpha?

`number`

#### Returns

`this`

#### Deprecated

since 8.0.0 Use [Graphics#setStrokeStyle](#setstrokestyle) instead

***

### lineTo()

> **lineTo**(`x`, `y`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:233

Connects the current point to a new point with a straight line. This method updates the current path.

#### Parameters

##### x

`number`

The x-coordinate of the new point to connect to.

##### y

`number`

The y-coordinate of the new point to connect to.

#### Returns

`this`

The instance of the current object for chaining.

***

### listenerCount()

> **listenerCount**(`event`): `number`

Defined in: node\_modules/eventemitter3/index.d.ts:27

Return the number of listeners listening to a given event.

#### Parameters

##### event

keyof ContainerEvents\<ContainerChild\> | keyof AnyEvent

#### Returns

`number`

#### Inherited from

`ViewContainer.listenerCount`

***

### listeners()

> **listeners**\<`T`\>(`event`): (...`args`) => `void`[]

Defined in: node\_modules/eventemitter3/index.d.ts:20

Return the listeners registered for a given event.

#### Type Parameters

##### T

`T` *extends* keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent

#### Parameters

##### event

`T`

#### Returns

(...`args`) => `void`[]

#### Inherited from

`ViewContainer.listeners`

***

### moveTo()

> **moveTo**(`x`, `y`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:240

Sets the starting point for a new sub-path. Any subsequent drawing commands are considered part of this path.

#### Parameters

##### x

`number`

The x-coordinate for the starting point.

##### y

`number`

The y-coordinate for the starting point.

#### Returns

`this`

The instance of the current object for chaining.

***

### off()

> **off**\<`T`\>(`event`, `fn?`, `context?`, `once?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:69

#### Type Parameters

##### T

`T` *extends* keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent

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

`ViewContainer.off`

***

### on()

> **on**\<`T`\>(`event`, `fn`, `context?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:40

Add a listener for a given event.

#### Type Parameters

##### T

`T` *extends* keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent

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

`ViewContainer.on`

***

### once()

> **once**\<`T`\>(`event`, `fn`, `context?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:54

Add a one-time listener for a given event.

#### Type Parameters

##### T

`T` *extends* keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent

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

`ViewContainer.once`

***

### path()

> **path**(`path`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:226

Adds another `GraphicsPath` to this path, optionally applying a transformation.

#### Parameters

##### path

`GraphicsPath`

The `GraphicsPath` to add.

#### Returns

`this`

The instance of the current object for chaining.

***

### poly()

> **poly**(`points`, `close?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:282

Draws a polygon shape by specifying a sequence of points. This method allows for the creation of complex polygons,
which can be both open and closed. An optional transformation can be applied, enabling the polygon to be scaled,
rotated, or translated as needed.

#### Parameters

##### points

An array of numbers, or an array of PointData objects eg [{x,y}, {x,y}, {x,y}]
representing the x and y coordinates, of the polygon's vertices, in sequence.

`number`[] | `PointData`[]

##### close?

`boolean`

A boolean indicating whether to close the polygon path. True by default.

#### Returns

`this`

The instance of the current object for chaining further drawing commands.

***

### quadraticCurveTo()

> **quadraticCurveTo**(`cpx`, `cpy`, `x`, `y`, `smoothness?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:251

Adds a quadratic curve to the path. It requires two points: the control point and the end point.
The starting point is the last point in the current path.

#### Parameters

##### cpx

`number`

The x-coordinate of the control point.

##### cpy

`number`

The y-coordinate of the control point.

##### x

`number`

The x-coordinate of the end point.

##### y

`number`

The y-coordinate of the end point.

##### smoothness?

`number`

Optional parameter to adjust the smoothness of the curve.

#### Returns

`this`

The instance of the current object for chaining.

***

### rect()

> **rect**(`x`, `y`, `w`, `h`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:260

Draws a rectangle shape. This method adds a new rectangle path to the current drawing.

#### Parameters

##### x

`number`

The x-coordinate of the top-left corner of the rectangle.

##### y

`number`

The y-coordinate of the top-left corner of the rectangle.

##### w

`number`

The width of the rectangle.

##### h

`number`

The height of the rectangle.

#### Returns

`this`

The instance of the current object for chaining.

***

### regularPoly()

> **regularPoly**(`x`, `y`, `radius`, `sides`, `rotation?`, `transform?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:293

Draws a regular polygon with a specified number of sides. All sides and angles are equal.

#### Parameters

##### x

`number`

The x-coordinate of the center of the polygon.

##### y

`number`

The y-coordinate of the center of the polygon.

##### radius

`number`

The radius of the circumscribed circle of the polygon.

##### sides

`number`

The number of sides of the polygon. Must be 3 or more.

##### rotation?

`number`

The rotation angle of the polygon, in radians. Zero by default.

##### transform?

`Matrix`

An optional `Matrix` object to apply a transformation to the polygon.

#### Returns

`this`

The instance of the current object for chaining.

***

### removeAllListeners()

> **removeAllListeners**(`event?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:79

Remove all listeners, or those of the specified event.

#### Parameters

##### event?

keyof ContainerEvents\<ContainerChild\> | keyof AnyEvent

#### Returns

`this`

#### Inherited from

`ViewContainer.removeAllListeners`

***

### removeChild()

> **removeChild**\<`U`\>(...`children`): `U`\[`0`\]

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:486

Removes one or more children from the container.

#### Type Parameters

##### U

`U` *extends* (`ContainerChild` \| `IRenderLayer`)[]

#### Parameters

##### children

...`U`

The Container(s) to remove

#### Returns

`U`\[`0`\]

The first child that was removed.

#### Inherited from

`ViewContainer.removeChild`

***

### removeChildAt()

> **removeChildAt**\<`U`\>(`index`): `U`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:8

#### Type Parameters

##### U

`U` *extends* `ContainerChild` \| `IRenderLayer`

#### Parameters

##### index

`number`

#### Returns

`U`

#### Inherited from

`ViewContainer.removeChildAt`

***

### removeChildren()

> **removeChildren**(`beginIndex?`, `endIndex?`): `ContainerChild`[]

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:7

#### Parameters

##### beginIndex?

`number`

##### endIndex?

`number`

#### Returns

`ContainerChild`[]

#### Inherited from

`ViewContainer.removeChildren`

***

### removeEffect()

> **removeEffect**(`effect`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/effectsMixin.d.ts:27

#### Parameters

##### effect

`Effect`

#### Returns

`void`

#### Inherited from

`ViewContainer.removeEffect`

***

### removeEventListener()

#### Call Signature

> **removeEventListener**\<`K`\>(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:149

##### Type Parameters

###### K

`K` *extends* keyof FederatedEventMap \| keyof GlobalFederatedEventMap

##### Parameters

###### type

`K`

###### listener

(`e`) => `any`

###### options?

`RemoveListenerOptions`

##### Returns

`void`

##### Inherited from

`ViewContainer.removeEventListener`

#### Call Signature

> **removeEventListener**(`type`, `listener`, `options?`): `void`

Defined in: node\_modules/pixi.js/lib/events/FederatedEventTarget.d.ts:150

##### Parameters

###### type

`string`

###### listener

`EventListenerOrEventListenerObject`

###### options?

`RemoveListenerOptions`

##### Returns

`void`

##### Inherited from

`ViewContainer.removeEventListener`

***

### removeFromParent()

> **removeFromParent**(): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:14

#### Returns

`void`

#### Inherited from

`ViewContainer.removeFromParent`

***

### removeListener()

> **removeListener**\<`T`\>(`event`, `fn?`, `context?`, `once?`): `this`

Defined in: node\_modules/eventemitter3/index.d.ts:63

Remove the listeners of a given event.

#### Type Parameters

##### T

`T` *extends* keyof ContainerEvents\<ContainerChild\> \| keyof AnyEvent

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

`ViewContainer.removeListener`

***

### reparentChild()

> **reparentChild**\<`U`\>(...`child`): `U`\[`0`\]

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:15

#### Type Parameters

##### U

`U` *extends* `ContainerChild`[]

#### Parameters

##### child

...`U`

#### Returns

`U`\[`0`\]

#### Inherited from

`ViewContainer.reparentChild`

***

### reparentChildAt()

> **reparentChildAt**\<`U`\>(`child`, `index`): `U`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:16

#### Type Parameters

##### U

`U` *extends* `ContainerChild`

#### Parameters

##### child

`U`

##### index

`number`

#### Returns

`U`

#### Inherited from

`ViewContainer.reparentChildAt`

***

### resetTransform()

> **resetTransform**(): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:380

Resets the current transformation matrix to the identity matrix, effectively removing
any transformations (rotation, scaling, translation) previously applied.

#### Returns

`this`

The instance of the current GraphicsContext for method chaining.

***

### restore()

> **restore**(): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:367

Restores the most recently saved graphics state by popping the top of the graphics state stack.
This includes transformations, fill styles, and stroke styles.

#### Returns

`this`

***

### rotateTransform()

> **rotateTransform**(`angle`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:386

Applies a rotation transformation to the graphics context around the current origin.

#### Parameters

##### angle

`number`

The angle of rotation in radians.

#### Returns

`this`

The instance of the current GraphicsContext for method chaining.

***

### roundPoly()

> **roundPoly**(`x`, `y`, `radius`, `sides`, `corner`, `rotation?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:305

Draws a polygon with rounded corners.
Similar to `regularPoly` but with the ability to round the corners of the polygon.

#### Parameters

##### x

`number`

The x-coordinate of the center of the polygon.

##### y

`number`

The y-coordinate of the center of the polygon.

##### radius

`number`

The radius of the circumscribed circle of the polygon.

##### sides

`number`

The number of sides of the polygon. Must be 3 or more.

##### corner

`number`

The radius of the rounding of the corners.

##### rotation?

`number`

The rotation angle of the polygon, in radians. Zero by default.

#### Returns

`this`

The instance of the current object for chaining.

***

### roundRect()

> **roundRect**(`x`, `y`, `w`, `h`, `radius?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:272

Draws a rectangle with rounded corners.
The corner radius can be specified to determine how rounded the corners should be.
An optional transformation can be applied, which allows for rotation, scaling, and translation of the rectangle.

#### Parameters

##### x

`number`

The x-coordinate of the top-left corner of the rectangle.

##### y

`number`

The y-coordinate of the top-left corner of the rectangle.

##### w

`number`

The width of the rectangle.

##### h

`number`

The height of the rectangle.

##### radius?

`number`

The radius of the rectangle's corners. If not specified, corners will be sharp.

#### Returns

`this`

The instance of the current object for chaining.

***

### roundShape()

> **roundShape**(`points`, `radius`, `useQuadratic?`, `smoothness?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:319

Draws a shape with rounded corners. This function supports custom radius for each corner of the shape.
Optionally, corners can be rounded using a quadratic curve instead of an arc, providing a different aesthetic.

#### Parameters

##### points

`RoundedPoint`[]

An array of `RoundedPoint` representing the corners of the shape to draw.
A minimum of 3 points is required.

##### radius

`number`

The default radius for the corners.
This radius is applied to all corners unless overridden in `points`.

##### useQuadratic?

`boolean`

If set to true, rounded corners are drawn using a quadraticCurve
 method instead of an arc method. Defaults to false.

##### smoothness?

`number`

Specifies the smoothness of the curve when `useQuadratic` is true.
Higher values make the curve smoother.

#### Returns

`this`

The instance of the current object for chaining.

***

### save()

> **save**(): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:369

Saves the current graphics state, including transformations, fill styles, and stroke styles, onto a stack.

#### Returns

`this`

***

### scaleTransform()

> **scaleTransform**(`x`, `y?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:394

Applies a scaling transformation to the graphics context, scaling drawings by x horizontally and by y vertically.

#### Parameters

##### x

`number`

The scale factor in the horizontal direction.

##### y?

`number`

(Optional) The scale factor in the vertical direction.
If not specified, the x value is used for both directions.

#### Returns

`this`

The instance of the current GraphicsContext for method chaining.

***

### setChildIndex()

> **setChildIndex**(`child`, `index`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:10

#### Parameters

##### child

`ContainerChild` | `IRenderLayer`

##### index

`number`

#### Returns

`void`

#### Inherited from

`ViewContainer.setChildIndex`

***

### setFillStyle()

> **setFillStyle**(...`args`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:89

Sets the current fill style of the graphics context. The fill style can be a color, gradient,
pattern, or a more complex style defined by a FillStyle object.

#### Parameters

##### args

...\[`FillInput`\]

The fill style to apply. This can be a simple color, a gradient or
pattern object, or a FillStyle or ConvertedFillStyle object.

#### Returns

`this`

The instance of the current GraphicsContext for method chaining.

***

### setFromMatrix()

> **setFromMatrix**(`matrix`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:611

Updates the local transform using the given matrix.

#### Parameters

##### matrix

`Matrix`

The matrix to use for updating the transform.

#### Returns

`void`

#### Inherited from

`ViewContainer.setFromMatrix`

***

### setSize()

> **setSize**(`value`, `height?`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:590

Sets the size of the container to the specified width and height.
This is faster than setting the width and height separately.

#### Parameters

##### value

This can be either a number or a [Size]Size object.

`number` | `Optional`\<`Size`, `"height"`\>

##### height?

`number`

The height to set. Defaults to the value of `width` if not provided.

#### Returns

`void`

#### Memberof

scene.Container#

#### Inherited from

`ViewContainer.setSize`

***

### setStrokeStyle()

> **setStrokeStyle**(...`args`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:97

Sets the current stroke style of the graphics context. Similar to fill styles, stroke styles can
encompass colors, gradients, patterns, or more detailed configurations via a StrokeStyle object.

#### Parameters

##### args

...\[`StrokeInput`\]

The stroke style to apply. Can be defined as a color, a gradient or pattern,
or a StrokeStyle or ConvertedStrokeStyle object.

#### Returns

`this`

The instance of the current GraphicsContext for method chaining.

***

### setTransform()

#### Call Signature

> **setTransform**(`transform`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:406

Sets the current transformation matrix of the graphics context to the specified matrix or values.
This replaces the current transformation matrix.

##### Parameters

###### transform

`Matrix`

##### Returns

`this`

The instance of the current GraphicsContext for method chaining.

#### Call Signature

> **setTransform**(`a`, `b`, `c`, `d`, `dx`, `dy`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:407

Sets the current transformation matrix of the graphics context to the specified matrix or values.
This replaces the current transformation matrix.

##### Parameters

###### a

`number`

The value for the a property of the matrix, or a Matrix object to use directly.

###### b

`number`

The value for the b property of the matrix.

###### c

`number`

The value for the c property of the matrix.

###### d

`number`

The value for the d property of the matrix.

###### dx

`number`

The value for the tx (translate x) property of the matrix.

###### dy

`number`

The value for the ty (translate y) property of the matrix.

##### Returns

`this`

The instance of the current GraphicsContext for method chaining.

#### Call Signature

> **setTransform**(`a`, `b?`, `c?`, `d?`, `dx?`, `dy?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:408

Sets the current transformation matrix of the graphics context to the specified matrix or values.
This replaces the current transformation matrix.

##### Parameters

###### a

The value for the a property of the matrix, or a Matrix object to use directly.

`number` | `Matrix`

###### b?

`number`

The value for the b property of the matrix.

###### c?

`number`

The value for the c property of the matrix.

###### d?

`number`

The value for the d property of the matrix.

###### dx?

`number`

The value for the tx (translate x) property of the matrix.

###### dy?

`number`

The value for the ty (translate y) property of the matrix.

##### Returns

`this`

The instance of the current GraphicsContext for method chaining.

***

### star()

> **star**(`x`, `y`, `points`, `radius`, `innerRadius?`, `rotation?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:356

Draws a star shape centered at a specified location. This method allows for the creation
 of stars with a variable number of points, outer radius, optional inner radius, and rotation.
The star is drawn as a closed polygon with alternating outer and inner vertices to create the star's points.
An optional transformation can be applied to scale, rotate, or translate the star as needed.

#### Parameters

##### x

`number`

The x-coordinate of the center of the star.

##### y

`number`

The y-coordinate of the center of the star.

##### points

`number`

The number of points of the star.

##### radius

`number`

The outer radius of the star (distance from the center to the outer points).

##### innerRadius?

`number`

Optional. The inner radius of the star
(distance from the center to the inner points between the outer points).
If not provided, defaults to half of the `radius`.

##### rotation?

`number`

Optional. The rotation of the star in radians, where 0 is aligned with the y-axis.
Defaults to 0, meaning one point is directly upward.

#### Returns

`this`

The instance of the current object for chaining further drawing commands.

***

### stroke()

> **stroke**(...`args`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:115

Strokes the current path with the current stroke style. This method can take an optional
FillStyle parameter to define the stroke's appearance, including its color, width, and other properties.

#### Parameters

##### args

...\[`StrokeInput`\]

(Optional) The stroke style to apply. Can be defined as a simple color or a more
complex style object. If omitted, uses the current stroke style.

#### Returns

`this`

The instance of the current GraphicsContext for method chaining.

***

### svg()

> **svg**(`svg`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:362

Parses and renders an SVG string into the graphics context. This allows for complex shapes and paths
defined in SVG format to be drawn within the graphics context.

#### Parameters

##### svg

`string`

The SVG string to be parsed and rendered.

#### Returns

`this`

***

### swapChildren()

> **swapChildren**\<`U`\>(`child`, `child2`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/childrenHelperMixin.d.ts:13

#### Type Parameters

##### U

`U` *extends* `ContainerChild` \| `IRenderLayer`

#### Parameters

##### child

`U`

##### child2

`U`

#### Returns

`void`

#### Inherited from

`ViewContainer.swapChildren`

***

### texture()

#### Call Signature

> **texture**(`texture`, `tint?`, `dx?`, `dy?`, `dw?`, `dh?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:132

Adds a texture to the graphics context. This method supports multiple overloads for specifying the texture,
tint, and dimensions. If only a texture is provided, it uses the texture's width and height for drawing.
Additional parameters allow for specifying a tint color, and custom dimensions for the texture drawing area.

##### Parameters

###### texture

[`Texture`](Texture.md)

The Texture object to use.

###### tint?

`ColorSource`

(Optional) A ColorSource to tint the texture. If not provided, defaults to white (0xFFFFFF).

###### dx?

`number`

(Optional) The x-coordinate in the destination canvas at which to place the top-left corner of
the source image.

###### dy?

`number`

(Optional) The y-coordinate in the destination canvas at which to place the top-left corner of
the source image.

###### dw?

`number`

(Optional) The width of the rectangle within the source image to draw onto the destination canvas.
If not provided, uses the texture's frame width.

###### dh?

`number`

(Optional) The height of the rectangle within the source image to draw onto the destination canvas.
If not provided, uses the texture's frame height.

##### Returns

`this`

The instance of the current GraphicsContext for method chaining.

#### Call Signature

> **texture**(`texture`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:133

Adds a texture to the graphics context. This method supports multiple overloads for specifying the texture,
tint, and dimensions. If only a texture is provided, it uses the texture's width and height for drawing.
Additional parameters allow for specifying a tint color, and custom dimensions for the texture drawing area.

##### Parameters

###### texture

[`Texture`](Texture.md)

The Texture object to use.

##### Returns

`this`

The instance of the current GraphicsContext for method chaining.

***

### toGlobal()

> **toGlobal**\<`P`\>(`position`, `point?`, `skipUpdate?`): `P`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/toLocalGlobalMixin.d.ts:6

#### Type Parameters

##### P

`P` *extends* `PointData` = `Point`

#### Parameters

##### position

`PointData`

##### point?

`P`

##### skipUpdate?

`boolean`

#### Returns

`P`

#### Inherited from

`ViewContainer.toGlobal`

***

### toLocal()

> **toLocal**\<`P`\>(`position`, `from?`, `point?`, `skipUpdate?`): `P`

Defined in: node\_modules/pixi.js/lib/scene/container/container-mixins/toLocalGlobalMixin.d.ts:7

#### Type Parameters

##### P

`P` *extends* `PointData` = `Point`

#### Parameters

##### position

`PointData`

##### from?

[`Container`](Container.md)\<`ContainerChild`\>

##### point?

`P`

##### skipUpdate?

`boolean`

#### Returns

`P`

#### Inherited from

`ViewContainer.toLocal`

***

### transform()

#### Call Signature

> **transform**(`transform`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:420

Applies the specified transformation matrix to the current graphics context by multiplying
the current matrix with the specified matrix.

##### Parameters

###### transform

`Matrix`

##### Returns

`this`

The instance of the current GraphicsContext for method chaining.

#### Call Signature

> **transform**(`a`, `b`, `c`, `d`, `dx`, `dy`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:421

Applies the specified transformation matrix to the current graphics context by multiplying
the current matrix with the specified matrix.

##### Parameters

###### a

`number`

The value for the a property of the matrix, or a Matrix object to use directly.

###### b

`number`

The value for the b property of the matrix.

###### c

`number`

The value for the c property of the matrix.

###### d

`number`

The value for the d property of the matrix.

###### dx

`number`

The value for the tx (translate x) property of the matrix.

###### dy

`number`

The value for the ty (translate y) property of the matrix.

##### Returns

`this`

The instance of the current GraphicsContext for method chaining.

#### Call Signature

> **transform**(`a`, `b?`, `c?`, `d?`, `dx?`, `dy?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:422

Applies the specified transformation matrix to the current graphics context by multiplying
the current matrix with the specified matrix.

##### Parameters

###### a

The value for the a property of the matrix, or a Matrix object to use directly.

`number` | `Matrix`

###### b?

`number`

The value for the b property of the matrix.

###### c?

`number`

The value for the c property of the matrix.

###### d?

`number`

The value for the d property of the matrix.

###### dx?

`number`

The value for the tx (translate x) property of the matrix.

###### dy?

`number`

The value for the ty (translate y) property of the matrix.

##### Returns

`this`

The instance of the current GraphicsContext for method chaining.

***

### translateTransform()

> **translateTransform**(`x`, `y?`): `this`

Defined in: node\_modules/pixi.js/lib/scene/graphics/shared/Graphics.d.ts:430

Applies a translation transformation to the graphics context, moving the origin by the specified amounts.

#### Parameters

##### x

`number`

The amount to translate in the horizontal direction.

##### y?

`number`

(Optional) The amount to translate in the vertical direction. If not specified,
the x value is used for both directions.

#### Returns

`this`

The instance of the current GraphicsContext for method chaining.

***

### updateLocalTransform()

> **updateLocalTransform**(): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:613

Updates the local transform.

#### Returns

`void`

#### Inherited from

`ViewContainer.updateLocalTransform`

***

### updateTransform()

> **updateTransform**(`opts`): `this`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:606

Updates the transform properties of the container (accepts partial values).

#### Parameters

##### opts

`Partial`\<`UpdateTransformOptions`\>

The options for updating the transform.

#### Returns

`this`

#### Inherited from

`ViewContainer.updateTransform`

***

### ~~mixin()~~

> `static` **mixin**(`source`): `void`

Defined in: node\_modules/pixi.js/lib/scene/container/Container.d.ts:287

Mixes all enumerable properties and methods from a source object to Container.

#### Parameters

##### source

`Dict`\<`any`\>

The source of properties and methods to mix in.

#### Returns

`void`

#### Deprecated

since 8.8.0
