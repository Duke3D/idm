// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use image::imageops;
use open;

#[tauri::command]
async fn export_image(img_path: String, export_path: String, width: u32, height: u32) {
    
    // load image, resize if necessary
    let img = image::open(img_path).unwrap();

    if img.width() != width || img.height() != height {
      let resized = imageops::resize(&img, width, height, imageops::FilterType::Lanczos3);
      resized.save(export_path).unwrap();
      println!("exporting resized image");
    } else {
      img.save(export_path).unwrap();
      println!("exporting image");
    }

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
