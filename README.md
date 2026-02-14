# 💕 Valentine's Day Website

A romantic, interactive Valentine's Day website with two beautiful pages.

## 🌟 Features

### Page 1: Valentine Invitation
- Centered romantic message: "Will you be my Valentine?"
- **YES** button that transitions to the photo gallery
- **NO** button that playfully moves away when you try to click or hover over it
- Floating hearts background animation
- Heart burst celebration effect when YES is clicked
- Smooth animations and pink/red gradient design

### Page 2: Photo Gallery
- Responsive grid layout for photos
- Click any photo to view it in fullscreen modal
- Modal features:
  - Dimmed background
  - Centered, enlarged image
  - Close button (X) or click outside to exit
  - Keyboard support (ESC key to close)
- Beautiful love message at the bottom
- Smooth fade-in animations

### Additional Features
- Mobile-first responsive design (works perfectly on phones and tablets)
- Floating hearts animation throughout the site
- Optional background music (plays after clicking YES)
- Smooth page transitions
- Clean, commented code for easy understanding

## 🚀 How to Use

### Quick Start
1. Simply open `april.html` in any modern web browser
2. That's it! No installation or setup required

### Adding Your Own Photos
1. Add your photos to the `/image` folder
2. Name them: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc.
3. Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`
4. The gallery currently displays 6 photos, but you can easily add more:
   - Open `april.js`
   - Find the `photoFiles` array (around line 180)
   - Add more filenames to the array

**Note:** If no photos are found, the gallery will display beautiful gradient placeholders with hearts, so it looks great even without custom photos!

### Adding Background Music (Optional)
1. Add a music file to a `/music` folder (create the folder first)
2. Open `april.html`
3. Find the `<audio>` tag (around line 61)
4. Uncomment the `<source>` line and update the path:
   ```html
   <source src="music/your-romantic-song.mp3" type="audio/mpeg">
   ```
5. Music will play automatically after the user clicks YES

## 📁 File Structure

```
april/
├── april.html          # Main HTML file with both pages
├── april.css           # All styling and animations
├── april.js            # Interactive features and logic
├── image/              # Folder for your photos
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── ...
├── music/              # (Optional) Folder for background music
│   └── romantic-song.mp3
└── README.md           # This file
```

## 🎨 Customization Tips

### Change Colors
Open `april.css` and modify the gradient colors:
- Line 10: Main background gradient
- Line 122: YES button gradient
- Line 137: NO button gradient

### Adjust Animations
All animations are in `april.css`:
- `@keyframes float-up` - Floating hearts speed
- `@keyframes heartbeat` - Heart icon pulse
- `@keyframes fadeIn` - Page transition speed

### Modify Text
Open `april.html` and edit:
- Line 16: Main question text
- Line 48: Gallery title
- Line 57: Love message

## 💡 Tips for Best Experience

1. **Mobile Users:** The NO button works with touch gestures!
2. **Photos:** Use photos with good lighting for best results
3. **Music:** Choose a romantic, instrumental track (not too loud)
4. **Browser:** Works best in Chrome, Firefox, Safari, or Edge
5. **File Names:** Keep photo filenames simple (no spaces or special characters)

## 🎭 How It Works

### The Moving NO Button
The NO button uses clever JavaScript to:
1. Detect when the mouse hovers over or tries to click it
2. Calculate a random position far from its current location
3. Smoothly move to that position before you can click it
4. This creates a playful "chase" effect that's impossible to catch!

### The Photo Modal
When you click a photo:
1. The modal overlay appears with a fade-in animation
2. The background dims to 95% opacity
3. The photo zooms in with a smooth scale animation
4. Click anywhere outside or press ESC to close

### Floating Hearts
Hearts continuously float from bottom to top with:
- Random horizontal positions
- Varying speeds for depth effect
- Rotating motion as they rise
- Automatic cleanup to prevent memory leaks

## 🐛 Troubleshooting

**Photos not showing?**
- Check that photos are in the `/image` folder
- Verify filenames match exactly: `photo1.jpg`, `photo2.jpg`, etc.
- Check file extensions (.jpg, .png)

**Music not playing?**
- Browsers block autoplay - music only plays after user interaction (clicking YES)
- Check the file path in the HTML
- Ensure the audio file format is supported (MP3 works best)

**NO button not moving on mobile?**
- Make sure you're touching the button directly
- Try refreshing the page if it gets stuck

## 📱 Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ Internet Explorer (Not supported - use Edge instead)

## 🎉 Special Effects

- **Heart Burst:** 20 hearts explode from the YES button when clicked
- **Celebration Animation:** The YES button wiggles with joy
- **Smooth Transitions:** CSS animations for professional feel
- **Responsive Grid:** Photos automatically adjust to screen size
- **Hover Effects:** Subtle scaling and rotation on interactive elements

## 📝 Credits

Created with ❤️ for Valentine's Day 2026

Enjoy your romantic website! 💕

---

**Pro Tip:** Open the browser console (F12) to see a hidden Valentine's message! 🎁
