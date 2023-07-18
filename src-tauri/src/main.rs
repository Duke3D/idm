// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use image::{imageops, ImageBuffer}; // , GenericImageView, ImageBuffer
use open;

// use rand::{rngs::StdRng, Rng, SeedableRng};
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
) {
    // load image, resize if necessary
    let dyn_img: image::DynamicImage = image::open(img_path).unwrap();
    // turn into image buffer
    let img = dyn_img.to_rgba8();
    let (img_width, img_height) = img.dimensions();

    // mutable containing the resulting image
    let mut out_img;

    // crop contents of img into out_img based on cropwidth, cropheight using imgops crop
    // only do it if cropwidth or cropheight is not zero
    if cropwidth > 0 || cropheight > 0 {
        out_img = ImageBuffer::new(cropwidth, cropheight);
        // ensure that the image we're cropping from is actually smaller - limit the crop width and height to the img_width and img_height
        let cropwidth = cmp::min(cropwidth, img_width);
        let cropheight = cmp::min(cropheight, img_height);
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

    // store image
    let export_path_buf = PathBuf::from(export_path);
    out_img.save(&export_path_buf).unwrap();

    // Generate text file
    let txt_path = export_path_buf.with_extension("txt");
    let _ = fs::write(txt_path, description.clone()).await;
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

// unused code below
// for image flipping
// if cx >= img_width {
//     out_img = imageops::flip_horizontal(&out_img);
// }
// if cy >= img_height {
//     out_img = imageops::rotate270(&out_img);
// }

// // print all function inputs in console, single line
// println!(
//     "export_path: {}, width: {}, height: {}, cropwidth: {}, cropheight: {}",
//     export_path, width, height, cropwidth, cropheight
// );

// for modifying the file name
// let base_file_name = export_path_buf.file_name().unwrap().to_str().unwrap();
// let base_path_buf = export_path_buf.with_file_name(base_file_name);
// let base_file_stem = base_path_buf.file_stem().unwrap().to_str().unwrap();
// let extension = base_path_buf.extension().unwrap().to_str().unwrap();
// add n to path buff
// let new_filename = format!("{}-{}.{}", base_file_stem, n, extension);
// let new_path_buf = export_path_buf.with_file_name(new_filename);

// for random offsets
// let mut rng = match StdRng::from_rng(OsRng) {
//     Ok(rng) => rng,
//     Err(_) => return, // or handle the error in some other way
// };
// let x_offset: u32 = rng.gen_range(0..img_width);
// let y_offset: u32 = rng.gen_range(0..img_height);

// println!("widht: {}, height: {}, cropwidth: {}, cropheight: {}, cropmodulowidth: {}, cropmoduloheight: {}", img_width, img_height, cropwidth, cropheight, cropmodulowidth, cropmoduloheight);

// for crop modulos
// let mut n = 0;
// let mut cx = 0;
// while cx < cropmodulowidth {
//     let mut cy = 0;
//     while cy < cropmoduloheight {
