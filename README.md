## Image Dataset Manager

#### Current state: Early Testing

This tool allows you to conveniently load many images, tag them with information, batch export, do image operations, cropping, etc. This can be useful for machine learning or gamedev.

![Screenshot](https://github.com/dekdevy/idm/blob/[branch]/screenshot.png?raw=true)

## Current Features
- Tagging of single and multiple images at the same time
- Tag groups with custom join strings, pre- and suffix strings
- Image descriptions based on custom tag interpolation (`"Photo of a {type} with {color} {feature}"`)
- Exporting with batch resize and cropping, image descriptions into `".txt"`
- Filtering of images based on tags, filenames, group tag counts
- Flattening of alpha channels, replacing alpha with color

## Planned features
- Auto toggle of tags based on file paths
- Export path string interpolation (exporting to `/{type}/0.png` etc)