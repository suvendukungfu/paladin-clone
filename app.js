document.addEventListener('DOMContentLoaded', () => {
    console.log('Paladin Application Initialized');

    // Handle Skill Node Clicks
    const skillNodes = document.querySelectorAll('.skill-node');
    skillNodes.forEach(node => {
        node.addEventListener('click', () => {
            if (node.classList.contains('locked')) {
                showNotification('🔒 This era is currently locked. Complete previous lessons to unlock!', 'warning');
                return;
            }
            
            const eraName = node.querySelector('.node-label').textContent;
            showNotification(`⚔️ Entering: ${eraName}...`, 'success');
            
            // Simulate navigation/loading
            node.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                node.style.transform = '';
            }, 500);
        });
    });

    // Stats Interactivity
    const xpBar = document.querySelector('.xp-progress');
    let currentXP = 65;

    function addXP(amount) {
        currentXP = Math.min(100, currentXP + amount);
        xpBar.style.width = `${currentXP}%`;
        
        if (currentXP === 100) {
            showNotification('⭐ LEVEL UP! You are now Level 5!', 'success');
            currentXP = 0;
            setTimeout(() => xpBar.style.width = '0%', 500);
        }
    }

    // Simple Toast Notification System
    function showNotification(message, type = 'info') {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.padding = '1rem 1.5rem';
        toast.style.borderRadius = '12px';
        toast.style.background = type === 'warning' ? '#8b0000' : '#16161a';
        toast.style.border = `1px solid ${type === 'warning' ? '#ff4d4d' : '#d4af37'}`;
        toast.style.color = '#fff';
        toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        toast.style.zIndex = '1000';
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Add some random XP after a delay to show animation
    setTimeout(() => {
        showNotification('📜 Daily Login Bonus: +50 XP!', 'info');
        addXP(10);
    }, 2000);
});
