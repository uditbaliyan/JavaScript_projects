// Sample data
const resources = {
    notes: [
        {
            title: "Introduction to Calculus",
            subject: "math",
            level: "intermediate",
            description: "Comprehensive notes covering limits, derivatives, and integrals.",
            downloadUrl: "#"
        },
        {
            title: "Modern World History",
            subject: "history",
            level: "beginner",
            description: "Overview of major historical events from 1900-present.",
            downloadUrl: "#"
        }
    ],
    videos: [
        {
            title: "Linear Algebra Fundamentals",
            topic: "algebra",
            description: "Learn the basics of matrices and vector spaces.",
            thumbnail: "/api/placeholder/300/169"
        },
        {
            title: "Chemical Bonding",
            topic: "chemistry",
            description: "Understanding ionic and covalent bonds.",
            thumbnail: "/api/placeholder/300/169"
        }
    ],
    seminars: [
        {
            title: "Advanced Physics Symposium",
            date: "2024-12-15",
            status: "upcoming",
            description: "Join leading physicists for a discussion on quantum mechanics.",
            registerUrl: "#"
        },
        {
            title: "Mathematics in Nature",
            date: "2024-10-10",
            status: "upcoming",
            description: "Exploring mathematical patterns in natural phenomena.",
            registerUrl: "#"
        }
    ]
};

// Clone the resources to ensure original data integrity
const originalResources = JSON.parse(JSON.stringify(resources));

// Initialize the UI
document.addEventListener('DOMContentLoaded', () => {
    ['notes', 'videos', 'seminars'].forEach(section => renderResources(section));
    setupSearch();
    setupFilters();
    setupThemeSwitch();
});

// Render resources for a specific section
function renderResources(section) {
    const grid = document.getElementById(`${section}-grid`);
    grid.innerHTML = '';

    resources[section].forEach(resource => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        
        let cardContent = `
            <h3>${resource.title}</h3>
            <p>${resource.description}</p>
        `;

        if (section === 'notes') {
            cardContent += `
                <p>Subject: ${resource.subject}</p>
                <p>Level: ${resource.level}</p>
                <a href="${resource.downloadUrl}" class="download-btn" download>Download Notes</a>
            `;
        } else if (section === 'videos') {
            cardContent += `
                <div class="video-container">
                    <img src="${resource.thumbnail}" alt="Video thumbnail">
                </div>
                <p>Topic: ${resource.topic}</p>
            `;
        } else if (section === 'seminars') {
            cardContent += `
                <p>Date: ${new Date(resource.date).toLocaleDateString()}</p>
                <p>Status: ${resource.status}</p>
                <a href="${resource.registerUrl}" class="download-btn">Register Now</a>
            `;
        }

        card.innerHTML = cardContent;
        grid.appendChild(card);
    });
}

// Setup search functionality
function setupSearch() {
    const searchBar = document.querySelector('.search-bar');
    
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        ['notes', 'videos', 'seminars'].forEach(section => {
            resources[section] = originalResources[section].filter(resource =>
                Object.values(resource).some(value =>
                    String(value).toLowerCase().includes(searchTerm)
                )
            );
            renderResources(section);
        });
    });
}

// Setup filter functionality
function setupFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            const section = e.target.closest('.section').id.split('-')[0];
            const filterValue = e.target.value;

            if (!filterValue) {
                resources[section] = [...originalResources[section]];
            } else {
                resources[section] = originalResources[section].filter(resource => {
                    if (section === 'notes') {
                        return resource.subject === filterValue || resource.level === filterValue;
                    } else if (section === 'videos') {
                        return resource.topic === filterValue;
                    } else if (section === 'seminars') {
                        return resource.status === filterValue;
                    }
                });
            }
            renderResources(section);
        });
    });
}

// Setup theme switch functionality
function setupThemeSwitch() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeIcon.textContent = theme === 'dark' ? '🌜' : '🌞';
    };

    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);
    themeToggle.checked = savedTheme === 'dark';

    themeToggle.addEventListener('change', () => {
        applyTheme(themeToggle.checked ? 'dark' : 'light');
    });
}
