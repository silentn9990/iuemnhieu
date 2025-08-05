// Performance optimization: Remove preload class after DOM loads
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.remove('preload');
        });

        // Optimized particle system
        class ParticleSystem {
            constructor() {
                this.particles = [];
                this.maxParticles = 50;
                this.isActive = true;
            }

            createSparkle() {
                if (!this.isActive || this.particles.length >= this.maxParticles) return;
                
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.width = sparkle.style.height = (Math.random() * 4 + 2) + 'px';
                sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
                sparkle.style.animationDelay = Math.random() * 2 + 's';
                document.body.appendChild(sparkle);
                
                this.particles.push(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.remove();
                        this.particles = this.particles.filter(p => p !== sparkle);
                    }
                }, 5000);
            }

            createFlower() {
                if (!this.isActive || this.particles.length >= this.maxParticles) return;
                
                const flower = document.createElement('div');
                flower.className = 'flower';
                flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
                flower.style.left = Math.random() * 100 + '%';
                flower.style.animationDuration = (Math.random() * 4 + 3) + 's';
                flower.style.fontSize = (Math.random() * 15 + 20) + 'px';
                flower.style.animationDelay = Math.random() * 2 + 's';
                document.body.appendChild(flower);
                
                this.particles.push(flower);
                
                setTimeout(() => {
                    if (flower.parentNode) {
                        flower.remove();
                        this.particles = this.particles.filter(p => p !== flower);
                    }
                }, 7000);
            }

            pause() {
                this.isActive = false;
                this.particles.forEach(particle => {
                    particle.style.animationPlayState = 'paused';
                });
            }

            resume() {
                this.isActive = true;
                this.particles.forEach(particle => {
                    particle.style.animationPlayState = 'running';
                });
            }
        }

        // Initialize particle system
        const particleSystem = new ParticleSystem();

        // Optimized intervals - Giảm tần suất để tránh rung lắc
        const sparkleInterval = setInterval(() => particleSystem.createSparkle(), 1500); // Từ 500ms lên 1500ms
        const flowerInterval = setInterval(() => particleSystem.createFlower(), 2000); // Từ 800ms lên 2000ms

        // Calculator functionality
        const display = document.getElementById('display');
        const calculatorScreen = document.getElementById('calculatorScreen');
        const birthdayScreen = document.getElementById('birthdayScreen');

        // THÊM: Flag để tránh double input
        let isButtonClick = false;

        function appendToDisplay(value) {
            if (display.value.length < 8) {
                isButtonClick = true; // Đánh dấu là button click
                display.value += value;
                // createKeyEffect(); // Tắt để tránh rung lắc
                
                // Reset flag sau 100ms
                setTimeout(() => {
                    isButtonClick = false;
                }, 100);
            }
        }

        function clearDisplay() {
            display.value = '';
            // createKeyEffect(); // Tắt để tránh rung lắc
        }

        function deleteLast() {
            display.value = display.value.slice(0, -1);
            // createKeyEffect(); // Tắt để tránh rung lắc
        }

        // Enhanced keyboard support - SỬA ĐỔI
        document.addEventListener('keydown', function(event) {
            if (calculatorScreen.style.display === 'none') return; // Chỉ cho nhập khi calculator đang hiện
            
            // THÊM: Kiểm tra nếu đang trong button click thì bỏ qua keyboard
            if (isButtonClick) {
                event.preventDefault();
                return;
            }

            const key = event.key;

            if (key >= '0' && key <= '9') {
                event.preventDefault(); // Ngăn input mặc định
                appendToDisplay(key);
            } else if (key === 'Enter') {
                event.preventDefault();
                checkPassword();
            } else if (key === 'Escape') {
                event.preventDefault();
                clearDisplay();
            } else if (key === 'Backspace') {
                event.preventDefault();
                deleteLast();
            }
        });

        // THÊM: Ngăn input trực tiếp vào ô input
        display.addEventListener('input', function(event) {
            if (!isButtonClick) {
                // Nếu không phải từ button click thì prevent
                event.preventDefault();
                // Khôi phục giá trị cũ
                const currentValue = event.target.value;
                if (currentValue.length > 0) {
                    event.target.value = currentValue.slice(0, -1);
                }
            }
        });

        // THÊM: Ngăn paste
        display.addEventListener('paste', function(event) {
            event.preventDefault();
        });

        // THÊM: Ngăn keypress trực tiếp
        display.addEventListener('keypress', function(event) {
            if (!isButtonClick) {
                event.preventDefault();
            }
        });

        function createKeyEffect(val) {
            // Tắt để tránh rung lắc
            return;
            // Tìm đúng nút vừa bấm (theo số)
            const btns = document.querySelectorAll('.btn-number');
            btns.forEach(btn => {
                if (btn.textContent === val) {
                    btn.classList.remove('effect');
                    void btn.offsetWidth; // trigger reflow
                    btn.classList.add('effect');
                    setTimeout(() => btn.classList.remove('effect'), 350);
                }
            });
        }

        function typeBirthdayLines(lines, element, done) {
            element.innerHTML = '';
            let idx = 0;
            function nextLine() {
                if (idx < lines.length) {
                    const lineDiv = document.createElement('div');
                    lineDiv.className = 'message-text';
                    element.appendChild(lineDiv);
                    let i = 0;
                    function typing() {
                        if (i <= lines[idx].length) {
                            lineDiv.innerHTML = lines[idx].slice(0, i) + '<span style="border-right:2px solid #ff69b4"></span>';
                            i++;
                            setTimeout(typing, 40);
                        } else {
                            lineDiv.innerHTML = lines[idx]; // remove cursor
                            idx++;
                            setTimeout(nextLine, 500);
                        }
                    }
                    typing();
                } else {
                    // Hiện nút mở quà sau khi chạy xong
                    const btn = document.getElementById('openGiftBtn');
                    if (btn) btn.style.display = 'inline-block';
                    if (done) done();
                }
            }
            nextLine();
        }


        function checkPassword() {
            if (display.value === '13072006') {
                calculatorScreen.style.display = 'none';
                birthdayScreen.style.display = 'block';

                // Ẩn toàn bộ nội dung bên trong birthdayScreen, chỉ hiện thư đóng
                document.querySelector('.birthday-title').style.display = 'none';
                document.querySelector('.date-special').style.display = 'none';
                document.getElementById('letterClosed').style.display = 'flex';
                document.getElementById('letterOpened').style.display = 'none';
                document.querySelector('.back-btn').style.display = 'none';

                setTimeout(() => {
                    createEnhancedFireworks();
                    playSuccessAnimation();
                }, 500);
            } else {
                // Enhanced shake effect
                display.style.animation = 'shake 0.6s ease-in-out';
                display.style.borderColor = '#ff4444';
                
                setTimeout(() => {
                    alert('🌸 Mật khẩu không đúng! Hãy thử lại nhé! 🌸');
                    clearDisplay();
                    display.style.animation = '';
                    display.style.borderColor = '';
                }, 600);
            }
        }

        // Khởi tạo trang lời chúc với hiệu ứng
        function initWishesPage() {
            createFireworksBackground();
            createFloatingHearts();
            
            // Thêm sự kiện click cho thiệp 3D trên mobile
            const card3D = document.querySelector('.card-3d');
            if (card3D) {
                // Sự kiện cho cả desktop và mobile
                card3D.addEventListener('click', function() {
                    this.classList.toggle('active');
                    // Mở thư ngay khi chạm vào
                    openLetter();
                });
                // XÓA touchstart để tránh nhấn giữ
                // card3D.addEventListener('touchstart', function(e) {
                //     e.preventDefault();
                //     this.classList.toggle('active');
                //     openLetter();
                // });
                // Tự động chạy chữ sau 2 giây
                setTimeout(() => {
                    typeCardText();
                }, 2000);
            }
            
            setTimeout(() => {
                launchContinuousConfetti();
            }, 1000);
        }

        // Chuyển sang gallery trái tim thay vì bức thư
        function showLetter() {
            // Tạo hiệu ứng fade out trước khi chuyển trang
            document.getElementById('wishesPage').style.transition = 'opacity 0.7s ease';
            document.getElementById('wishesPage').style.opacity = '0';
            setTimeout(() => {
                window.location.href = 'chucmung.html';
            }, 800);
        }

        // Success animation
        function playSuccessAnimation() {
            const cake = document.querySelector('.cake');
            if (cake) {
                cake.style.animation = 'none';
                cake.offsetHeight; // Trigger reflow
                cake.style.animation = 'cakeParty 1s ease-in-out 3';
            }
        }

        // Confetti function
        function launchConfetti() {
            for (let i = 0; i < 80; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.background = `hsl(${Math.random()*360},90%,60%)`;
                    confetti.style.animationDuration = (Math.random()*1.5+1.5) + 's';
                    confetti.style.width = confetti.style.height = (Math.random()*8+6) + 'px';
                    document.body.appendChild(confetti);
                    setTimeout(() => confetti.remove(), 2500);
                }, i*18);
            }
        }

        // Performance optimization: Pause animations when tab is not visible
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                particleSystem.pause();
                clearInterval(sparkleInterval);
                clearInterval(flowerInterval);
            } else {
                particleSystem.resume();
            }
        });

        // Intersection Observer for performance
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        }, observerOptions);

        // Observe animated elements
        setTimeout(() => {
            document.querySelectorAll('.sparkle, .flower').forEach(el => {
                observer.observe(el);
            });
        }, 1000);

        // Auto-focus display
        display.focus();

        // Hiệu ứng bóng bóng bay - Giảm tần suất để tránh rung lắc
        function createBubble() {
            const bubbles = document.getElementById('bubbles');
            if (!bubbles) return;
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            // Kích thước ngẫu nhiên
            const size = Math.random() * 40 + 30;
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            // Vị trí ngang ngẫu nhiên
            bubble.style.left = Math.random() * 100 + 'vw';
            // Thời gian bay ngẫu nhiên
            bubble.style.animationDuration = (6 + Math.random() * 4) + 's';
            bubbles.appendChild(bubble);
            setTimeout(() => {
                bubble.remove();
            }, 9000);
        }
        // Giảm tần suất từ 700ms xuống 2000ms
        setInterval(createBubble, 2000);
        for (let i = 0; i < 5; i++) createBubble(); // Giảm từ 10 xuống 5

        // Hiệu ứng trái tim nhỏ bay - Giảm tần suất để tránh rung lắc
        function createBgHeart() {
            const bgHearts = document.getElementById('bgHearts');
            if (!bgHearts) return;
            const heart = document.createElement('div');
            heart.className = 'bg-heart';
            // Chọn ngẫu nhiên 1 trong 3 trái tim
            const heartTypes = ['💖', '💗', '💞'];
            heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
            // Kích thước ngẫu nhiên
            const size = Math.random() * 18 + 22;
            heart.style.fontSize = size + 'px';
            // Vị trí ngang ngẫu nhiên
            heart.style.left = Math.random() * 100 + 'vw';
            // Thời gian bay ngẫu nhiên
            heart.style.animationDuration = (5 + Math.random() * 4) + 's';
            bgHearts.appendChild(heart);
            setTimeout(() => {
                heart.remove();
            }, 9000);
        }
        // Giảm tần suất từ 1200ms xuống 3000ms
        setInterval(createBgHeart, 3000);
        for (let i = 0; i < 3; i++) createBgHeart(); // Giảm từ 6 xuống 3

        function openLetter() {
            document.getElementById('letterClosed').style.display = 'none';
            const opened = document.getElementById('letterOpened');
            opened.style.display = 'flex';
            // Hiệu ứng chữ chạy từng dòng
            const messageEl = opened.querySelector('.birthday-message');
            typeBirthdayLines(birthdayLines, messageEl, function(){});
        }

        // Sửa lại checkPassword để chỉ hiện bức thư, chưa hiện nội dung
        function checkPassword() {
            if (display.value === '13072006') {
                calculatorScreen.style.display = 'none';
                birthdayScreen.style.display = 'block';

                // Ẩn toàn bộ nội dung bên trong birthdayScreen, chỉ hiện thư đóng
                document.querySelector('.birthday-title').style.display = 'none';
                document.querySelector('.date-special').style.display = 'none';
                document.getElementById('letterClosed').style.display = 'flex';
                document.getElementById('letterOpened').style.display = 'none';
                document.querySelector('.back-btn').style.display = 'none';

                setTimeout(() => {
                    createEnhancedFireworks();
                    playSuccessAnimation();
                }, 500);
            } else {
                // Enhanced shake effect
                display.style.animation = 'shake 0.6s ease-in-out';
                display.style.borderColor = '#ff4444';
                
                setTimeout(() => {
                    alert('🌸 Mật khẩu không đúng! Hãy thử lại nhé! 🌸');
                    clearDisplay();
                    display.style.animation = '';
                    display.style.borderColor = '';
                }, 600);
            }
        }


