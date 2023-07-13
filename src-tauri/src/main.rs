// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use image::{imageops, GenericImageView, ImageBuffer};
use open;
use tokio::fs;
use std::path::{Path, PathBuf};

#[tauri::command]
async fn export_image(img_path: String, export_path: String, width: u32, height: u32, description: String) {
    
    // load image, resize if necessary
    let img: image::DynamicImage = image::open(img_path).unwrap();

    let (img_width, img_height) = img.dimensions();

  // Prepare the output buffer
  let mut out_img = ImageBuffer::new(width, height);

  for x in 0..width {
      for y in 0..height {
          // Use modulo operation to create tiling effect
          let px = img.get_pixel(x % img_width, y % img_height);
          out_img.put_pixel(x, y, px);
      }
  }

  // write the image file
  let export_path_buf = PathBuf::from(export_path);
  out_img.save(&export_path_buf).unwrap();

   // Generate text file path
   
   let txt_path = export_path_buf.with_extension("txt");
    
   // Write description to the text file
   fs::write(txt_path, description).await;

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
