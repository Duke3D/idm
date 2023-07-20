// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use image::{imageops, ImageBuffer};
use open;
use std::cmp;
use std::path::PathBuf;
use tokio::fs;

#[tauri::command]
async fn export_image(
  img_path: String,
  export_path: String,
  width: u32,
  height: u32,
  cropwidth: u32,
  cropheight: u32,
  description: String,
  flattenalpha: bool,
  replacealphacolor: [u8; 3],
) {

  // load image as rgba8 buff
  let img = image::open(img_path).unwrap().to_rgba8();
  let (img_width, img_height) = img.dimensions();

  // mutable containing the resulting image
  let mut out_img;

  // crop contents of img into out_img based on cropwidth, cropheight using imgops crop
  // only do it if cropwidth or cropheight is not zero
  if cropwidth > 0 || cropheight > 0 {
    // ensure that the image we're cropping from is actually smaller - limit the crop width and height to the img_width and img_height
    let cropwidth = cmp::min(cropwidth, img_width);
    let cropheight = cmp::min(cropheight, img_height);
    out_img = ImageBuffer::new(cropwidth, cropheight);
    // in order to center, calculate the horizontal difference between width and input image width, halved
    let wdiff = (img_width - cropwidth) / 2;
    let hdiff = (img_height - cropheight) / 2;
    for x in 0..cropwidth {
      for y in 0..cropheight {
        let px = img.get_pixel(x + wdiff, y + hdiff);
        out_img.put_pixel(x, y, *px);
      }
    }
  } else {
    // if cropwidth and cropheight are zero, just copy the image
    out_img = img.clone();
  }

  // resize image to width, height
  if width != 0 || height != 0 {
    out_img = imageops::resize(&out_img, width, height, imageops::FilterType::Lanczos3);
  }

  // flatten alpha channel if requested
  if flattenalpha {
    // mix rgb values with replacealphacolor according to alpha, then set alpha to 255
    for (_x, _y, pixel) in out_img.enumerate_pixels_mut() {
      let alpha = pixel[3] as f32 / 255.0;
      pixel[0] = (pixel[0] as f32 * alpha + replacealphacolor[0] as f32 * (1.0 - alpha)) as u8;
      pixel[1] = (pixel[1] as f32 * alpha + replacealphacolor[1] as f32 * (1.0 - alpha)) as u8;
      pixel[2] = (pixel[2] as f32 * alpha + replacealphacolor[2] as f32 * (1.0 - alpha)) as u8;
      pixel[3] = 255;
    }
  }

  // store image
  let export_path_buf = PathBuf::from(export_path);
  out_img.save(&export_path_buf.with_extension("png")).unwrap();

  // Generate text file
  let _ = fs::write(export_path_buf.with_extension("txt"), description.clone()).await;

}

#[tauri::command]
fn open_explorer(path: String) {
  let _ = open::that(path);
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![export_image, open_explorer])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
