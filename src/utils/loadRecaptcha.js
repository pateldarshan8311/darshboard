let loaded = false;

export function loadRecaptcha() {
  if (loaded) return;
  loaded = true;

  const script = document.createElement("script");
  script.src =
    "https://www.google.com/recaptcha/api.js?render=6LeCInMrAAAAAHglmr3VEUVNd_jL00YaU7WvYi7x";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}
