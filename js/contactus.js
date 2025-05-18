if (window.matchMedia('(display-mode: standalone)').matches) {
  document.querySelector('.container').style.paddingBottom = 'env(safe-area-inset-bottom, 3px)';
}

document.getElementById('contactusButton').addEventListener('click', function() {
    window.location.href = '../pages/contactus.html'; 
});


(function() {
    emailjs.init("psaitharun33@gmail.com"); // Replace with your EmailJS User ID
})();


function getMobileOS() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) return "Android";
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";
  return "Unknown";
}

function sendContactForm(event) {
  event.preventDefault(); 
  const form = document.getElementById("contactForm");
  if (!form.checkValidity()) {
    form.reportValidity();  
    return false;           
  }

  const name = document.getElementById("userName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const issueSelect = document.getElementById("issue");
  const issue = issueSelect.options[issueSelect.selectedIndex].text;
  const description = document.getElementById("query").value.trim();
  const os = getMobileOS();
  const college = "MLID";
  const subject = issue;
  const body = 'College : ' + college + '\n' +
               'Mobile OS : ' + os + '\n' +
               'Name : ' + name + '\n' +
               'Mobile Number : ' + phone + '\n' +
               'Description : ' + description + '\n';

  const mailtoLink = `mailto:query.whereismybus@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
  return true;
}
