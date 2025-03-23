
// JavaScript for the index.html page
document.addEventListener('DOMContentLoaded', function() {
  // Load product categories
  loadProductCategories();
  
  // Load map points
  loadMapPoints();
  
  // Initialize animations
  initScrollAnimations();
});

// Product categories data (abbreviated version for homepage)
const categories = [
  {
    id: 'food-beverage',
    name: 'Food & Beverage',
    icon: '🥂',
    description: 'High-quality foods, beverages, and nutritional products.',
    color: 'from-amber-400 to-orange-500',
    products: ['Packaged foods & snacks', 'Dairy products', 'Bottled water & beverages'],
  },
  {
    id: 'personal-care',
    name: 'Personal Care & Hygiene',
    icon: '💆',
    description: 'Premium personal care and hygiene products for everyone.',
    color: 'from-sky-400 to-blue-500',
    products: ['Skin care', 'Hair care', 'Oral hygiene'],
  },
  {
    id: 'home-care',
    name: 'Home Care Products',
    icon: '🧹',
    description: 'Keep your home clean and fresh with our premium products.',
    color: 'from-teal-400 to-emerald-500',
    products: ['Detergents & cleaning liquids', 'Disinfectants', 'Air fresheners'],
  },
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    icon: '🌿',
    description: 'Boost your health with our wellness and supplement range.',
    color: 'from-green-400 to-lime-500',
    products: ['Nutritional supplements', 'Herbal remedies', 'First-aid supplies'],
  },
  {
    id: 'mother-baby',
    name: 'Mother, Baby & Kids',
    icon: '👶',
    description: 'Everything needed for mothers and their little ones.',
    color: 'from-pink-400 to-rose-500',
    products: ['Feeding bottles', 'Baby food processors', 'Baby safety & gear'],
  },
  {
    id: 'beauty-cosmetics',
    name: 'Beauty & Cosmetics',
    icon: '💄',
    description: 'Look your best with our beauty and cosmetic range.',
    color: 'from-purple-400 to-fuchsia-500',
    products: ['Makeup products', 'Fragrances & perfumes', 'Nail care'],
  }
];

// Map points data
const mapPoints = [
  { x: '30%', y: '40%', label: 'Kish Island', className: 'bg-kish-blue' },
  { x: '33%', y: '38%', label: 'Dubai', className: 'bg-kish-purple' },
  { x: '20%', y: '30%', label: 'Europe', className: 'bg-gray-700' },
  { x: '70%', y: '35%', label: 'Asia', className: 'bg-gray-700' },
  { x: '15%', y: '45%', label: 'Africa', className: 'bg-gray-700' },
  { x: '85%', y: '65%', label: 'Australia', className: 'bg-gray-700' },
  { x: '10%', y: '65%', label: 'South America', className: 'bg-gray-700' },
  { x: '20%', y: '20%', label: 'North America', className: 'bg-gray-700' },
];

// Load product categories for homepage
function loadProductCategories() {
  const categoriesContainer = document.getElementById('categories-container');
  if (categoriesContainer) {
    categoriesContainer.innerHTML = categories.map((category, index) => `
      <div 
        class="animate-on-scroll opacity-0 category-card"
        style="animation-delay: ${index * 50}ms"
        data-category="${category.id}"
      >
        <div class="absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-gradient-to-br opacity-10 ${category.color}"></div>
        
        <div class="flex items-start">
          <div class="text-4xl mr-4">${category.icon}</div>
          <div>
            <h3 class="text-xl font-bold font-display text-gray-900">${category.name}</h3>
            <p class="mt-2 text-gray-600">${category.description}</p>
          </div>
        </div>
        
        <div class="mt-4 space-y-2">
          ${category.products.map(product => `
            <div class="flex items-center">
              <div class="w-1.5 h-1.5 rounded-full bg-kish-blue mr-2"></div>
              <span class="text-sm text-gray-700">${product}</span>
            </div>
          `).join('')}
        </div>
        
        <div class="mt-6">
          <a 
            href="products.html#${category.id}"
            class="inline-flex items-center text-kish-blue hover:text-kish-purple font-medium transition-colors"
          >
            View All Products
            <i data-lucide="arrow-right" class="ml-1 h-4 w-4"></i>
          </a>
        </div>
      </div>
    `).join('');
    
    // Refresh Lucide icons
    lucide.createIcons();
  }
}

// Load map points for global reach section
function loadMapPoints() {
  const mapPointsContainer = document.getElementById('map-points');
  if (mapPointsContainer) {
    // Add connection lines
    let svgContent = `
      <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <marker id="arrowhead" markerWidth="5" markerHeight="5" refX="5" refY="2.5" orient="auto">
            <polygon points="0 0, 5 2.5, 0 5" fill="#0EA5E9" />
          </marker>
        </defs>
        <path 
          d="M30%,40% L33%,38%" 
          stroke="#0EA5E9" 
          stroke-width="1" 
          marker-end="url(#arrowhead)" 
          class="animate-pulse-slow"
        ></path>
    `;
    
    // Add additional connection paths
    mapPoints.slice(1).forEach(point => {
      svgContent += `
        <path 
          d="M33%,38% L${point.x},${point.y}" 
          stroke="#8B5CF6" 
          stroke-width="0.5" 
          stroke-dasharray="3,3" 
          class="animate-pulse-slow"
        ></path>
      `;
    });
    
    svgContent += `</svg>`;
    
    // Add points
    let pointsHTML = svgContent;
    mapPoints.forEach(point => {
      pointsHTML += `
        <div 
          class="absolute group"
          style="left: ${point.x}; top: ${point.y}"
        >
          <div class="w-3 h-3 rounded-full animate-pulse-slow shadow-lg ${point.className}"></div>
          <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap bg-white px-2 py-1 rounded text-xs font-medium shadow-md pointer-events-none">
            ${point.label}
          </div>
        </div>
      `;
    });
    
    mapPointsContainer.innerHTML = pointsHTML;
  }
}

// Initialize scroll-triggered animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-slide-up');
        entry.target.classList.remove('opacity-0');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}
