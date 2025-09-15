import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

const files = await imagemin(["src/img/*.{jpg,jpeg,png}"], {
  destination: "compressed/",
  plugins: [
    imageminWebp({ quality: 80 })
  ]
});

console.log("✅ Converted to WebP:");
files.forEach(f => console.log("→", f.destinationPath));
