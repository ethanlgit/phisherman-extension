// console.log("Content script loaded - debug version");

// // Test 1: Basic DOM manipulation
// try {
//     const testDiv = document.createElement("div");
//     testDiv.textContent = "Extension working!";
//     testDiv.style.position = "fixed";
//     testDiv.style.top = "10px";
//     testDiv.style.right = "10px";
//     testDiv.style.backgroundColor = "green";
//     testDiv.style.color = "white";
//     testDiv.style.padding = "10px";
//     testDiv.style.zIndex = "99999";
//     document.body.appendChild(testDiv);
//     console.log("DOM manipulation works");
// } catch (error) {
//     console.error("DOM manipulation failed:", error);
// }

// // Test 2: Event listeners
// document.addEventListener("click", function(event) {
//     console.log("Click detected on:", event.target);
    
//     // Test if we can find links
//     const link = event.target.closest ? event.target.closest("a") : null;
//     if (link) {
//         console.log("Found link:", link.href);
        
//         // Test 3: Basic fetch (comment out if needed)
//         console.log("Attempting fetch...");
//         fetch("http://127.0.0.1:5000/predict", {
//             method: "POST",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({url: link.href})
//         })
//         .then(response => {
//             console.log("Fetch response status:", response.status);
//             return response.json();
//         })
//         .then(data => {
//             console.log("Fetch successful:", data);
//             alert(`Link check result: ${data.class}`);
//         })
//         .catch(error => {
//             console.error("Fetch failed:", error);
//             alert(`Fetch error: ${error.message}`);
//         });
//     }
// });

// // Test 4: Check if backend is reachable
// setTimeout(() => {
//     console.log("Testing backend connectivity...");
//     fetch("http://127.0.0.1:5000/predict", {
//         method: "GET"
//     })
//     .then(response => response.json())
//     .then(data => console.log("Backend test successful:", data))
//     .catch(error => console.error("Backend test failed:", error));
// }, 2000);

console.log("Content script loaded.");

var tooltip = document.createElement("div");
tooltip.id = "tooltip";
document.body.appendChild(tooltip);

document.addEventListener("mouseover", (event) => {
    var link = event.target.closest("a");
    if (!link || !link.href) return;

    const linkLength = link.textContent.trim().length;
    if (linkLength === 0) return;

    // const container = link.closest("p, article, .post, .comment");
    // if (!container) return;

    const rect = link.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const role = link.getAttribute("role");
    const className = link.className.toLowerCase();
    const computed = window.getComputedStyle(link);
    const isTransparent = computed.backgroundColor === "rgba(0, 0, 0, 0)" || computed.backgroundColor === "transparent";

    const isButtonLike = role === "button" || className.includes("btn") || (computed.cursor === "pointer" && isTransparent);

    //console.log("yeerrrr")

    //if (isButtonLike) return;

    const display = window.getComputedStyle(link).display;
    const isInLine = display === "inline" || display === "inline-block";

    //console.log("yayaya")

    // if (isInLine) {

    tooltip.textContent = "Checking link for safety...";
    tooltip.style.left = event.clientX + "px";
    tooltip.style.top = (event.clientY - 50) + "px";
    tooltip.style.opacity = "1";
    const url = link.href;

    fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({url}),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Prediction:", data);
        tooltip.textContent = `Class: ${data.class} | (Confidence: ${(data.score * 100).toFixed(2)}%)`;
    })
    .catch(err => console.log("Error:", err))

        // console.log("Link found.");
        // // tooltip.textContent = "Checking link for safety...";
        
    //}

    // if (link && link.href) {
    //     const isWordLink = link.textContent.trim().length > 0 && link.children.length === 0;
        
    //     if (isWordLink) {
    //         console.log("Link found.");
    //         tooltip.textContent = "Checking link for safety...";
    //         tooltip.style.left = event.clientX + "px";
    //         tooltip.style.top = (event.clientY - 50) + "px";
    //         tooltip.style.opacity = "1";
    //     }
    // }
})

document.addEventListener("mouseout", (event) => {
    const link = event.target.closest("a");
    if (!link) {
        tooltip.style.opacity = "0";
    }
})


