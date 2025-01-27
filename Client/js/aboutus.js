// import { checkSession, updateAuthContainer } from './auth.js';

// const sessionData = await checkSession();
//         updateAuthContainer(sessionData);

// document.addEventListener("DOMContentLoaded", function() {
//     fetch('/api/aboutus')  
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         document.getElementById("title").textContent = data.title;
//         document.getElementById("description").textContent = data.description;
//         document.getElementById("mission").textContent = data.mission;
//         document.getElementById("vision").textContent = data.vision;
  
//         const valuesList = document.getElementById("values");
//         valuesList.innerHTML = ""; 
//         data.values.forEach(function(value) {
//           const li = document.createElement("li");
//           li.textContent = value;
//           valuesList.appendChild(li);
//         });
//       })
//       .catch(error => console.error('Error fetching the about us data:', error));
//   });
  