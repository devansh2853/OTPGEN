const accounts = [
    { name: 'Z Deepak', secret: 'JBSWY3DPEHPK3PXP' },
    { name: 'Z Devansh', secret: 'KRSXG5DFNFZSAYJA' },
    { name: 'A One', secret: 'IFXWYZB4J5D7O43K' }
];

function generateTOTP(secret) {
    return speakeasy.totp({
        secret: secret,
        encoding: 'base32'
    });
}

async function fetchOTPS()
{
    const response = await fetch('/api/otps');
    return response.json();
}

function startAuthenticator() {
    const otpList = document.getElementById('otp-list');

    accounts.forEach((account, index) => {
        const otpElement = document.createElement('div');
        otpElement.className = 'otp';
        otpElement.innerHTML = `
            <div class="token" id="token-${index}">${account.name}: <span id='auth-${index}'>123456</span>
            <i class="fa-regular fa-copy" id="${index}"></i></div>
        `;

        otpList.appendChild(otpElement);
    });

    const copys = document.getElementsByClassName('fa-regular');
    for (let i of copys)
    {
        i.addEventListener('click', async () => {
            const textToCopy = document.getElementById(`auth-${i.id}`);
            await navigator.clipboard.writeText(textToCopy.textContent);
            alert('Copied the text: ' + textToCopy.textContent);
        })
    }

    async function updateTokens()
    {
        const otps = await fetchOTPS();
        otps.forEach((account, index) => {
            document.getElementById(`auth-${index}`).textContent = account.otp;
        })
    }

    function updateOTPs() {
        const countdownDuration = 30;
        const currentTime = Math.floor(Date.now() / 1000);
        const remainingTime = countdownDuration - (currentTime % countdownDuration);
        if (remainingTime == 30 || 
            document.getElementById(`auth-0`).textContent == 123456) {
            updateTokens();
                //         accounts.forEach((account, index) => {
                //         // const token = generateTOTP(account.secret);
                //             const token = remainingTime;
                //         document.getElementById(`auth-${index}`).textContent = token;
                // });
                }
        document.getElementById('mycount').textContent = `${remainingTime} seconds remaining`;
    }

    // Update OTPs initially and then every second
    updateOTPs();
    setInterval(updateOTPs, 1000);
}

// Wait for the DOM to fully load before starting the authenticator
document.addEventListener('DOMContentLoaded', startAuthenticator);


