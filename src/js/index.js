const root = document.documentElement;
root.classList.add("js-ready");
const toggle = document.getElementById("theme-toggle");
const preference = window.matchMedia("(prefers-color-scheme: light)");
let savedTheme;
try { savedTheme = localStorage.getItem("site-theme"); } catch { /* Storage may be unavailable. */ }
function setTheme(light) {
  root.dataset.theme = light ? "light" : "dark";
  toggle.setAttribute("aria-pressed", String(light));
}
setTheme(savedTheme ? savedTheme === "light" : preference.matches);
toggle.addEventListener("click", () => {
  const light = root.dataset.theme !== "light";
  setTheme(light);
  savedTheme = light ? "light" : "dark";
  try { localStorage.setItem("site-theme", savedTheme); } catch { /* The toggle still works without storage. */ }
});
preference.addEventListener("change", (event) => { if (!savedTheme) setTheme(event.matches); });

const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobile-nav");
const closeMobile = document.getElementById("close-mobile");
function closeMenu() { if (mobileNav.open) mobileNav.close(); }
hamburger.addEventListener("click", () => {
  mobileNav.showModal();
  hamburger.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
});
closeMobile.addEventListener("click", closeMenu);
mobileNav.addEventListener("close", () => {
  hamburger.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
  if (window.matchMedia("(max-width: 960px)").matches) hamburger.focus();
});
window.matchMedia("(min-width: 961px)").addEventListener("change", (event) => { if (event.matches) closeMenu(); });
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const id = anchor.getAttribute("href").slice(1);
    const target = id && document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    closeMenu();
    // Let the dialog close event restore focus before moving to the chosen section.
    requestAnimationFrame(() => {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    });
  });
});
document.getElementById("copyright-year").textContent = String(new Date().getFullYear());

const form = document.getElementById("contact-form");
const status = document.getElementById("contact-status");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const button = form.querySelector('.send-btn');
  if (button.disabled) return;
  button.disabled = true;
  form.setAttribute("aria-busy", "true");
  status.textContent = "Sending your message…";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(form.action, {
      method: "POST", body: new FormData(form), headers: { Accept: "application/json" }, signal: controller.signal,
    });
    if (!response.ok) throw new Error("Submission failed");
    status.textContent = "Your message was accepted. Thank you for getting in touch.";
    form.reset();
  } catch {
    status.textContent = "We could not confirm your message was sent. Your text is still here; please try again or use the Email link.";
  } finally {
    clearTimeout(timeout);
    button.disabled = false;
    form.removeAttribute("aria-busy");
  }
});
