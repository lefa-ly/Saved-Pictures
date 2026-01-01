// Scanner Simulation
document.addEventListener('DOMContentLoaded', function() {
    const startScanBtn = document.getElementById('startScanBtn');
    const stopScanBtn = document.getElementById('stopScanBtn');
    const scanProgress = document.getElementById('scanProgress');
    const sizeResults = document.getElementById('sizeResults');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    
    let scanInterval;
    let progress = 0;
    
    // Start Scan
    startScanBtn.addEventListener('click', function() {
        startScanBtn.disabled = true;
        stopScanBtn.disabled = false;
        progress = 0;
        scanProgress.style.width = '0%';
        sizeResults.style.display = 'none';
        
        // Simulate scanning progress
        scanInterval = setInterval(() => {
            progress += 2;
            scanProgress.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(scanInterval);
                startScanBtn.disabled = false;
                stopScanBtn.disabled = true;
                showResults();
            }
        }, 100);
    });
    
    // Stop Scan
    stopScanBtn.addEventListener('click', function() {
        clearInterval(scanInterval);
        startScanBtn.disabled = false;
        stopScanBtn.disabled = true;
        scanProgress.style.width = '0%';
    });
    
    // Show Results
    function showResults() {
        sizeResults.style.display = 'block';
        
        // Generate compliment
        setTimeout(() => {
            if (Math.random() > 0.5) {
                displayComplimentMessage("Great body proportions! Your measurements show a balanced physique that will look great in many styles!");
            }
        }, 1000);
    }
    
    // Save Profile
    saveProfileBtn.addEventListener('click', function() {
        // Save to localStorage
        const bodyProfile = {
            topSize: 'M',
            waist: 32,
            bottomSize: 'L',
            shoeSize: 9,
            scanDate: new Date().toISOString()
        };
        
        localStorage.setItem('luki_bodyProfile', JSON.stringify(bodyProfile));
        
        // Show success message
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show';
        alert.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            <strong>Profile saved!</strong> Your body measurements have been saved for future use.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        saveProfileBtn.parentElement.prepend(alert);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 150);
        }, 5000);
    });
    
    // Check for existing profile
    const existingProfile = localStorage.getItem('luki_bodyProfile');
    if (existingProfile) {
        const profile = JSON.parse(existingProfile);
        sizeResults.style.display = 'block';
        
        // Update size displays
        document.querySelectorAll('.size-circle h4').forEach((el, index) => {
            const values = [profile.topSize, profile.waist, profile.bottomSize, profile.shoeSize];
            if (values[index]) {
                el.textContent = values[index];
            }
        });
    }
});