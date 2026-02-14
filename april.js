// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initFloatingHearts();
    initPage1();
    initPage2();
    initPage3();
    initModal();
    
    // TESTING SHORTCUT - Press 'T' key to jump to letter page
    document.addEventListener('keydown', function(e) {
        if (e.key === 't' || e.key === 'T') {
            document.getElementById('page1').classList.remove('active');
            document.getElementById('page2').classList.remove('active');
            document.getElementById('page3').classList.add('active');
        }
    });
});

// ===== FLOATING HEARTS BACKGROUND =====
function initFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    
    // Create floating hearts periodically
    setInterval(() => {
        createFloatingHeart(heartsContainer, heartSymbols);
    }, 600);
}

function createFloatingHeart(container, symbols) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    
    // Random horizontal position
    heart.style.left = Math.random() * 100 + '%';
    
    // Random animation duration for variety
    heart.style.animationDuration = (10 + Math.random() * 10) + 's';
    
    // Random delay for staggered effect
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(heart);
    
    // Remove heart after animation completes to prevent memory leaks
    setTimeout(() => {
        heart.remove();
    }, 20000);
}

// ===== PAGE 1: VALENTINE INVITATION =====
function initPage1() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    
    // YES button - transitions to page 2
    yesBtn.addEventListener('click', handleYesClick);
    
    // NO button - moves away on hover and click attempts
    noBtn.addEventListener('mouseenter', moveNoButton);
    noBtn.addEventListener('click', moveNoButton);
    
    // Also move on touch for mobile devices
    noBtn.addEventListener('touchstart', moveNoButton);
}

function handleYesClick() {
    const yesBtn = document.getElementById('yesBtn');
    
    // Add celebration animation
    yesBtn.classList.add('celebrate');
    
    // Play background music if available
    playBackgroundMusic();
    
    // Create burst of hearts
    createHeartBurst();
    
    // Transition to page 2 after animation
    setTimeout(() => {
        transitionToPage2();
    }, 800);
}

function moveNoButton(e) {
    e.preventDefault(); // Prevent default behavior
    
    const noBtn = document.getElementById('noBtn');
    const buttonsContainer = document.querySelector('.buttons-container');
    
    // Add moving class for absolute positioning
    noBtn.classList.add('moving');
    
    // Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Get viewport dimensions
    const maxX = window.innerWidth - btnWidth - 20;
    const maxY = window.innerHeight - btnHeight - 20;
    
    // Generate random position
    // Ensure it's not too close to the current position
    let newX, newY;
    let attempts = 0;
    const minDistance = 150; // Minimum distance from current position
    
    do {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;
        attempts++;
    } while (isPositionTooClose(noBtn, newX, newY, minDistance) && attempts < 10);
    
    // Apply new position
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    
    // Add a wiggle animation
    noBtn.style.animation = 'wiggle 0.3s ease-in-out';
    
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 300);
}

function isPositionTooClose(element, newX, newY, minDistance) {
    const rect = element.getBoundingClientRect();
    const currentX = rect.left;
    const currentY = rect.top;
    
    const distance = Math.sqrt(
        Math.pow(newX - currentX, 2) + Math.pow(newY - currentY, 2)
    );
    
    return distance < minDistance;
}

function createHeartBurst() {
    const yesBtn = document.getElementById('yesBtn');
    const rect = yesBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create multiple hearts bursting from the button
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createBurstHeart(centerX, centerY);
        }, i * 50);
    }
}

function createBurstHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '30px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    
    document.body.appendChild(heart);
    
    // Random direction for burst effect
    const angle = Math.random() * Math.PI * 2;
    const velocity = 100 + Math.random() * 200;
    const endX = x + Math.cos(angle) * velocity;
    const endY = y + Math.sin(angle) * velocity;
    
    // Animate the heart
    heart.animate([
        {
            transform: 'translate(0, 0) scale(1) rotate(0deg)',
            opacity: 1
        },
        {
            transform: `translate(${endX - x}px, ${endY - y}px) scale(2) rotate(360deg)`,
            opacity: 0
        }
    ], {
        duration: 1500,
        easing: 'ease-out'
    });
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 1500);
}

