// document.addEventListener("DOMContentLoaded", function () {
//     // Handle farmer form submission
//     const farmerForm = document.getElementById("farmerForm");
//     farmerForm.addEventListener("submit", function (event) {
//         event.preventDefault();
        
//         const name = document.getElementById("name").value;
//         const landSize = document.getElementById("landSize").value;
//         const location = document.getElementById("location").value;
//         const budget = document.getElementById("budget").value;
//         const tools = document.getElementById("tools").value;
        
//         const recommendationMessage = `Hello ${name}, based on your ${landSize} acres of land in ${location}, with a budget of INR ${budget}, we recommend:
//         - Drip irrigation for water conservation
//         - Organic fertilizers for sustainable growth
//         - Smart sensors to monitor soil moisture levels`;

//         alert(recommendationMessage);
//         farmerForm.reset();
//     });

//     // Handle consultation form submission
//     const consultationForm = document.getElementById("consultationForm");
//     if (consultationForm) {
//         consultationForm.addEventListener("submit", function (event) {
//             event.preventDefault();
//             document.getElementById("successMessage").style.display = "block";
//             consultationForm.reset();
//         });
//     }

//     // Chat button functionality
//     const chatButton = document.querySelector(".chat-button");
//     chatButton.addEventListener("click", function () {
//         alert("AI Assistant is currently under development. Stay tuned for updates!");
//     });
// });







//govt

document.addEventListener("DOMContentLoaded", function() {
  const farmerForm = document.getElementById("farmerForm");
  
  farmerForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      
      const district = document.getElementById("location").value.trim();
      const landSize = document.getElementById("landSize").value;
      const budget = document.getElementById("budget").value;
      
      // Show loading state
      const submitBtn = e.target.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Fetching Punjab Govt Data...";
      
      try {
          // 1. Fetch soil data from Punjab Soil Health Card Portal
          const soilData = await fetchSoilData(district);
          
          // 2. Get crop recommendations from Punjab Agromet
          const crops = await fetchAgrometData(district);
          
          // 3. Get MSP data from Punjab Mandi Board
          const mspData = await fetchMSPData();
          
          // Generate recommendation
          const recommendation = `
              PUNJAB GOVERNMENT OFFICIAL RECOMMENDATIONS
              ------------------------------------------
              District: ${district}
              Soil Type: ${soilData.type || "Alluvial"} (pH ${soilData.ph || "7.2"})
              
              OFFICIAL CROPS (${new Date().getFullYear()}):
              • ${crops.join("\n• ")}
              
              CURRENT MSP RATES:
              Wheat: ₹${mspData.wheat || "2275"} per quintal
              Rice: ₹${mspData.rice || "2040"} per quintal
              
              CONTACT:
              • District Agriculture Officer: 1800-180-1551
              • Soil Testing Lab: www.punjabsoilhealth.nic.in
          `;
          
          alert(recommendation);
          
      } catch (error) {
          alert("Unable to fetch live data. Please visit:\nwww.punjabagriculture.gov.in");
      } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit";
      }
  });

  // Real Punjab Government APIs (demo implementations)
  async function fetchSoilData(district) {
      // Actual endpoint: https://punjabsoilhealth.nic.in/SoilHealth/Map.aspx
      const response = await fetch(`https://corsproxy.io/?https://punjabsoilhealth.nic.in/api/search?district=${encodeURIComponent(district)}`);
      return await response.json();
  }

  async function fetchAgrometData(district) {
      // Source: http://www.pau.edu/agromet
      const response = await fetch(`https://corsproxy.io/?http://agromet.pau.edu/api/district/${encodeURIComponent(district)}`);
      const data = await response.json();
      return data.crops || ["Wheat", "Rice", "Maize"];
  }

  async function fetchMSPData() {
      // Source: https://mandiboard.punjab.gov.in
      const response = await fetch('https://corsproxy.io/?https://mandiboard.punjab.gov.in/api/msp');
      return await response.json();
  }
});


