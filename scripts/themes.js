const themeToggler = document.getElementById("theme-toggler");
let theme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "DARK";

themeToggler.addEventListener("click", () => {
	theme === "DARK" ? setLightTheme() : setDarkTheme()
})

const setLightTheme = () => {
	let root = document.documentElement;
	root.style.setProperty("--bg", "hsl(236, 33%, 92%)");
	root.style.setProperty("--elements", "hsl(0, 0%, 98%)");
	root.style.setProperty("--bgImage", "url(../images/bg-desktop-light.jpg)");
	root.style.setProperty("--textColor", "hsl(235, 19%, 35%)");
	root.style.setProperty("--borderColor", "hsl(236, 33%, 92%)");
	root.style.setProperty("--inputText", "hsl(236, 9%, 61%)");
	root.style.setProperty("--checkedColor", "hsl(236, 9%, 61%)");
	themeToggler.setAttribute("src", "./images/icon-moon.svg");
	theme = "LIGHT";
}



const setDarkTheme = () => {
	let root = document.documentElement;
	root.style.setProperty("--bg", "hsl(235, 21%, 11%)");
	root.style.setProperty("--elements", "hsl(235, 24%, 19%)");
	root.style.setProperty("--bgImage", "url(../images/bg-desktop-dark.jpg)");
	root.style.setProperty("--textColor", "hsl(234, 39%, 85%)");
	root.style.setProperty("--borderColor", "hsl(237, 14%, 26%)");
	root.style.setProperty("--actionText", "hsl(234, 11%, 52%)");
	root.style.setProperty("--checkedColor", "hsl(234, 11%, 52%)");
	themeToggler.setAttribute("src", "./images/icon-sun.svg");
	theme = "DARK";
}
