let tooltipTimeout;

function convertEpochToTimeZones(epoch) {
  // Convert to milliseconds if epoch is 10 digits
  if (epoch.length === 10) {
    epoch = parseInt(epoch) * 1000;
  }

  const date = new Date(parseInt(epoch));

  const timeZones = [
    { zone: "UTC", label: "UTC" },
    { zone: "America/New_York", label: "EST/EDT" },
    { zone: "America/Los_Angeles", label: "PST/PDT" },
    { zone: "Europe/London", label: "GMT" },
    { zone: "Asia/Kolkata", label: "IST" },
    { zone: "Europe/Berlin", label: "CET" },
  ];

  return `
    <table class="timezone-table">
      <thead>
        <tr>
          <th>Zone</th>
          <th>Time & Date</th>
        </tr>
      </thead>
      <tbody>
        ${timeZones
          .map(({ zone, label }) => {
            const formatter = new Intl.DateTimeFormat("en-US", {
              timeZone: zone,
              dateStyle: "medium",
              timeStyle: "medium",
            });
            return `
              <tr>
                <td>${label}</td>
                <td>${formatter.format(date)}</td>
              </tr>
            `;
          })
          .join("")}
      </tbody>
    </table>
  `;
}

// Create and style the tooltip
const tooltip = document.createElement("div");
tooltip.id = "epoch-tooltip";
tooltip.style.position = "absolute";
tooltip.style.backgroundColor = "white";
tooltip.style.color = "#1c1c1e";
// tooltip.style.border = "1px solid #ddd";
tooltip.style.borderRadius = "8px";
// tooltip.style.boxShadow = " rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, rgba(42, 51, 70, 0.03) 0px 10px 10px -5px, rgba(42, 51, 70, 0.03) 0px 24px 24px -8px";
// tooltip.style.border = "1px solid gray";
tooltip.style.zIndex = "9999";
tooltip.style.fontSize = "14px";
tooltip.style.fontFamily = "'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";
tooltip.style.display = "none";
tooltip.style.transition = "opacity 0.3s ease";
document.body.appendChild(tooltip);

// Additional styles for the table
const style = document.createElement("style");
style.innerHTML = `
  .timezone-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }
  .timezone-table th, .timezone-table td {
    padding: 8px 12px;
    border: 1px solid #ddd;
  }
  .timezone-table th {
    background-color: #f9f9f9;
    font-weight: bold;
  }
  .timezone-table td {
    font-weight: normal;
  }
`;
document.head.appendChild(style);

// Function to show the tooltip
function showTooltip(event, epochTime) {
  clearTimeout(tooltipTimeout); // Prevent hiding the tooltip prematurely

  const convertedTimes = convertEpochToTimeZones(epochTime);
  tooltip.innerHTML = convertedTimes;
  tooltip.style.left = `${event.pageX + 5}px`;
  tooltip.style.top = `${event.pageY + 20}px`;
  tooltip.style.display = "block";
  tooltip.style.opacity = "1";
}

// Function to hide the tooltip
function hideTooltip() {
  tooltipTimeout = setTimeout(() => {
    tooltip.style.opacity = "0";
    setTimeout(() => (tooltip.style.display = "none"), 300);
  }, 300);
}

// Event listener for text selection
document.addEventListener("mouseup", (event) => {
  clearTimeout(tooltipTimeout); // Cancel any ongoing hide operation

  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  if (selectedText.match(/^\d{10,13}$/)) {
    const rect = selection.getRangeAt(0).getBoundingClientRect();
    const epochTime = selectedText;

    // Show the tooltip near the selection
    showTooltip(
      { pageX: rect.left + window.scrollX, pageY: rect.top + window.scrollY },
      epochTime
    );
  } else {
    hideTooltip(); // Hide the tooltip if the selection does not match
  }
});

// Prevent tooltip from hiding when interacting with it
tooltip.addEventListener("mouseenter", () => {
  clearTimeout(tooltipTimeout); // Cancel hiding when hovering over the tooltip
});

tooltip.addEventListener("mouseleave", hideTooltip); // Allow hiding when the mouse leaves the tooltip
