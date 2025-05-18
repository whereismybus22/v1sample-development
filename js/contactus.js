document.getElementById('contactusButton').addEventListener('click', function() {
    window.location.href = '../pages/contactus.html'; 
});


    function getMobileOS() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/android/i.test(userAgent)) return "Android";
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";
      return "Unknown";
    }

    document.getElementById('contactForm').addEventListener('submit', function (event) {
      event.preventDefault(); 
      const form = event.target;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
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
 const subject = issue;
 let body = 'College : ' + college + '\n' +
            'Mobile OS : ' + os + '\n' +
            'Name : ' + name + '\n' +
            'Mobile Number : ' + phone + '\n';

 if (description.length > 0) {
   body += 'Description : ' + description + '\n';
 }


 // Using EmailJS to send email
 const mailtoLink = `mailto:query.whereismybus@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
 window.location.href = mailtoLink;  // triggers email client

}