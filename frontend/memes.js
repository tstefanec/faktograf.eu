// Fetch and render all political memes in chronological order
async function fetchAllMemes() {
    const grid = document.getElementById('memes-archive-grid');
    if (!grid) return;

    try {
        const response = await fetch('/api/memes?all=true');
        if (!response.ok) {
            throw new Error(`Chyba API: ${response.statusText}`);
        }
        const memes = await response.json();

        if (memes.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; font-size: 13px; color: var(--color-silver); text-align: center; padding: 40px; border: 1.5px dashed rgba(255,255,255,0.08); border-radius: 8px; background: rgba(9,10,12,0.2);">
                    <i class="fa-solid fa-images" style="margin-bottom: 12px; display: block; font-size: 32px; opacity: 0.6; color: var(--color-beige);"></i>
                    Zatiaľ neboli pridané žiadne politické memečka.<br>
                    <span style="font-size: 11px; color: var(--color-text-secondary); display: inline-block; margin-top: 6px;">
                        Memečka môžete nahrať do priečinka <code>frontend/assets/pm/memes/</code> s dátumom v názve súboru.
                    </span>
                </div>
            `;
            return;
        }

        let html = '';
        memes.forEach(url => {
            html += `
                <div class="meme-item-wrapper" onclick="openMemeLightbox('${url}')" style="cursor: zoom-in; overflow: hidden; border-radius: 8px; border: 1.5px solid rgba(229, 211, 179, 0.25); background: rgba(9,10,12,0.5); transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); position: relative;">
                    <img src="${url}" alt="Meme" style="width: 100%; height: auto; display: block; transition: transform 0.4s ease, opacity 0.4s ease; opacity: 0.9;">
                    <div class="meme-zoom-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(9,10,12,0.45); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease;">
                        <i class="fa-solid fa-magnifying-glass-plus" style="color: var(--color-beige); font-size: 24px;"></i>
                    </div>
                </div>
            `;
        });
        grid.innerHTML = html;
    } catch (error) {
        console.error("Chyba pri načítaní memečiek:", error);
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; font-size: 13px; color: var(--color-red); text-align: center; padding: 30px;">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 24px; margin-bottom: 8px; display: block;"></i>
                Chyba pri načítaní archívu memečiek. Prosím, skúste to neskôr.
            </div>
        `;
    }
}

// Fullscreen lightbox overlay for meme images
function openMemeLightbox(url) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(9, 10, 12, 0.93)';
    overlay.style.backdropFilter = 'blur(8px)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';
    overlay.style.cursor = 'zoom-out';
    overlay.onclick = () => overlay.remove();

    const img = document.createElement('img');
    img.src = url;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.borderRadius = '12px';
    img.style.border = '2px solid var(--color-beige)';
    img.style.boxShadow = '0 0 35px rgba(229, 211, 179, 0.45)';
    img.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';

    overlay.appendChild(img);
    document.body.appendChild(overlay);
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
    fetchAllMemes();
});
