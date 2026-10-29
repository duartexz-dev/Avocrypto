/**
 * AVOCRYPTO — ANIMATION & INTERACTION ENGINE (60FPS)
 * Módulo especializado em microinterações, transições e animações fluido-dinâmicas.
 */

const AvoAnimations = (() => {

    // ==========================================
    // 1. ANIMAÇÕES DA TELA DE LOGIN
    // ==========================================
    const initLoginAnimations = () => {
        const loginContainer = document.querySelector('.login-container');
        const loginForm = document.getElementById('form-login');
        const inputs = document.querySelectorAll('.input-wrapper input');

        if (!loginContainer) return;

        // Entradas sequenciais staggered (efeito cascata)
        const animatableElements = loginContainer.querySelectorAll('.login-header, .input-group-custom, .btn-avo-primary, .auth-links, .divider, .btn-avo-outline');
        animatableElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + index * 80);
        });

        // Efeito Tilt 3D suave no Card de Login (Desktop/Mouse)
        loginContainer.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return;
            const rect = loginContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            loginContainer.style.transform = `perspective(1000px) rotateX(${-y / 40}deg) rotateY(${x / 40}deg)`;
            loginContainer.style.transition = 'transform 0.1s ease-out';
        });

        loginContainer.addEventListener('mouseleave', () => {
            loginContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            loginContainer.style.transition = 'transform 0.5s ease-out';
        });

        // Efeito Micro-Pulse nos Inputs ao focar
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                const wrapper = input.closest('.input-wrapper');
                if (wrapper) {
                    wrapper.style.transform = 'scale(1.02)';
                    wrapper.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
                }
            });

            input.addEventListener('blur', () => {
                const wrapper = input.closest('.input-wrapper');
                if (wrapper) {
                    wrapper.style.transform = 'scale(1)';
                }
            });
        });
    };

    // ==========================================
    // 2. ANIMAÇÕES DA HOME / DASHBOARD
    // ==========================================

    // Animação de entrada fluida dos Crypto Cards (Staggered Fade & Slide)
    const animateListEntrance = (containerSelector) => {
        const cards = document.querySelectorAll(`${containerSelector} .crypto-card`);
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(18px) scale(0.97)';
            card.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

            requestAnimationFrame(() => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, index * 45);
            });
        });
    };

    // Animação progressiva do Canvas Sparkline (Efeito "Desenho do Gráfico")
    const animateCanvasSparkline = (canvas, prices, isUp) => {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const w = rect.width;
        const h = rect.height;
        const data = prices.slice(-24);
        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min || 1;

        let progress = 0;
        const duration = 800; // ms
        const startTime = performance.now();

        const strokeColor = isUp ? '#8BD63C' : '#FF5C5C';

        const step = (now) => {
            const elapsed = now - startTime;
            progress = Math.min(elapsed / duration, 1);

            // Efeito de desaceleração Easing Out
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            ctx.clearRect(0, 0, w, h);
            ctx.beginPath();
            ctx.lineWidth = 1.8;
            ctx.strokeStyle = strokeColor;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            const currentLength = Math.floor((data.length - 1) * easeProgress);

            for (let i = 0; i <= currentLength; i++) {
                const x = (i / (data.length - 1)) * w;
                const normalizedY = (data[i] - min) / range;
                const y = h - (normalizedY * (h - 6)) - 3;

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    // Contador numérico interpolado para preços (Number Ticker Animation)
    const animateNumberCount = (element, startVal, endVal, prefix = '$', duration = 600) => {
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 4);
            const current = startVal + (endVal - startVal) * easeOut;

            element.textContent = `${prefix}${current.toLocaleString('en-US', {
                minimumFractionDigits: endVal < 1 ? 4 : 2,
                maximumFractionDigits: endVal < 1 ? 4 : 2
            })}`;

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    // Efeito Ripple (Onda de Toque Mobile) em Botões e Cards
    const attachRippleEffect = (selector) => {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('pointerdown', (e) => {
                const rect = element.getBoundingClientRect();
                const circle = document.createElement('span');
                const diameter = Math.max(rect.width, rect.height);
                const radius = diameter / 2;

                circle.style.width = circle.style.height = `${diameter}px`;
                circle.style.left = `${e.clientX - rect.left - radius}px`;
                circle.style.top = `${e.clientY - rect.top - radius}px`;
                circle.classList.add('ripple-effect');

                const existingRipple = element.querySelector('.ripple-effect');
                if (existingRipple) existingRipple.remove();

                element.appendChild(circle);

                setTimeout(() => circle.remove(), 600);
            });
        });
    };

    // Gesture Drag Down para fechar Modal Drawer em Mobile
    const initModalDragToClose = (modalContainerId, contentWrapperSelector, onCloseCallback) => {
        const modal = document.getElementById(modalContainerId);
        const wrapper = modal?.querySelector(contentWrapperSelector);
        if (!modal || !wrapper) return;

        let startY = 0;
        let currentY = 0;
        let isDragging = false;

        wrapper.addEventListener('touchstart', (e) => {
            if (wrapper.scrollTop > 0) return; // Permite scroll normal se não estiver no topo
            startY = e.touches[0].clientY;
            isDragging = true;
            wrapper.style.transition = 'none';
        }, { passive: true });

        wrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentY = e.touches[0].clientY - startY;

            if (currentY > 0) {
                wrapper.style.transform = `translateY(${currentY}px)`;
            }
        }, { passive: true });

        wrapper.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            wrapper.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';

            if (currentY > 120) { // Threshold para fechar
                onCloseCallback();
            } else {
                wrapper.style.transform = 'translateY(0)';
            }
            currentY = 0;
        });
    };

    // CSS Injetado Dinamicamente para dar suporte às Animações JS
    const injectAnimationStyles = () => {
        if (document.getElementById('avo-anim-styles')) return;

        const style = document.createElement('style');
        style.id = 'avo-anim-styles';
        style.textContent = `
            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background: rgba(139, 214, 60, 0.25);
                transform: scale(0);
                animation: rippleAnimation 0.6s linear;
                pointer-events: none;
            }
            @keyframes rippleAnimation {
                to {
                    transform: scale(2.5);
                    opacity: 0;
                }
            }
            .crypto-card, .btn-avo-primary, .btn-icon, .tab-btn {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    };

    // Inicialização do Engine
    const init = () => {
        injectAnimationStyles();
        initLoginAnimations();
        attachRippleEffect('.btn-avo-primary, .btn-avo-outline, .btn-icon, .tab-btn');
    };

    return {
        init,
        initLoginAnimations,
        animateListEntrance,
        animateCanvasSparkline,
        animateNumberCount,
        attachRippleEffect,
        initModalDragToClose
    };
})();

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', AvoAnimations.init);