function transitionToPage2() {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    
    // Fade out page 1
    page1.style.animation = 'fadeOut 0.5s ease-in-out';
    
    setTimeout(() => {
        page1.classList.remove('active');
        page2.classList.add('active');
    }, 500);
}

// Simple fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
`;
document.head.appendChild(style);

// ===== PAGE 2: PHOTO REVEAL GAME =====
let revealedCount = 0;
let totalPhotos = 0;

function initPage2() {
    loadPhotos();
}

function loadPhotos() {
    const photoGrid = document.getElementById('photoGrid');
    
    // List of photos to load from the /image directory
    // All your uploaded photos from the image folder (28 photos total!)
    const photoFiles = [
        '16293b6b-c195-411a-88cc-5c81f3b7fd1f.jpeg',
        '21479ac1-a06d-4dda-b377-175d60852195.jpeg',
        '2381efec-e237-4800-aa0b-492ec26931bc.jpeg',
        '24891604-abf8-48fb-832e-93b85a7e302b.jpeg',
        '36ef4055-6699-4fdc-b4fe-6ca794a7a2b3.jpeg',
        '3702baa5-5bae-4827-b170-45c72537bf09 (1).jpeg',
        '3b65ec28-d238-4586-8661-e77bd6ac5d88.jpeg',
        '51e80666-0a4c-4624-8ed1-6c7fc1988c46.jpeg',
        '58e339c0-0f89-4ea7-ae29-9d736c42ddba.jpeg',
        '5964c28c-18d4-41a4-9888-1b4c8223504b.jpeg',
        '5b72cc7c-0faa-4f65-ab87-96360f6864f8.jpeg',
        '5bca0d15-90f8-45c1-a460-d48b5c2d4051.jpeg',
        '607660d5-7914-4399-ac4f-eb0210b8293a.jpeg',
        '611765ad-e4ad-4075-ac38-a8a256077161.jpeg',
        '636af949-c8ee-4e53-aa06-8cd6338c9944.jpeg',
        '64c98acf-ce5b-446a-92bd-86029d057885.jpeg',
        '69b2e669-2485-4072-bdff-f1d71670229d.jpeg',
        '7964d2db-4158-46e7-b501-a72ff242f48f.jpeg',
        '905d6035-a4f0-4866-9aa1-7c1a5e6d6d1e.jpeg',
        'a3697581-bda8-4578-be6e-a93d9835a98e.jpeg',
        'b2c0c94b-efc9-461f-8ba6-27c56684046b.jpeg',
        'b58b4f0c-6239-41c6-b105-b36bfbf2fafb.jpeg',
        'bd5a10bd-df6c-4427-b170-a4f80dcd47aa.jpeg',
        'ce0067c9-5c28-4b9f-b984-db5e8d711129.jpeg',
        'e088d877-d2ff-4666-a4f8-fbd80e6420f5.jpeg',
        'e66cd3d2-64e6-4e76-83ae-fadaf531fae6.jpeg',
        'f82d8403-ac59-4cbb-8ed9-dfbefdded539.jpeg',
        'f8f77288-616b-4c71-99a3-23c1cb1d6370.jpeg'
    ];
    
    totalPhotos = photoFiles.length;
    
    // Update total count in UI
    document.getElementById('totalCount').textContent = totalPhotos;
    
    // Create flip cards for each photo
    photoFiles.forEach((filename, index) => {
        createPhotoCard(photoGrid, filename, index);
    });
}

function createPhotoCard(container, filename, index) {
    // Create card container
    const photoCard = document.createElement('div');
    photoCard.className = 'photo-card';
    photoCard.style.animationDelay = (index * 0.05) + 's';
    
    // Create inner flip container
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    
    // Create front of card (hidden state - what shows before clicking)
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    
    const cardIcon = document.createElement('div');
    cardIcon.className = 'card-icon';
    cardIcon.textContent = '💕';
    
    const cardText = document.createElement('div');
    cardText.className = 'card-text';
    cardText.textContent = 'Click to Reveal';
    
    cardFront.appendChild(cardIcon);
    cardFront.appendChild(cardText);
    
    // Create back of card (the actual photo)
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    
    const img = document.createElement('img');
    img.src = `/image/${filename}`;
    img.alt = `Memory ${index + 1}`;
    
    cardBack.appendChild(img);
    
    // Assemble the card
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    photoCard.appendChild(cardInner);
    
    // Click to reveal the photo
    photoCard.addEventListener('click', function() {
        revealCard(photoCard, img.src, img.alt);
    });
    
    container.appendChild(photoCard);
}

function revealCard(card, imageSrc, imageAlt) {
    // If already revealed, open in modal
    if (card.classList.contains('revealed')) {
        openModal(imageSrc, imageAlt);
        return;
    }
    
    // Reveal the card with flip animation
    card.classList.add('revealed');
    revealedCount++;
    
    // Update progress
    updateProgress();
    
    // Play a little celebration for each reveal
    createMiniHeartBurst(card);
    
    // Check if all cards are revealed
    if (revealedCount === totalPhotos) {
        setTimeout(() => {
            showCompletionMessage();
        }, 1000);
    }
}

function updateProgress() {
    // Update count text
    document.getElementById('revealedCount').textContent = revealedCount;
    
    // Update progress bar
    const percentage = (revealedCount / totalPhotos) * 100;
    document.getElementById('progressFill').style.width = percentage + '%';
}

function createMiniHeartBurst(card) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create a few hearts bursting from the card
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createBurstHeart(centerX, centerY);
        }, i * 30);
    }
}

function showCompletionMessage() {
    const loveMessage = document.getElementById('loveMessage');
    loveMessage.style.display = 'block';
    
    // Create a big celebration
    createHeartBurst();
    
    // Add button click handler to go to letter page
    const letterBtn = document.getElementById('letterBtn');
    letterBtn.addEventListener('click', transitionToPage3);
}

// ===== PAGE 3: LOVE LETTER =====
function initPage3() {
    const envelope = document.getElementById('envelope');
    
    envelope.addEventListener('click', openEnvelope);
}

function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    
    // Add opening animation
    envelope.classList.add('opening');
    
    // Wait for envelope to open, then show letter
    setTimeout(() => {
        // Hide envelope
        envelopeWrapper.style.display = 'none';
        
        // Show letter with animation
        letter.style.display = 'block';
        
        // Create heart burst celebration
        createHeartBurst();
    }, 1000);
}

function transitionToPage3() {
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    
    // Fade out page 2
    page2.style.animation = 'fadeOut 0.5s ease-in-out';
    
    setTimeout(() => {
        page2.classList.remove('active');
        page3.classList.add('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
    }, 500);
}

// ===== MODAL FUNCTIONALITY =====
function initModal() {
    const modal = document.getElementById('photoModal');
    const modalClose = document.getElementById('modalClose');
    
    // Close modal when clicking the X button
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openModal(imageSrc, imageAlt) {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modal.classList.add('active');
    modalImg.src = imageSrc;
    modalCaption.textContent = imageAlt;
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('photoModal');
    
    modal.classList.remove('active');
    
    // Re-enable body scrolling
    document.body.style.overflow = '';
}

// ===== BACKGROUND MUSIC =====
function playBackgroundMusic() {
    const bgMusic = document.getElementById('bgMusic');
    
    // Only play if a music source is provided
    if (bgMusic.querySelector('source')) {
        bgMusic.play().catch(err => {
            console.log('Music autoplay prevented:', err);
        });
    }
}

// ===== UTILITY FUNCTIONS =====

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Prevent context menu on images for better UX
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Log a romantic message to console (Easter egg for developers!)
console.log('%c💕 Happy Valentine\'s Day! 💕', 'color: #ff1f5a; font-size: 24px; font-weight: bold;');
console.log('%cMade with love ❤️', 'color: #ff6b9d; font-size: 16px;');
