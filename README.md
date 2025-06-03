# Simple Image Compressor

A lightweight web-based tool for compressing and managing multiple images. Compress your JPEG and PNG images with adjustable quality settings and download them individually or as a ZIP file.

## Features

- 🖼️ Support for JPEG and PNG images
- 📱 Drag and drop interface
- 🎚️ Adjustable compression quality (1-100)
- 📦 Batch processing
- 💾 Download individual images or all as ZIP
- 📊 Shows compression statistics
- 🗑️ Easy file management with remove option
- 🔌 Works offline - no internet required
- 💻 Cross-platform compatibility

## Usage

1. **Upload Images**
   - Click "Select Images" button or
   - Drag and drop images into the designated area

2. **Adjust Settings**
   - Set quality level (1-100)
   - Higher numbers = better quality but larger file size
   - Default is 70

3. **Compress**
   - Click "Compress" button
   - Wait for processing to complete

4. **Download**
   - Individual files: Click "Download" under each image
   - All files: Click "Download All as ZIP"

## Project Structure

```
CompressJPEG-ORIGINAL/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Stylesheet
├── js/
│   ├── main.js         # Application logic
│   └── jszip.min.js    # ZIP functionality
└── README.md          # Documentation
```

## Technologies Used

- HTML5 (File API, Canvas)
- CSS3 (Flexbox, Transitions)
- JavaScript (ES6+)
- JSZip library for ZIP functionality

## Browser Support

Works in all modern browsers:
- Chrome (v80+)
- Firefox (v75+)
- Safari (v13+)
- Edge (v80+)

## Development

To run locally:
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd CompressJPEG-ORIGINAL
   ```
2. Open `index.html` in a browser
3. No build process or dependencies required

## Performance

- Processes images client-side
- No server uploads required
- Maintains privacy - no data leaves your device

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.