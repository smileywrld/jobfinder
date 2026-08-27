// ===============================
// DARK MODE TOGGLE
// ===============================

document.addEventListener("DOMContentLoaded", () => {
	const themeToggle = document.getElementById("themeToggle");

	// Default to light mode unless the user has selected a theme.
	const theme = localStorage.getItem("theme") || "light";

	// Apply saved theme
	setTheme(theme);

	// Add event listener to toggle button
	if (themeToggle) {
		themeToggle.addEventListener("click", () => {
			const currentTheme = document.body.classList.contains("dark-mode")
				? "dark"
				: "light";
			const newTheme = currentTheme === "dark" ? "light" : "dark";
			setTheme(newTheme);
		});
	}
});

/**
 * Set the theme and update UI
 */
function setTheme(theme) {
	const themeToggle = document.getElementById("themeToggle");

	if (theme === "dark") {
		document.body.classList.add("dark-mode");
		localStorage.setItem("theme", "dark");
		if (themeToggle) {
			themeToggle.querySelector(".theme-icon").textContent = "☀️";
			themeToggle.setAttribute("aria-pressed", "true");
		}
	} else {
		document.body.classList.remove("dark-mode");
		localStorage.setItem("theme", "light");
		if (themeToggle) {
			themeToggle.querySelector(".theme-icon").textContent = "🌙";
			themeToggle.setAttribute("aria-pressed", "false");
		}
	}
}
