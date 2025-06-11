[**@graphicle/js**](../../../../README.md)

***

[@graphicle/js](../../../../globals.md) / [Pixi](../README.md) / Application

# Class: Application\<R\>

Defined in: node\_modules/pixi.js/lib/app/Application.d.ts:70

Convenience class to create a new PixiJS application.

This class automatically creates the renderer, ticker and root container.

## Example

```ts
import { Application, Sprite } from 'pixi.js';

// Create the application
const app = new Application();

await app.init({ width: 800, height: 600 });

// Add the view to the DOM
document.body.appendChild(app.canvas);

// ex, add display objects
app.stage.addChild(Sprite.from('something.png'));
```

## Memberof

app

## Extends

- `Application`

## Type Parameters

### R

`R` *extends* `Renderer` = `Renderer`

## Constructors

### Constructor

> **new Application**\<`R`\>(): `Application`\<`R`\>

Defined in: node\_modules/pixi.js/lib/app/Application.d.ts:105

Create new Application instance

#### Returns

`Application`\<`R`\>

#### Inherited from

`PixiMixins.Application.constructor`

### Constructor

> **new Application**\<`R`\>(`options?`): `Application`\<`R`\>

Defined in: node\_modules/pixi.js/lib/app/Application.d.ts:107

#### Parameters

##### options?

`Partial`\<`ApplicationOptions`\>

#### Returns

`Application`\<`R`\>

#### Deprecated

since 8.0.0

#### Inherited from

`PixiMixins.Application.constructor`

## Properties

### renderer

> **renderer**: `R`

Defined in: node\_modules/pixi.js/lib/app/Application.d.ts:103

WebGL renderer if available, otherwise CanvasRenderer.

#### Member

***

### resizeTo

> **resizeTo**: `HTMLElement` \| `Window`

Defined in: node\_modules/pixi.js/lib/app/ApplicationMixins.d.ts:12

#### Inherited from

`PixiMixins.Application.resizeTo`

***

### stage

> **stage**: [`Container`](Container.md)

Defined in: node\_modules/pixi.js/lib/app/Application.d.ts:98

The root display container that's rendered.

***

### ticker

> **ticker**: `Ticker`

Defined in: node\_modules/pixi.js/lib/app/ApplicationMixins.d.ts:17

#### Inherited from

`PixiMixins.Application.ticker`

***

### \_plugins

> `static` **\_plugins**: `ApplicationPlugin`[]

Defined in: node\_modules/pixi.js/lib/app/Application.d.ts:96

Collection of installed plugins.

#### Alias

_plugins

## Accessors

### canvas

#### Get Signature

> **get** **canvas**(): `R`\[`"canvas"`\]

Defined in: node\_modules/pixi.js/lib/app/Application.d.ts:119

Reference to the renderer's canvas element.

##### Member

##### Returns

`R`\[`"canvas"`\]

***

### screen

#### Get Signature

> **get** **screen**(): `Rectangle`

Defined in: node\_modules/pixi.js/lib/app/Application.d.ts:130

Reference to the renderer's screen rectangle. Its safe to use as `filterArea` or `hitArea` for the whole screen.

##### Returns

`Rectangle`

***

### view

#### Get Signature

> **get** **view**(): `R`\[`"canvas"`\]

Defined in: node\_modules/pixi.js/lib/app/Application.d.ts:125

Reference to the renderer's canvas element.

##### Member

##### Deprecated

since 8.0.0

##### Returns

`R`\[`"canvas"`\]

## Methods

### cancelResize()

> **cancelResize**(): `void`

Defined in: node\_modules/pixi.js/lib/app/ApplicationMixins.d.ts:15

#### Returns

`void`

#### Inherited from

`PixiMixins.Application.cancelResize`

***

### destroy()

> **destroy**(`rendererDestroyOptions?`, `options?`): `void`

Defined in: node\_modules/pixi.js/lib/app/Application.d.ts:148

Destroys the application and all of its resources.

#### Parameters

##### rendererDestroyOptions?

`RendererDestroyOptions`

The options for destroying the renderer.

##### options?

`DestroyOptions`

The options for destroying the stage.

#### Returns

`void`

***

### init()

> **init**(`options?`): `Promise`\<`void`\>

Defined in: node\_modules/pixi.js/lib/app/Application.d.ts:111

#### Parameters

##### options?

`Partial`\<`ApplicationOptions`\>

The optional application and renderer parameters.

#### Returns

`Promise`\<`void`\>

***

### queueResize()

> **queueResize**(): `void`

Defined in: node\_modules/pixi.js/lib/app/ApplicationMixins.d.ts:14

#### Returns

`void`

#### Inherited from

`PixiMixins.Application.queueResize`

***

### render()

> **render**(): `void`

Defined in: node\_modules/pixi.js/lib/app/Application.d.ts:113

Render the current stage.

#### Returns

`void`

***

### resize()

> **resize**(): `void`

Defined in: node\_modules/pixi.js/lib/app/ApplicationMixins.d.ts:13

#### Returns

`void`

#### Inherited from

`PixiMixins.Application.resize`

***

### start()

> **start**(): `void`

Defined in: node\_modules/pixi.js/lib/app/ApplicationMixins.d.ts:19

#### Returns

`void`

#### Inherited from

`PixiMixins.Application.start`

***

### stop()

> **stop**(): `void`

Defined in: node\_modules/pixi.js/lib/app/ApplicationMixins.d.ts:18

#### Returns

`void`

#### Inherited from

`PixiMixins.Application.stop`
