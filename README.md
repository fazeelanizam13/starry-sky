# [starry-sky](https://www.npmjs.com/package/@fazeelanizam13/starry-sky)

a React wrapper component that renders a background of a night sky with stars animated to blink and fall.

<p style="text-align: center">
  <img src="https://drive.google.com/uc?export=view&id=1unYhv1AQzdQqqnRO5G2iWN2NEfyui7Ck" style="width: 70%;">
</p>

## basic usage

- install as a dependency - `npm i @fazeelanizam13/starry-sky`

- follow the example for a minimal version of the background:

```
import StarrySky from '@fazeelanizam13/starry-sky'

const App = () => {
  return (
    ...

    <StarrySky size={{ width: 60, height: 70 }} />

    ...
  )
}
```

## props

| name                       | type                                | default                                                                                                       | example                     | description                                                            |
| -------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------- |
| size                       | `{ width: number; height: number }` | -                                                                                                             | `{ width: 60, height: 70 }` | height and width of the background as a percentage relative to parent. |
| starSize                   | `{ min: number; max: number }`      | `{ min: 1, max: 4 }`                                                                                          | -                           | diameter of a star in pixels                                           |
| starMargin                 | `{ min: number; max: number }`      | `{ min: 40, max: 60 }`                                                                                        | -                           | margin between two stars in pixels.                                    |
| noOfShootingStars          | `number`                            | `10`                                                                                                          | -                           | the number of stars that will have a shooting animation.               |
| periodBetweenShootingStars | `{ min: number; max: number }`      | `{ min: 5, max: 10 }`                                                                                         | -                           | seconds to wait between each falling star.                             |
| shootingAnimationDuration  | `number`                            | `2`                                                                                                           | -                           | duration for the falling animation common to every falling star.       |
| style                      | `React.CSSProperties`               | `{ background: 'linear-gradient(145deg, #18060b 20%, #201718 43%, #251f20 51%, #291e1f 72%, #18060b 90%)', }` | -                           | style applied to the background of the component.                      |

## for developers

to setup locally:

- install dependencies - `npm install`
- start dev server - `npm run start`

to test the package:

- build the package - `npm run build`
- compress the package - `npm pack`
- reference the generated `.tgz` file from the `package.json` of the project you want to test from

```
"dependencies": {
  "@fazeelanizam13/starry-sky": "<path/to/file.tgz>"
}
```
- run `npm install`
- import and use as shown in the example:

```
import StarrySky from '@fazeelanizam13/starry-sky'

const App = () => {
  return (
    ...

    <StarrySky size={{ width: 60, height: 70 }} />

    ...
  )
}
```
