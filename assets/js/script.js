// Basic interactions: theme toggle, nav active link and downloads search
(function(){
  // Theme toggle
  const tbtn = document.querySelectorAll('.theme-toggle');
  tbtn.forEach(b=>{
    b.addEventListener('click', ()=>{
      document.documentElement.classList.toggle('light-theme');
    });
  });

  // Highlight nav link based on location
  const links = document.querySelectorAll('.nav-link');
  links.forEach(a => {
    if(location.pathname.endsWith(a.getAttribute('href'))) {
      links.forEach(x=>x.classList.remove('active'));
      a.classList.add('active');
    }
  });

  // Download search filter (for static download cards)
  const search = document.getElementById('searchInput');
  const grid = document.getElementById('downloadGrid');
  if (search && grid) {
    search.addEventListener('input', ()=>{
      const q = search.value.toLowerCase();
      const cards = grid.querySelectorAll('.download-card');
      cards.forEach(card=>{
        const t = (card.textContent || '').toLowerCase();
        card.style.display = t.indexOf(q) >= 0 ? 'block' : 'none';
      });
    });
  }
})();
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("downloadGrid");
    const searchInput = document.getElementById("searchInput");

    // If there's no download grid on this page, nothing to do here.
    if (!grid) return;

    // Your backend API
    const API_URL = "https://download-backend-g3vo.onrender.com/files";

    async function loadFiles() {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();

            const allFiles = [
                ...data.pdfs.map(f => ({ ...f, type: "PDF" })),
                ...data.extensions.map(f => ({ ...f, type: "EXTENSION" })),
                ...data.tools.map(f => ({ ...f, type: "TOOL" }))
            ];

            displayFiles(allFiles);

            // Search filter (only if the input exists)
            if (searchInput) {
              searchInput.addEventListener("input", () => {
                const text = searchInput.value.toLowerCase();
                const filtered = allFiles.filter(item =>
                  item.title.toLowerCase().includes(text) ||
                  item.type.toLowerCase().includes(text)
                );
                displayFiles(filtered);
              });
            }

        } catch (err) {
            console.error("Failed to load files", err);
        }
    }

    function displayFiles(files) {
        grid.innerHTML = "";

        if (files.length === 0) {
            grid.innerHTML = "<p>No matching files found.</p>";
            return;
        }

        files.forEach(file => {
            const card = document.createElement("div");
            card.className = "download-card";

            card.innerHTML = `
                <h4>${file.title} (${file.type})</h4>
                <p>Auto-generated resource file.</p>
                <a class="btn" href="${API_URL.replace("/files","")}${file.url}" download>
                    Download
                </a>
            `;

            grid.appendChild(card);
        });
    }

    loadFiles();
});
