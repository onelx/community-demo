// ==========================================
// Community Demo - JavaScript Principal
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  initSidebar();
  initLikeButtons();
  initTabs();
  initModuleAccordion();
  initMobileMenu();
});

// ==========================================
// Sidebar Navigation
// ==========================================

function initSidebar() {
  const navItems = document.querySelectorAll('.nav-item');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage) {
      item.classList.add('active');
    }
  });
}

// ==========================================
// Like Button Functionality
// ==========================================

function initLikeButtons() {
  const likeButtons = document.querySelectorAll('.post-action[data-action="like"]');
  
  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const isLiked = this.classList.toggle('liked');
      const countSpan = this.querySelector('span');
      
      if (countSpan) {
        let count = parseInt(countSpan.textContent);
        count = isLiked ? count + 1 : count - 1;
        countSpan.textContent = count;
      }
      
      // Animación de feedback
      this.style.transform = 'scale(1.2)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
}

// ==========================================
// Tabs Functionality
// ==========================================

function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs');
  
  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remover active de todos
        tabs.forEach(t => t.classList.remove('active'));
        // Agregar active al clickeado
        this.classList.add('active');
        
        // Aquí se podría agregar lógica para cambiar contenido
        const tabId = this.getAttribute('data-tab');
        if (tabId) {
          document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
          });
          const activeContent = document.getElementById(tabId);
          if (activeContent) {
            activeContent.style.display = 'block';
          }
        }
      });
    });
  });
}

// ==========================================
// Module Accordion (Course Detail)
// ==========================================

function initModuleAccordion() {
  const moduleHeaders = document.querySelectorAll('.module-header');
  
  moduleHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const moduleCard = this.closest('.module-card');
      const content = moduleCard.querySelector('.module-content');
      const icon = this.querySelector('.module-toggle');
      
      if (content) {
        const isOpen = content.style.display !== 'none';
        content.style.display = isOpen ? 'none' : 'block';
        
        if (icon) {
          icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        }
      }
    });
  });
}

// ==========================================
// Mobile Menu
// ==========================================

function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('open');
      if (overlay) {
        overlay.classList.toggle('active');
      }
    });
  }
  
  if (overlay) {
    overlay.addEventListener('click', function() {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }
}

// ==========================================
// Utility Functions
// ==========================================

// Formato de números (1000 -> 1K)
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Tiempo relativo (hace 2 horas)
function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  const intervals = {
    año: 31536000,
    mes: 2592000,
    semana: 604800,
    día: 86400,
    hora: 3600,
    minuto: 60
  };
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `hace ${interval} ${unit}${interval > 1 ? 's' : ''}`;
    }
  }
  
  return 'justo ahora';
}

// Notificación toast simple
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Scroll suave a elemento
function scrollToElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Copiar al clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('¡Copiado al portapapeles!', 'success');
  } catch (err) {
    showToast('Error al copiar', 'error');
  }
}
